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
  { name: "about", description: "Get platform info, pricing, usage stats, or documentation.", inputSchema: { type: "object", properties: { topic: { type: "string", description: "Topic: platform, pricing, current_usage, manual, or a docs section" } }, required: ["topic"] } },
  { name: "discover_tools", description: "Find analysis tools matching your data or question. Semantic search across 50+ statistical and ML tools.", inputSchema: { type: "object", properties: { query: { type: "string", description: "Text query describing what you want to analyze" }, dataset: { type: "string", description: "Dataset UUID to match tools against" } } } },
  { name: "tools_schema", description: "Get JSON schema for a tool — column_mapping and module_parameters required before tools_run.", inputSchema: { type: "object", properties: { tool_name: { type: "string", description: "Name of the tool" } }, required: ["tool_name"] } },
  { name: "tools_run", description: "Execute an analysis tool. Returns a shareable interactive HTML report URL.", inputSchema: { type: "object", properties: { tool_name: { type: "string", description: "Name of the tool to execute" }, taskList: { type: "object", description: "Contains inputs: dataset, userContext, column_mapping, module_parameters" } }, required: ["tool_name", "taskList"] } },
  { name: "tools_info", description: "Get detailed information about a specific analysis tool — use cases, assumptions, data requirements.", inputSchema: { type: "object", properties: { tool_name: { type: "string", description: "Name of the tool" } }, required: ["tool_name"] } },
  { name: "datasets_upload", description: "Generate a secure upload token for CSV files. Returns UUID + curl command for the user.", inputSchema: { type: "object", properties: { expires_in: { type: "integer", description: "Token expiration in seconds", default: 300 } } } },
  { name: "datasets_list", description: "List and search uploaded datasets with fuzzy matching.", inputSchema: { type: "object", properties: { search: { type: "string", description: "Search by name, description, or tags" }, limit: { type: "integer", description: "Max results", default: 20 } } } },
  { name: "datasets_read", description: "Read dataset contents — preview rows, columns, and types.", inputSchema: { type: "object", properties: { uuid: { type: "string", description: "Dataset UUID" }, secret: { type: "string", description: "Dataset secret key" }, rows: { type: "integer", description: "Number of rows to preview", default: 10 } }, required: ["uuid"] } },
  { name: "datasets_download", description: "Generate a single-use download token for securely downloading datasets.", inputSchema: { type: "object", properties: { uuid: { type: "string", description: "Dataset UUID" } }, required: ["uuid"] } },
  { name: "datasets_update", description: "Update dataset metadata — name, description, tags, visibility.", inputSchema: { type: "object", properties: { uuid: { type: "string", description: "Dataset UUID" } }, required: ["uuid"] } },
  { name: "connectors_list", description: "List available data connectors — GA4, Google Search Console, and more.", inputSchema: { type: "object", properties: {} } },
  { name: "connectors_query", description: "Pull live data from a connected source using connector:// URIs.", inputSchema: { type: "object", properties: { uri: { type: "string", description: "Connector URI (e.g., connector://mcpanalytics_gsc/search_analytics?...)" } }, required: ["uri"] } },
  { name: "reports_list", description: "List analysis reports with metadata.", inputSchema: { type: "object", properties: { limit: { type: "integer", description: "Max results", default: 10 } } } },
  { name: "reports_search", description: "Search reports by job ID, tool name, or keyword.", inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query" }, job_ids: { type: "array", items: { type: "string" }, description: "Filter by processing IDs" } } } },
  { name: "reports_view", description: "View a specific report by processing ID.", inputSchema: { type: "object", properties: { processing_id: { type: "string", description: "Processing ID from tools_run" } }, required: ["processing_id"] } },
  { name: "report_cards", description: "Get individual card data from a report for rendering.", inputSchema: { type: "object", properties: { processing_id: { type: "string" } }, required: ["processing_id"] } },
  { name: "agent_advisor", description: "Conversational AI that guides analysis and interprets results.", inputSchema: { type: "object", properties: { message: { type: "string", description: "Your question or request" } }, required: ["message"] } },
  { name: "billing", description: "Check credit balance, subscription status, or open billing portal.", inputSchema: { type: "object", properties: { action: { type: "string", enum: ["status", "portal", "usage"], description: "Billing action", default: "status" } } } },
  { name: "module_request", description: "Request a custom analysis module to be built for your use case.", inputSchema: { type: "object", properties: { description: { type: "string", description: "Describe the analysis you need" } }, required: ["description"] } },
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
      version: "1.0.0",
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
      "  Set MCP_ANALYTICS_API_KEY for live access. Get a free key at https://app.mcpanalytics.ai\n"
  );
}

// ── Local stdio server ───────────────────────────────────────────────────────

const server = new Server(
  { name: "mcp-analytics", version: "1.0.0" },
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
          text: "MCP Analytics API key required. Set MCP_ANALYTICS_API_KEY in your environment.\nGet a free key at https://app.mcpanalytics.ai",
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
