# Quick Start — MCP Analytics

Get running in under a minute.

## Step 1 — Install in Your AI Client

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "mcp-analytics": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://api.mcpanalytics.ai/auth0"]
    }
  }
}
```

Restart Claude Desktop completely.

### Cursor

Add to your Cursor MCP settings (Settings → MCP):

```json
{
  "mcpServers": {
    "mcp-analytics": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://api.mcpanalytics.ai/auth0"]
    }
  }
}
```

### VS Code (Continue extension)

Add to `~/.continue/config.json`:

```json
{
  "mcpServers": {
    "mcp-analytics": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://api.mcpanalytics.ai/auth0"]
    }
  }
}
```

## Step 2 — Sign In

On first use, your AI client will open a browser window for OAuth sign-in. Create a free account at [mcpanalytics.ai](https://mcpanalytics.ai) or sign in if you already have one. This is a one-time setup — your client stores the token and refreshes it automatically.

## Step 3 — Start Analyzing

Once connected, just ask your AI assistant:

```
"I have a CSV of monthly sales data. Can you forecast next quarter?"
```

```
"Analyze this Shopify orders export and tell me what's driving revenue"
```

```
"Run a t-test on these two groups and tell me if the difference is significant"
```

The AI will:
1. Discover the right analysis tool for your question
2. Ask you to upload your data (or connect a data source)
3. Run the analysis
4. Return an interactive HTML report with charts and insights

## Free Tier

The free tier includes 25 analyses per month — no credit card required. See [pricing](https://mcpanalytics.ai/pricing.html) for paid plans.

## Try a Live Demo

Before connecting, you can [try the demo](https://mcpanalytics.ai/demo.html) or [browse sample reports](https://mcpanalytics.ai/sample-reports.html) to see what the output looks like.

## Troubleshooting

**MCP Analytics doesn't appear in my tools list**
- Restart your AI client completely (not just reload)
- Verify your config file is valid JSON
- Check your client's MCP logs for connection errors

**Authentication fails**
- Make sure you have a free account at mcpanalytics.ai
- Try running `npx -y mcp-remote@latest https://api.mcpanalytics.ai/auth0` directly in a terminal to test the connection

**Analysis fails**
- Check that your CSV has column headers in the first row
- Try describing your data more specifically so the AI picks the right tool
- Contact support@mcpanalytics.ai with the error message

---

[Full docs →](https://mcpanalytics.ai/docs.html) | [Support →](mailto:support@mcpanalytics.ai)
