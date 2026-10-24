# MCP Analytics

**A statistical analyst in your AI chat.** Bring a dataset and a question, get back a citable, re-runnable report with its method named.

MCP Analytics is a Model Context Protocol server that answers business and statistical questions about your data, as deep as each question needs:

- **Answer:** a quick question about the data, read from all of it, shown with how we got it, and saved.
- **Analytics:** a tested statistical method runs on the data, and we interpret it with charts and a written report.
- **Custom Analytics:** a question only your business asks, built for your data from proven models, yours to re-run on next month's file.

Intelligent routing picks the depth: you describe the question, and the server says which path answers it and why. Analytics is repeatable: same data, same numbers. Every report names its method and the code that ran it, and runs again on new data.

It is for business and statistical questions about data, not a general-purpose assistant.

Website: [mcpanalytics.ai](https://mcpanalytics.ai) · Free tools you can try in the browser: [mcpanalytics.ai/free](https://mcpanalytics.ai/free/)

## Connect

**Endpoint:** `https://api.mcpanalytics.ai/mcp/api-key` (Streamable HTTP, JSON-RPC)

**Authentication:** an API key in the `X-API-Key` header, or OAuth 2.0 via Auth0 from your AI client. Create an account at [mcpanalytics.ai](https://mcpanalytics.ai) and copy your key from your account settings.

```json
{
  "mcpServers": {
    "mcpanalytics": {
      "url": "https://api.mcpanalytics.ai/mcp/api-key",
      "headers": { "X-API-Key": "mcp_your_key_here" }
    }
  }
}
```

**Claude Code:**

```bash
claude mcp add --transport http mcpanalytics https://api.mcpanalytics.ai/mcp/api-key --header "X-API-Key: mcp_your_key_here"
```

**Browse before you sign up.** Without a key the server answers in discovery mode: you can connect and list the tools, but not run anything.

```bash
curl -X POST https://api.mcpanalytics.ai/mcp/api-key \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Start

Ask your AI assistant a question about your data, for example:

- "Upload sales.csv. What changed in revenue from May to June, and which channel drove it?"
- "Which customers are most likely to churn?"
- "Forecast next quarter's sales from this file."

The first call is the resolver: it reads your question and your data, executes nothing and charges nothing, and names the path that answers it (an answer, a library analysis, or a custom build) with the reason. Then it runs that path.

## What you get

- A report with charts, tables and a written interpretation, with its method named and the code that ran it.
- Re-runs on new data: run the same analysis on next month's file.
- A library of your reports you can search and ask questions across.

## Data and privacy

Your uploaded data is used only to answer your questions. See the [privacy policy](https://mcpanalytics.ai/privacy) for what we keep and for how long. Security issues: see [SECURITY.md](SECURITY.md).

## Support

- Website: [mcpanalytics.ai](https://mcpanalytics.ai)
- Email: support@mcpanalytics.ai

## License

See [LICENSE](LICENSE).
