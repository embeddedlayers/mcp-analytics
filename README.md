# MCP Analytics

Professional statistical analysis tools integrated directly into Claude and Cursor via the Model Context Protocol.

## Quick Start (30 seconds)

Add to your Claude Desktop config:

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

Then in Claude, simply ask:
```
"Analyze this dataset with linear regression"
"Perform customer segmentation with k-means"
"Forecast next month's sales with ARIMA"
```

## Features

- **50+ Statistical Tools** - Regression, clustering, time series, hypothesis testing, and more
- **Natural Language** - Just describe what you want to analyze
- **Interactive Reports** - Shareable browser-ready visualizations
- **Enterprise Security** - OAuth2 authentication, encrypted data transfer
- **No Setup Required** - Cloud-based processing, works instantly

## Available Tools

### Regression & Classification
- Linear, Ridge, Lasso, Elastic Net Regression
- Logistic Regression
- Random Forest
- XGBoost

### Time Series
- ARIMA Forecasting
- Seasonal Decomposition

### Clustering & Segmentation
- K-Means Clustering
- Hierarchical Clustering

### Statistical Testing
- T-Tests, ANOVA, Chi-Square
- Bayesian A/B Testing

### Advanced Analytics
- Mixed Effects Models
- Survival Analysis (Cox Proportional Hazards)
- Principal Component Analysis
- Market Basket Analysis

[View all 50+ tools →](https://mcpanalytics.ai/tools)

## Example Usage

```python
# In Claude or Cursor, just ask:
"I have sales data at https://example.com/sales.csv.
 Can you forecast the next 3 months using ARIMA?"

# MCP Analytics will:
# 1. Load your data
# 2. Run ARIMA time series analysis
# 3. Generate forecasts with confidence intervals
# 4. Provide shareable report with visualizations
```

## How It Works

1. **Ask Claude/Cursor** - Describe your analysis in plain English
2. **Automatic Tool Selection** - MCP Analytics chooses the right statistical method
3. **Secure Processing** - Your data is encrypted and processed in isolated containers
4. **Get Results** - Interactive reports with visualizations and insights

## Security & Privacy

- OAuth2 authentication via Auth0
- End-to-end encryption for data transfer
- Isolated Docker containers for each analysis
- No data persistence after processing
- SOC 2 Type II compliance (in progress)

[Read more about security →](https://mcpanalytics.ai/security)

## Documentation

- [Quick Start Guide](https://mcpanalytics.ai/docs/quickstart)
- [Complete Tool Catalog](https://mcpanalytics.ai/tools)
- [API Documentation](https://api.mcpanalytics.ai/docs)
- [Pricing Plans](https://mcpanalytics.ai/#pricing)

## Support

- **Issues**: [GitHub Issues](https://github.com/embeddedlayers/mcp-analytics/issues)
- **Email**: support@mcpanalytics.ai
- **Website**: [mcpanalytics.ai](https://mcpanalytics.ai)

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

Built by [MCP Analytics](https://mcpanalytics.ai) | Powered by R Statistical Computing