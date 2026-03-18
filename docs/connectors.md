# Data Connectors — MCP Analytics

MCP Analytics can pull data directly from connected sources — no CSV export required. Use `connectors_list` to see what's available in your account and `connectors_query` to pull data into an analysis.

## Live Connectors

### Google Analytics 4

Connect to your GA4 property and analyze traffic, engagement, conversions, and user behavior directly.

```
connector://mcpanalytics_ga4/stream?property_id=YOUR_PROPERTY_ID&dimensions=date,pagePath&metrics=sessions,totalUsers
```

**What you can analyze:**
- Traffic trends and seasonality
- Page performance and engagement
- Conversion funnel analysis
- Audience segmentation

**Setup:** Your GA4 property must be linked in your [account settings](https://mcpanalytics.ai/account). Uses read-only OAuth credentials.

---

### Google Search Console

Connect to your GSC property and run SEO analysis on live search data.

```
connector://mcpanalytics_gsc/stream?site_url=sc-domain:yourdomain.com&dimensions=query,page
```

**What you can analyze:**
- Keyword ranking and impressions
- Click-through rate optimization
- Page-level search performance
- Seasonal query trends

**Setup:** Your GSC property must be verified and linked in your [account settings](https://mcpanalytics.ai/account).

---

## CSV / File Upload

Any data source can be analyzed via CSV upload. Use `datasets_upload` to upload a file, then reference it in `tools_run`.

**Supported file types:** CSV, JSON

**Supported platforms via CSV export:**
- Shopify (Orders, Products, Customers exports)
- Stripe (Payments, Subscriptions exports)
- WooCommerce (Orders export)
- eBay (Order reports)
- Google Ads, Facebook Ads, and any other platform with a CSV export

---

## Connector URI Format

When using a connector, the URI format is:

```
connector://connection_name/stream?param=value
```

The connection name corresponds to a verified connection in your account. Parameters vary by connector type and are documented when you run `connectors_list`.

---

## Coming Soon

Additional native connectors are planned. Submit a feature request via [GitHub Issues](https://github.com/embeddedlayers/mcp-analytics/issues) if you have a specific integration request.

---

[Full docs →](https://mcpanalytics.ai/docs.html) | [Account settings →](https://mcpanalytics.ai/account)
