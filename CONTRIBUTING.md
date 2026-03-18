# Contributing to MCP Analytics

This is the **public-facing repository** for MCP Analytics — it contains documentation, examples, and listing assets. The API server code is maintained in a private repository.

Contributions welcome in the following areas:

## Reporting Bugs

Open a [bug report](https://github.com/embeddedlayers/mcp-analytics/issues/new?template=bug_report.md). Please include:
- Your MCP client (Claude Desktop, Cursor, VS Code, etc.)
- Your data source (Shopify, Stripe, CSV, etc.)
- What you asked the AI to do and what went wrong
- Any error messages from the AI response

The more specific, the faster we can reproduce and fix it.

## Requesting Features

Open a [feature request](https://github.com/embeddedlayers/mcp-analytics/issues/new?template=feature_request.md). Most valuable requests:
- New data connectors (e.g., HubSpot, Salesforce, Amazon Seller)
- New analysis types for specific use cases
- Improvements to report output or interpretation

## Requesting a New Analysis Module

MCP Analytics has an autonomous module builder that produces new validated analysis modules from a specification — usually within a day. If you have a specific analytical need, describe it in a feature request with:
- The question you're trying to answer
- What data you have (column names and types)
- What output you'd expect

Well-specified module requests get prioritized and built quickly.

## Improving Documentation

Docs live in this repo (`docs/`, `examples/`) and at [mcpanalytics.ai/docs](https://mcpanalytics.ai/docs.html). For doc improvements, open a PR directly or file an issue describing what's unclear.

## Adding Examples

The `examples/` folder contains real-world usage examples. PRs adding new examples for specific use cases (Shopify revenue analysis, Stripe churn prediction, etc.) are welcome.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be respectful.

## Security

Do not report security vulnerabilities in public issues. See [SECURITY.md](SECURITY.md).
