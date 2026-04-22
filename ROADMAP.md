# Roadmap

What we're building, what's next, and what we're exploring. Updated monthly.

Last updated: **April 2026**

> Have a feature request? [Open an issue](https://github.com/embeddedlayers/mcp-analytics/issues/new/choose) or [start a discussion](https://github.com/embeddedlayers/mcp-analytics/discussions).

---

## Status: v2 rebuild in progress

We are actively rebuilding the platform (codename **v2**). Everything under **Now** below is part of this rebuild — some of it is partially live on [mcpanalytics.ai](https://mcpanalytics.ai) behind a beta banner, and some is being reworked end-to-end. Expect rough edges during this period. If you want to wait for a stable release, subscribe to the [launch newsletter](https://mcpanalytics.ai/#newsletter-footer). Tracking: [#22 — v2 rebuild: what's changing, what to expect](https://github.com/embeddedlayers/mcp-analytics/issues/22).

---

## Now (Active Development)

These are in progress or shipping soon (all part of the v2 rebuild above).

### Connectors
- **Shopify live connector** — analyze orders, products, and customers without CSV export ([#1](https://github.com/embeddedlayers/mcp-analytics/issues/1))
- **Stripe live connector** — subscription analytics, MRR, churn directly from Stripe ([#2](https://github.com/embeddedlayers/mcp-analytics/issues/2))

### Analysis Modules
- **Bayesian A/B testing** — posterior distributions, credible intervals, expected loss
- **Text/NLP analysis** — sentiment analysis, topic modeling, keyword extraction from text columns
- **Causal inference** — difference-in-differences, synthetic control, regression discontinuity

### Platform
- **Scheduled reports** — run an analysis on a recurring schedule and get notified
- **PDF export** — download any interactive report as a formatted PDF ([#4](https://github.com/embeddedlayers/mcp-analytics/issues/4))
- **Team workspaces** — share datasets and reports within an organization

---

## Next (Planned)

Designed but not yet in active development. Timing depends on demand — [open an issue](https://github.com/embeddedlayers/mcp-analytics/issues/new/choose) to let us know what you need.

### Connectors
- **HubSpot** — CRM contacts, deals, marketing events
- **Salesforce** — opportunities, pipeline analytics
- **QuickBooks** — financial data, P&L analysis
- **PostgreSQL / MySQL** — direct database connections for internal data

### Analysis Modules
- **Forecasting ensemble** — combine ARIMA, Prophet, and exponential smoothing with automatic model selection
- **Customer journey mapping** — sequence analysis across touchpoints
- **Geospatial analysis** — regional patterns, heatmaps, distance-based clustering
- **Survey analysis suite** — Likert scales, factor analysis, structural equation modeling

### Platform
- **API webhooks** — get notified when analyses complete
- **Custom report branding** — add your logo and colors to reports
- **Comparison reports** — run the same analysis on two time periods and highlight changes
- **Dataset versioning** — track changes to your data over time

---

## Later (Exploring)

Things we're thinking about. No timeline yet.

- **Real-time streaming connectors** — analyze data as it arrives (Kafka, webhooks)
- **Embedded reports** — iframe reports into your own dashboards
- **White-label API** — run MCP Analytics under your own brand
- **R/Python notebook export** — download the code behind any analysis
- **Multi-language reports** — generate insights in languages other than English
- **On-premise deployment** — self-hosted option for regulated industries

---

## Recently Shipped

| Feature | Version | Date |
|---------|---------|------|
| GA4 connector | 1.0.3 | Mar 2026 |
| Google Search Console connector | 1.0.3 | Mar 2026 |
| Agent Advisor (conversational AI) | 1.0.3 | Mar 2026 |
| 5-signal semantic discovery | 1.0.2 | Jan 2026 |
| OAuth 2.0 with PKCE | 1.0.1 | Oct 2025 |
| Interactive HTML reports | 1.0.1 | Oct 2025 |

---

## How We Prioritize

1. **User demand** — issues and module requests with the most upvotes ship first
2. **Build feasibility** — our autonomous module builder can ship new analysis types in days, so module requests often move fast
3. **Strategic value** — connectors and platform features that unlock new use cases

The fastest way to get something built: [open a module request](https://github.com/embeddedlayers/mcp-analytics/issues/new?template=module_request.yml) with a clear description of your data and the question you're trying to answer.
