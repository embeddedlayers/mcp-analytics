#!/usr/bin/env node

/**
 * MCP Analytics — stdio proxy
 *
 * Bridges stdio (local) to Streamable HTTP (api.mcpanalytics.ai/mcp).
 * Fetches the tool catalog from the remote server on startup, then proxies
 * all tools/call requests. No tools are hardcoded — the remote server is
 * the single source of truth.
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

if (!API_KEY) {
  process.stderr.write(
    "[mcp-analytics] WARNING: MCP_ANALYTICS_API_KEY not set.\n" +
      "  Get a free API key at https://app.mcpanalytics.ai\n" +
      "  Then set it in your Claude Desktop config or environment.\n\n"
  );
}

// ── Connect to remote MCP server ─────────────────────────────────────────────

let remoteClient;

async function connectRemote() {
  const transport = new StreamableHTTPClientTransport(
    new URL(`${API_URL}/mcp/api-key`),
    {
      requestInit: {
        headers: { "X-API-Key": API_KEY },
      },
    }
  );

  remoteClient = new Client({
    name: "mcp-analytics-proxy",
    version: "1.0.0",
  });

  await remoteClient.connect(transport);
}

try {
  await connectRemote();
} catch (err) {
  process.stderr.write(
    `[mcp-analytics] Failed to connect to ${API_URL}/mcp/api-key: ${err.message}\n`
  );
  process.exit(1);
}

// ── Fetch tool catalog from remote ───────────────────────────────────────────

const toolCatalog = [];
let cursor;
do {
  const { tools, nextCursor } = await remoteClient.listTools({ cursor });
  toolCatalog.push(...tools);
  cursor = nextCursor;
} while (cursor);

process.stderr.write(
  `[mcp-analytics] Connected to ${API_URL}. ${toolCatalog.length} tools available.\n`
);

// ── Local stdio server — proxies everything to remote ────────────────────────

const server = new Server(
  { name: "mcp-analytics", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// tools/list — serve the cached catalog
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: toolCatalog };
});

// tools/call — forward to the remote server
server.setRequestHandler(CallToolRequestSchema, async (request) => {
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
