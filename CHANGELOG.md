# Changelog

All notable changes to MCP Analytics are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## v2 platform release — July 2026

The v2 rebuild has shipped and [mcpanalytics.ai](https://mcpanalytics.ai) is
out of beta. Rebuild scope and history:
[#22 — v2 rebuild: what's changing, what to expect](https://github.com/embeddedlayers/mcp-analytics/issues/22).

### Added
- **Commissioned analysis pipeline** — `create_analysis` takes a plain-language
  question, a dataset, and a depth tier; `build_status` tracks the build;
  `run_analysis` re-runs any analysis you own on fresh data
- **Four depth tiers** — Snapshot (instant read), JSON (computed answer as a
  re-runnable tool), Brief (one-page report), Deck (full commissioned study)
- **Report cards** — `report_cards`, `cards_list`, `cards_customize`,
  `cards_reset` for displaying and customizing individual report cards
- **Credit model** — 2,000 welcome credits on signup; builds are priced by
  depth and billed only on success
- **PDF export** — download any report as a formatted PDF with methodology
  and citations ([#4](https://github.com/embeddedlayers/mcp-analytics/issues/4))

### Changed
- Account management moved to [account.mcpanalytics.ai](https://account.mcpanalytics.ai)
- `tools_run` superseded by `run_analysis`

---

## [1.0.4] — 2026-03-28

### Added
- **Module Request issue template** — request a custom analysis module directly from GitHub; our build pipeline can deliver within days
- **Connector Request issue template** — request new data source integrations
- **Public roadmap** — see what's planned in [ROADMAP.md](ROADMAP.md)
- **Output datasets** — analysis results saved as reusable datasets for chaining analyses
- **Dataset type separation** — cleaner separation between uploaded inputs and generated outputs

### Improved
- R report pipeline simplified — card data now built in Python, removing external dependencies
- Discovery accuracy improved with better LLM-generated module overviews
- Error messages now suggest specific corrective actions with column name hints

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
- Statistical analysis modules: regression, clustering, time series, hypothesis testing, customer analytics, machine learning
- CSV upload and analysis
- Claude Desktop support
- Free tier with starter credits
- Report generation with shareable URLs
