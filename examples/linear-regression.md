# Linear Regression

**Module:** [`demo__advertising__marketing_spend__linear_regression`](https://mcpanalytics.ai/free/demo__advertising__marketing_spend__linear_regression)

Upload data with an outcome variable and predictors. Get coefficients, significance tests, model fit, and predictions — find out which factors actually drive your results.

## The Conversation

```
You: "I have monthly sales data with advertising spend across different channels.
     Can you help me understand which channels drive the most revenue?"

AI:  I'll upload your data and run linear regression.

     [uploads CSV → discovers linear regression module → maps columns → runs analysis]

     Here's what I found:

     📊 Model Results (R² = 0.78 — explains 78% of sales variance)

     • TV Advertising: $3.20 return per $1 spent (p < 0.001, significant)
     • Digital Marketing: $2.80 return per $1 spent (p < 0.001, significant)
     • Print Advertising: $0.90 return per $1 spent (p = 0.42, not significant)

     💡 Recommendation
     TV and digital are your strongest channels. Print isn't statistically
     significant — the apparent return could be random noise. Consider
     reallocating print budget to TV or digital.

     [View full interactive report →]
```

## When to Use This

- Understanding which factors predict an outcome
- Measuring ROI across marketing channels
- Salary prediction from experience, education, role
- Any "what drives Y?" question with numeric data

## Data Format

CSV with one outcome column (what you're predicting) and one or more predictor columns. Numeric data works best. Categorical predictors are automatically encoded.

## Try It

Upload your data and ask:

```
"Run linear regression to predict revenue from our ad spend columns.
Show me which channels are statistically significant."
```

[View sample report →](https://mcpanalytics.ai/free/demo__advertising__marketing_spend__linear_regression)
