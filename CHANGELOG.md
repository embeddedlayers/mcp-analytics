# Changelog

All notable changes to MCP Analytics are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.3] — 2026-03-01

### Added
- **Agent Advisor** — conversational AI layer that guides users through analysis and interprets results
- **GA4 connector** — connect Google Analytics 4 directly, no CSV export needed
- **Google Search Console connector** — run SEO analysis on live GSC data
- **LLM tool overviews** — each module now has an AI-written overview that improves discovery accuracy
- **Streaming responses** — analysis results stream back progressively for better UX

### Improved
- Tool discovery accuracy significantly improved via 5-signal Reciprocal Rank Fusion
- Hybrid discovery mode: combines dataset matching with text query re-ranking
- Error messages now include suggested corrective actions

---

## [1.0.2] — 2026-01-15

### Added
- **5-signal semantic tool discovery** — structural similarity, LLM description embeddings, LLM overview embeddings, type coverage, and category fit combined via Reciprocal Rank Fusion
- **Shopify connector** — orders, products, customers via Shopify API
- **Stripe connector** — payments, subscriptions, revenue via Stripe API
- **WooCommerce connector** — orders and products
- **eBay connector** — orders and seller analytics
- Dataset reuse — upload once, run multiple analyses

### Improved
- Column mapping precheck catches mismatches before execution
- Report sharing via permanent URLs

---

## [1.0.1] — 2025-10-01

### Added
- OAuth 2.0 with PKCE — replaces API key authentication
- Interactive HTML reports with charts and AI-written insights
- Cursor IDE support
- VS Code / Continue extension support
- Dataset management: upload, list, preview

### Improved
- Timeout handling for large datasets

---

## [1.0.0] — 2025-09-01

### Added
- Initial release — MCP server at `https://api.mcpanalytics.ai/auth0`
- Hundreds of statistical analysis modules: regression, clustering, time series, hypothesis testing, customer analytics, machine learning
- CSV upload and analysis
- Claude Desktop support
- Free tier: 25 analyses/month
- Report generation with shareable URLs
