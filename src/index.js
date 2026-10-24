#!/usr/bin/env node

/**
 * MCP Analytics — stdio proxy
 *
 * Bridges stdio (local) to Streamable HTTP (api.mcpanalytics.ai/mcp).
 * Fetches the tool catalog from the remote server on startup, then proxies
 * all tools/call requests. Falls back to a static catalog if the remote
 * is unreachable (e.g., during Glama inspection with placeholder keys).
 *
 * Usage:
 *   npx @mcpanalytics/mcp-analytics
 *
 * Claude Desktop config (~/.claude/claude_desktop_config.json):
 *   {
 *     "mcpServers": {
 *       "mcpanalytics": {
 *         "command": "npx",
 *         "args": ["-y", "@mcpanalytics/mcp-analytics"],
 *         "env": { "MCP_ANALYTICS_API_KEY": "your-key-here" }
 *       }
 *     }
 *   }
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_URL =
  process.env.MCP_ANALYTICS_API_URL || "https://api.mcpanalytics.ai";
const API_KEY = process.env.MCP_ANALYTICS_API_KEY || "";

// ── Static tool catalog (fallback for inspection / no API key) ───────────────
// Glama inspects servers by starting them in a container without valid credentials.
// This static catalog lets inspection detect our tools even without API access.

const STATIC_TOOLS = [
  {"name": "account_link", "description": "Direct link to the right account page for anything not doable in chat: billing, browser upload, report management. Hand the user the link and guide them.", "inputSchema": {"type": "object", "properties": {"section": {"type": "string", "enum": ["home", "billing", "upgrade", "create", "upload", "reports"], "description": "Where to send the user"}}, "required": []}},
  {"name": "about", "description": "Platform documentation and info: how it works (Answer, Analytics, Custom Analytics), usage.", "inputSchema": {"type": "object", "properties": {"topic": {"type": "string", "description": "Topic: platform, manual, connectors, or a docs section"}}, "required": ["topic"]}},
  {"name": "agent_advisor", "description": "AI help desk: which analysis fits your question, interpreting results, fixing errors. Multi-turn.", "inputSchema": {"type": "object", "properties": {"message": {"type": "string", "description": "Your question or request"}}, "required": ["message"]}},
  {"name": "datasets_upload", "description": "Get your data in. Pass `data` as an array of row objects to create the dataset immediately and get a dataset_ref ready for path_resolver; omit it to get an upload link for a file only the user can reach. Add replace_ref (uuid://ID:KEY) with data to REFRESH an existing dataset in place; schedules and tools holding that reference read the new data on their next run.", "inputSchema": {"type": "object", "properties": {"data": {"type": "array", "description": "Rows as an array of flat objects, creates the dataset in one call", "items": {"type": "object"}}, "replace_ref": {"type": "string", "description": "uuid://ID:KEY of an existing dataset to overwrite in place with `data` (the push/refresh mode)"}, "expires_in": {"type": "integer", "description": "Token expiration in seconds", "default": 300}}}},
  {"name": "datasets_list", "description": "List and search your uploaded datasets, with fuzzy matching on name, description, and tags. Returns each dataset's uuid:// reference for use in path_resolver and path_tool_run.", "inputSchema": {"type": "object", "properties": {"search": {"type": "string", "description": "Search by name, description, or tags"}, "limit": {"type": "integer", "description": "Max results", "default": 20}}}},
  {"name": "discover_tools", "description": "Browse the analyses you can run: the ones you commissioned plus the platform Standard Library (prebuilt tools; each result tagged source:'own' or 'standard_library'). Plain-language match; no query lists everything, your own first. Nothing fits? Commission it with path_resolver.", "inputSchema": {"type": "object", "properties": {"query": {"type": "string", "description": "Plain-language search over your library + the Standard Library; omit to list everything"}}}},
  {"name": "tools_schema", "description": "Get an analysis's parameter schema. ALWAYS call before path_tool_run.", "inputSchema": {"type": "object", "properties": {"tool_name": {"type": "string", "description": "Name of the analysis"}}, "required": ["tool_name"]}},
  {"name": "review_estimate", "description": "The estimate as you review it WITH the user: the question as understood, the estimated answer (sample, marked), every place and its question, the page link, a review checklist. Before path_bespoke.", "inputSchema": {"type": "object", "properties": {"estimate_id": {"type": "string"}}, "required": ["estimate_id"]}},
  {"name": "adjust_estimate", "description": "Apply the user's layout wishes to the estimate's page through the layout agent; a new named arrangement, nothing overwritten, no number changes.", "inputSchema": {"type": "object", "properties": {"estimate_id": {"type": "string"}, "instructions": {"type": "string", "description": "What to change, in the user's words"}}, "required": ["estimate_id", "instructions"]}},
  {"name": "find_precedent", "description": "Before estimating: how did we answer this objective before, on this data or any data? Prior packages and library runs with their tools, mappings, bespoke module names, method and verdicts. Platform-wide, read-only.", "inputSchema": {"type": "object", "properties": {"objective": {"type": "string"}, "dataset_ref": {"type": "string"}, "k": {"type": "integer", "default": 10}}, "required": ["objective"]}},
  {"name": "check_tool_fit", "description": "Before naming a library tool: does it fit THIS dataset for THIS question? Column mapping, missing required inputs, method-fit verdict, the places it delivers. Read-only.", "inputSchema": {"type": "object", "properties": {"tool_name": {"type": "string"}, "dataset_ref": {"type": "string"}, "objective": {"type": "string"}}, "required": ["tool_name", "dataset_ref"]}},
  {"name": "package_status", "description": "Read an analytics package back: status, every run under it, the report link once delivered.", "inputSchema": {"type": "object", "properties": {"package_id": {"type": "string"}}, "required": ["package_id"]}},
  {"name": "my_objects", "description": "List and search the objects you own across every question: the curated charts, tables and figures of each delivered package, grouped by objective.", "inputSchema": {"type": "object", "properties": {"query": {"type": "string"}, "limit": {"type": "integer", "default": 50}, "include_dropped": {"type": "boolean", "default": false}}}},
  {"name": "build_status", "description": "Check a commissioned build in-chat: stage progress, queue position, rejection reason if the data didn't match the objective, honest ETA, report link when delivered.", "inputSchema": {"type": "object", "properties": {"pipeline_id": {"type": "integer", "description": "pipeline_id from a build (modify_analysis)"}, "track_token": {"type": "string", "description": "Token from the tracking URL"}}, "required": []}},
  {"name": "ask_library", "description": "Ask a question across all your delivered analyses: a synthesized answer with citations back to specific reports.", "inputSchema": {"type": "object", "properties": {"question": {"type": "string", "description": "Plain-language question to answer from your report library"}}, "required": ["question"]}},
  {"name": "reports_list", "description": "Your report library: every analysis delivered, with status and links. Pass semantic_query to search report content in plain language.", "inputSchema": {"type": "object", "properties": {"semantic_query": {"type": "string", "description": "Natural-language search over your reports' content"}, "limit": {"type": "integer", "description": "Max results", "default": 10}}}},
  {"name": "warehouse", "description": "Query your org's data warehouse free: browse the catalog (tables with column roles + computed metrics), semantically find data, plain-language ask, or named templates. Requires warehouse enablement (business plans).", "inputSchema": {"type": "object", "properties": {"action": {"type": "string", "enum": ["ask", "query", "queries", "catalog", "find"]}, "question": {"type": "string"}, "query": {"type": "string"}, "params": {"type": "object"}}, "required": ["action"]}},
  {"name": "schedules", "description": "Standing re-runs of analyses you own: action='create' (weekly/monthly against a re-runnable data reference, connector:// or an https:// link; report emailed after each run), 'list', or 'cancel'.", "inputSchema": {"type": "object", "properties": {"action": {"type": "string", "enum": ["create", "list", "cancel"], "description": "What to do"}, "tool_name": {"type": "string", "description": "create: the analysis to schedule"}, "dataset_ref": {"type": "string", "description": "create: re-runnable reference (connector:// or https://)"}, "cadence": {"type": "string", "enum": ["weekly", "monthly"]}, "column_mapping": {"type": "object"}, "schedule_id": {"type": "integer", "description": "cancel: from action='list'"}}, "required": ["action"]}},
  {"name": "reports_view", "description": "Get a shareable browser link for a report, viewable without authentication.", "inputSchema": {"type": "object", "properties": {"processing_id": {"type": "string", "description": "Processing ID from path_tool_run / reports_list"}}, "required": ["processing_id"]}},
  {"name": "report_cards", "description": "Browse a delivered report's individual cards (charts, tables, insights) inline in chat.", "inputSchema": {"type": "object", "properties": {"processing_id": {"type": "string", "description": "The report's processing id, returned by path_tool_run or build_status"}}, "required": ["processing_id"]}},
  {"name": "path_resolver", "description": "Which path a question about data should take (reuse, rerun, answer, tool_run, estimate, bespoke, ask or none), with the reason, every path's score and time, and the ready input for the path it picks. Executes nothing and charges nothing.", "inputSchema": {"$defs": {"MetaEntry": {"additionalProperties": false, "description": "One piece of metadata about a question (LAT-3752; operator 2026-10-04: \"the metadata should be a list\"). The list\nis OPEN: any key is accepted. `source` says who said it: `stated` (the caller) or `derived` (the server looked it up).\nA caller can only ever produce `stated` entries; entitlement keys are read only from `derived` (meta.RESERVED).", "properties": {"key": {"maxLength": 64, "minLength": 1, "pattern": "^[a-z0-9_.-]+$", "title": "Key", "type": "string"}, "value": {"default": null, "title": "Value"}, "source": {"default": "stated", "enum": ["stated", "derived"], "title": "Source", "type": "string"}, "used": {"default": true, "title": "Used", "type": "boolean"}, "note": {"anyOf": [{"maxLength": 200, "type": "string"}, {"type": "null"}], "default": null, "title": "Note"}}, "required": ["key"], "title": "MetaEntry", "type": "object"}}, "additionalProperties": false, "description": "What arrives at path_resolver from any door, after the door's own adapter has normalised it.", "properties": {"objective": {"description": "the question, in the person's words", "maxLength": 4000, "minLength": 3, "title": "Objective", "type": "string"}, "dataset_ref": {"anyOf": [{"maxLength": 512, "type": "string"}, {"type": "null"}], "default": null, "description": "absent = no data yet (the resolver asks for it)", "title": "Dataset Ref"}, "door": {"default": "api", "enum": ["account", "mcp", "mailroom", "widget", "api", "internal"], "title": "Door", "type": "string"}, "meta": {"description": "open list of {key, value}; the caller's entries are always `stated`", "items": {"$ref": "#/$defs/MetaEntry"}, "maxItems": 32, "title": "Meta", "type": "array"}}, "required": ["objective"], "title": "Question", "type": "object"}},
  {"name": "path_reuse", "description": "Hand back the report already delivered for this question on this data. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "Hand back a report already delivered on this data for this question. Re-checked at execution, never trusted\nfrom the suggestion: a report deleted or no longer the caller's is refused, not served.", "properties": {"objective": {"description": "the question, in the person's words", "maxLength": 4000, "minLength": 3, "title": "Objective", "type": "string"}, "dataset_ref": {"description": "the dataset: a uuid://, upload:// or dataset id the caller owns", "maxLength": 512, "minLength": 1, "title": "Dataset Ref", "type": "string"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["objective", "dataset_ref"], "title": "ReuseInput", "type": "object"}},
  {"name": "path_rerun", "description": "Run a delivered analysis again, on its own dataset or a new one: the same tools and mappings, no rebuild. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "Run a delivered package again, on its own dataset or a new one. Same tools, same mappings; no rebuild.", "properties": {"package_id": {"maxLength": 128, "minLength": 1, "title": "Package Id", "type": "string"}, "dataset_ref": {"anyOf": [{"maxLength": 512, "type": "string"}, {"type": "null"}], "default": null, "description": "absent = the package's own dataset", "title": "Dataset Ref"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["package_id"], "title": "RerunInput", "type": "object"}},
  {"name": "path_answer", "description": "A read of the data (a total, an average, a count, the top group), computed on every row, in this response. When the question is not a read it says so and names the next step. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "A read of the data computed on every row, in this response. Free. Abstains (immediate=false) when the question\nis not a read; it never guesses.", "properties": {"objective": {"description": "the question, in the person's words", "maxLength": 4000, "minLength": 3, "title": "Objective", "type": "string"}, "dataset_ref": {"description": "the dataset: a uuid://, upload:// or dataset id the caller owns", "maxLength": 512, "minLength": 1, "title": "Dataset Ref", "type": "string"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["objective", "dataset_ref"], "title": "AnswerInput", "type": "object"}},
  {"name": "path_tool_run", "description": "Run one or more tested library tools on this dataset, with charts and a written report. No custom build. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "One or more tested library tools on this dataset. One tool runs directly; several run as a library-only package\n(no custom build: that is path_bespoke).", "properties": {"objective": {"description": "the question, in the person's words", "maxLength": 4000, "minLength": 3, "title": "Objective", "type": "string"}, "dataset_ref": {"description": "the dataset: a uuid://, upload:// or dataset id the caller owns", "maxLength": 512, "minLength": 1, "title": "Dataset Ref", "type": "string"}, "tool_names": {"items": {"type": "string"}, "maxItems": 8, "minItems": 1, "title": "Tool Names", "type": "array"}, "column_mapping": {"anyOf": [{"additionalProperties": {"type": "string"}, "type": "object"}, {"type": "null"}], "default": null, "description": "dataset column for each input the tool needs; absent = suggested from the data", "title": "Column Mapping"}, "module_parameters": {"anyOf": [{"type": "object"}, {"type": "null"}], "default": null, "title": "Module Parameters"}, "estimate_id": {"anyOf": [{"maxLength": 128, "type": "string"}, {"type": "null"}], "default": null, "title": "Estimate Id"}, "idempotency_key": {"anyOf": [{"maxLength": 128, "minLength": 8, "type": "string"}, {"type": "null"}], "default": null, "description": "send one per run; a retry with the same key replays the first call instead of running it again", "title": "Idempotency Key"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["objective", "dataset_ref", "tool_names"], "title": "ToolRunInput", "type": "object"}},
  {"name": "path_estimate", "description": "A rough answer over a sample and the layout of the full report, for the person to confirm before anything is ordered. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "Free: a rough answer over a sample and the layout of the full report, for the person to confirm.", "properties": {"objective": {"description": "the question, in the person's words", "maxLength": 4000, "minLength": 3, "title": "Objective", "type": "string"}, "dataset_ref": {"description": "the dataset: a uuid://, upload:// or dataset id the caller owns", "maxLength": 512, "minLength": 1, "title": "Dataset Ref", "type": "string"}, "layout_objective": {"anyOf": [{"maxLength": 2000, "type": "string"}, {"type": "null"}], "default": null, "title": "Layout Objective"}, "tool_names": {"anyOf": [{"items": {"type": "string"}, "maxItems": 8, "type": "array"}, {"type": "null"}], "default": null, "title": "Tool Names"}, "completeness": {"anyOf": [{"type": "integer"}, {"type": "null"}], "default": null, "title": "Completeness"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["objective", "dataset_ref"], "title": "EstimateInput", "type": "object"}},
  {"name": "path_bespoke", "description": "Order a custom analysis built for this data from a confirmed estimate, optionally with library tools alongside. Needs the person's yes and an idempotency key; a retry returns the first order. Time: as path_resolver quotes.", "inputSchema": {"additionalProperties": false, "description": "PAID. The order that includes a custom build, from a CONFIRMED estimate only. The idempotency key makes a retry\nor a double click replay the first order instead of placing a second (research: Stripe, IETF idempotency draft).", "properties": {"estimate_id": {"maxLength": 128, "minLength": 1, "title": "Estimate Id", "type": "string"}, "idempotency_key": {"maxLength": 128, "minLength": 8, "title": "Idempotency Key", "type": "string"}, "tool_names": {"anyOf": [{"items": {"type": "string"}, "maxItems": 8, "type": "array"}, {"type": "null"}], "default": null, "description": "library tools to run alongside the build", "title": "Tool Names"}, "layout_objective": {"anyOf": [{"maxLength": 2000, "type": "string"}, {"type": "null"}], "default": null, "title": "Layout Objective"}, "resolution_id": {"type": "integer", "description": "The resolution_id from path_resolver's path_input. Pass path_input as given."}}, "required": ["estimate_id", "idempotency_key"], "title": "BespokeInput", "type": "object"}},
];

// ── Connect to remote MCP server ─────────────────────────────────────────────

let remoteClient = null;
let toolCatalog = STATIC_TOOLS;

if (API_KEY) {
  try {
    const transport = new StreamableHTTPClientTransport(
      new URL(`${API_URL}/mcp/api-key`),
      { requestInit: { headers: { "X-API-Key": API_KEY } } }
    );

    remoteClient = new Client({
      name: "mcp-analytics-proxy",
      version: "1.0.8",
    });

    await remoteClient.connect(transport);

    // Fetch live tool catalog
    const liveTools = [];
    let cursor;
    do {
      const { tools, nextCursor } = await remoteClient.listTools({ cursor });
      liveTools.push(...tools);
      cursor = nextCursor;
    } while (cursor);

    toolCatalog = liveTools;
    process.stderr.write(
      `[mcp-analytics] Connected to ${API_URL}. ${toolCatalog.length} tools available.\n`
    );
  } catch (err) {
    process.stderr.write(
      `[mcp-analytics] Could not connect to remote (${err.message}). Using static catalog (${STATIC_TOOLS.length} tools).\n`
    );
    remoteClient = null;
  }
} else {
  process.stderr.write(
    "[mcp-analytics] No API key set. Running in inspection mode with static catalog.\n" +
      "  Set MCP_ANALYTICS_API_KEY for live access. Get a free key at https://account.mcpanalytics.ai\n"
  );
}

// ── Local stdio server ───────────────────────────────────────────────────────

const server = new Server(
  { name: "mcp-analytics", version: "1.0.8" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: toolCatalog };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (!remoteClient) {
    return {
      content: [
        {
          type: "text",
          text: "MCP Analytics API key required. Set MCP_ANALYTICS_API_KEY in your environment.\nGet a free key at https://account.mcpanalytics.ai",
        },
      ],
      isError: true,
    };
  }

  try {
    const result = await remoteClient.callTool({
      name: request.params.name,
      arguments: request.params.arguments || {},
    });
    return result;
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

// ── Start ────────────────────────────────────────────────────────────────────

const stdioTransport = new StdioServerTransport();
await server.connect(stdioTransport);
