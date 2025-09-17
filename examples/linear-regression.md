# Linear Regression Example

## Analyzing Sales Data

```
"I have monthly sales data with advertising spend across different channels.
Can you help me understand which channels drive the most revenue?"
```

### What MCP Analytics Does:

1. **Loads your data** - CSV, JSON, or public URL
2. **Runs regression analysis** - Identifies relationships between ad spend and sales
3. **Provides insights**:
   - Coefficient for each channel (ROI)
   - Statistical significance (p-values)
   - R-squared (model fit)
   - Predictions for different spend scenarios
4. **Generates report** - Interactive visualizations you can share

### Sample Output:

```
Linear Regression Results:
- TV Advertising: $3.2 return per $1 spent (p < 0.001)
- Digital Marketing: $2.8 return per $1 spent (p < 0.001)
- Print Advertising: $0.9 return per $1 spent (p = 0.42, not significant)

Model explains 78% of sales variance (R² = 0.78)
```

### Try It Yourself:

Use the Boston Housing dataset:
```
"Run linear regression on the Boston Housing dataset
to predict median home values. Use rooms, crime rate,
and distance to employment as predictors."
```