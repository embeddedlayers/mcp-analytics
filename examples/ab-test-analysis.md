# A/B Test Analysis

**Module:** [`analytics__statistical__groups__t_test`](https://mcpanalytics.ai/free/analytics__statistical__groups__t_test)

Upload your experiment data with control and treatment groups. Get statistical significance, effect sizes, confidence intervals, and a plain-English verdict on whether your test won.

## The Conversation

```
You: "We ran an A/B test on our checkout page. I have conversion rates
     and revenue per user for both variants. Did the new design win?"

AI:  I'll upload your experiment data and run a t-test analysis.

     [uploads CSV → discovers t-test module → maps group and metric columns → runs analysis]

     Here's what I found:

     ✅ Result: Variant B wins (statistically significant)

     📊 Key Metrics
     • Control (A): 3.2% conversion, $4.81 avg revenue/user
     • Treatment (B): 4.1% conversion, $5.67 avg revenue/user
     • Lift: +28% conversion, +18% revenue per user

     📏 Statistical Rigor
     • p-value: 0.003 (well below 0.05 threshold)
     • 95% CI for difference: +0.4% to +1.3% conversion
     • Effect size (Cohen's d): 0.42 (medium effect)
     • Statistical power: 0.91 (well-powered test)

     💡 Recommendation
     The new checkout design produces a statistically significant improvement
     in both conversion rate and revenue. The effect is medium-sized and
     the test was well-powered. Safe to roll out to 100%.

     [View full interactive report →]
```

## When to Use This

- Evaluating website or app A/B tests
- Comparing marketing campaign performance
- Testing pricing changes
- Any experiment with a control and treatment group

## Data Format

CSV with at least two columns: a group identifier (e.g., "control" / "treatment") and a numeric outcome (e.g., conversion, revenue, time on page). One row per user or observation.

## Try It

Upload your experiment data and ask:

```
"Run a t-test on my A/B test data. Tell me if the difference is
statistically significant and whether I should roll out the variant."
```

[View sample report →](https://mcpanalytics.ai/free/analytics__statistical__groups__t_test)
