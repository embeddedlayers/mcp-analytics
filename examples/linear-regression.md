# Linear Regression Example

## Analyzing Sales Data

```
"I have monthly sales data with advertising spend across different channels.
Can you help me understand which channels drive the most revenue?"
```

### What MCP Analytics Does:

1. **Discovers the right tool** — `discover_tools('regression advertising spend revenue')` finds the linear regression module
2. **Uploads your data** — `datasets_upload` securely processes your CSV
3. **Runs the analysis** — `tools_run` with `analytics__statistical__regression__linear_regression`
4. **Provides insights**:
   - Coefficient for each channel (ROI per dollar)
   - Statistical significance (p-values)
   - R-squared (model fit)
   - Predictions for different spend scenarios
5. **Generates report** — `reports_view` opens interactive visualizations you can share

### Sample Output:

```
Linear Regression Results:
- TV Advertising: $3.2 return per $1 spent (p < 0.001)
- Digital Marketing: $2.8 return per $1 spent (p < 0.001)
- Print Advertising: $0.9 return per $1 spent (p = 0.42, not significant)

Model explains 78% of sales variance (R² = 0.78)
```

### Try It Yourself:

Upload a CSV with outcome and predictor columns and ask:

```
"Run linear regression to predict revenue from our ad spend columns.
Show me which channels are statistically significant."
```

The AI will call `discover_tools`, upload your data, run the module, and return an interactive report — all in one conversation.

---

[More examples →](../examples/) | [Sample reports →](https://mcpanalytics.ai/sample-reports.html)
