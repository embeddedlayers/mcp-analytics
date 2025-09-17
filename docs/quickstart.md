# Quick Start Guide

## Installation (30 seconds)

### Claude Desktop

1. Open Claude Desktop settings
2. Navigate to Developer → MCP Servers
3. Click "Add Server" and paste:

```json
{
  "mcpanalytics": {
    "command": "npx",
    "args": ["-y", "mcp-remote@latest", "https://api.mcpanalytics.ai/auth0"]
  }
}
```

4. Restart Claude Desktop
5. You'll see "MCP Analytics" in the tools list

### Cursor

Add to your `.cursor/config.json`:

```json
{
  "mcpServers": {
    "mcpanalytics": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://api.mcpanalytics.ai/auth0"]
    }
  }
}
```

## First Analysis

Try this simple example:

```
"I have data at https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv
Can you analyze what factors affect tip amounts using linear regression?"
```

MCP Analytics will:
1. Load the data
2. Run linear regression
3. Show you which factors matter most
4. Provide a shareable report

## Authentication

On first use, you'll be prompted to authenticate via Auth0. This is a one-time setup that:
- Secures your data
- Tracks your usage
- Enables report saving

## Need Help?

- Email: support@mcpanalytics.ai
- Website: [mcpanalytics.ai](https://mcpanalytics.ai)
- Issues: [GitHub](https://github.com/embeddedlayers/mcp-analytics/issues)