# CSV Data Exploration

**Module:** [`general__generic__csv__auto_profiler`](https://mcpanalytics.ai/free/general__generic__csv__auto_profiler)

Upload any CSV and get an instant profile — distributions, missing values, correlations, outliers, and summary statistics. No setup, no column mapping, no configuration. Just upload and ask.

## The Conversation

```
You: "I have a dataset I'd like to understand. Can you profile it for me?"

AI:  I'll upload your file and run the auto profiler.

     [uploads CSV → discovers auto_profiler → runs analysis]

     Here's what I found in your dataset:

     📊 Dataset Overview
     • 4,821 rows × 12 columns
     • 3 numeric, 5 categorical, 2 date, 2 text columns
     • 2.1% missing values (concentrated in "region" column)

     📈 Key Findings
     • "revenue" is right-skewed (median $142, mean $287 — outliers pulling mean up)
     • "signup_date" shows a growth trend — 3x more signups in Q4 vs Q1
     • Strong correlation between "page_views" and "conversion" (r = 0.72)
     • 4 outlier rows with revenue > $5,000 (worth investigating)

     [View full interactive report →]
```

## When to Use This

- First look at an unfamiliar dataset
- Quick data quality check before deeper analysis
- Understanding distributions and relationships
- Finding missing data, outliers, and anomalies

## What the Report Includes

- Column-by-column summary statistics (mean, median, std, quartiles)
- Distribution histograms for every numeric column
- Frequency tables for categorical columns
- Correlation matrix with significance indicators
- Missing value heatmap
- Outlier detection per column

## Try It

Upload any CSV to MCP Analytics and ask:

```
"Profile this dataset — show me distributions, missing values, and correlations."
```

[View sample report →](https://mcpanalytics.ai/free/general__generic__csv__auto_profiler)
