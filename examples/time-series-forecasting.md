# Time Series Forecasting

**Module:** [`general__generic__timeseries__prophet_decomposition`](https://mcpanalytics.ai/free/general__generic__timeseries__prophet_decomposition)

Upload any time series data — revenue, traffic, inventory, sensor readings — and get a forecast with trend decomposition, seasonality detection, and confidence intervals.

## The Conversation

```
You: "I have 2 years of daily sales data. Can you forecast the next 90 days
     and show me the seasonal patterns?"

AI:  I'll upload your data and run Prophet time series decomposition.

     [uploads CSV → discovers Prophet module → maps date and value columns → runs analysis]

     Here's what I found:

     📈 Forecast (next 90 days)
     • Predicted total: $487,000 (95% CI: $412,000 – $562,000)
     • Trend: +2.1% monthly growth continuing
     • Next peak: mid-April (Easter seasonal effect)

     🔄 Seasonality
     • Weekly: sales peak Tuesday-Thursday, dip 35% on weekends
     • Monthly: first week of each month is strongest (+18%)
     • Annual: Q4 is 2.4x Q1 (holiday effect starts mid-October)

     📊 Decomposition
     • Trend component: steady upward, $8,200/day baseline growing to $8,900
     • Seasonal component: explains 31% of variance
     • Residual: 3 anomaly days flagged (Black Friday, site outage, viral post)

     [View full interactive report →]
```

## When to Use This

- Revenue or demand forecasting for planning
- Detecting seasonal patterns in business data
- Anomaly detection in time series
- Budget planning with confidence intervals

## Data Format

Any CSV with a date column and a numeric value column. Works with daily, weekly, or monthly data. At least 2 full seasonal cycles recommended (e.g., 2 years of monthly data, or 2 weeks of daily data).

## Try It

Upload your time series data and ask:

```
"Forecast the next 90 days and decompose the trend and seasonality.
Flag any anomalies in the historical data."
```

[View sample report →](https://mcpanalytics.ai/free/general__generic__timeseries__prophet_decomposition)
