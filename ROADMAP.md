# Roadmap

What we're building, what's next, and what we're exploring. Updated monthly.

Last updated: **March 2026**

> Have a feature request? [Open an issue](https://github.com/embeddedlayers/mcp-analytics/issues/new/choose) or [start a discussion](https://github.com/embeddedlayers/mcp-analytics/discussions).

---

## Now (Active Development)

These are in progress or shipping soon.

### Connectors
- **Shopify live connector** — analyze orders, products, and customers without CSV export ([#1](https://github.com/embeddedlayers/mcp-analytics/issues/1))
- **Stripe live connector** — subscription analytics, MRR, churn directly from Stripe ([#2](https://github.com/embeddedlayers/mcp-analytics/issues/2))

### Analysis Modules
- **Bayesian A/B testing** — posterior distributions, credible intervals, expected loss ([#8](https://github.com/embeddedlayers/mcp-analytics/issues/8))
- **Text/NLP analysis** — sentiment analysis, topic modeling, keyword extraction from text columns ([#7](https://github.com/embeddedlayers/mcp-analytics/issues/7))
- **Causal inference** — difference-in-differences, synthetic control, regression discontinuity

### Platform
- **Scheduled reports** — run an analysis on a recurring schedule and get notified ([#5](https://github.com/embeddedlayers/mcp-analytics/issues/5))
- **PDF export** — download any interactive report as a formatted PDF ([#4](https://github.com/embeddedlayers/mcp-analytics/issues/4))
- **Team workspaces** — share datasets and reports within an organization ([#6](https://github.com/embeddedlayers/mcp-analytics/issues/6))

---

## Next (Planned)

Designed but not yet in active development. Timing depends on demand — upvote the linked issues to help us prioritize.

### Connectors
- **HubSpot** — CRM contacts, deals, marketing events ([#3](https://github.com/embeddedlayers/mcp-analytics/issues/3))
- **Salesforce** — opportunities, pipeline analytics
- **QuickBooks** — financial data, P&L analysis
- **PostgreSQL / MySQL** — direct database connections for internal data ([#12](https://github.com/embeddedlayers/mcp-analytics/issues/12))

### Analysis Modules
- **Forecasting ensemble** — combine ARIMA, Prophet, and exponential smoothing with automatic model selection
- **Customer journey mapping** — sequence analysis across touchpoints
- **Geospatial analysis** — regional patterns, heatmaps, distance-based clustering
- **Survey analysis suite** — Likert scales, factor analysis, structural equation modeling

### Platform
- **API webhooks** — get notified when analyses complete ([#11](https://github.com/embeddedlayers/mcp-analytics/issues/11))
- **Custom report branding** — add your logo and colors to reports ([#9](https://github.com/embeddedlayers/mcp-analytics/issues/9))
- **Comparison reports** — run the same analysis on two time periods and highlight changes ([#10](https://github.com/embeddedlayers/mcp-analytics/issues/10))
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
