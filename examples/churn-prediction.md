# Churn Prediction

**Module:** [`commerce__stripe__subscriptions__churn_prediction`](https://mcpanalytics.ai/free/commerce__stripe__subscriptions__churn_prediction)

Upload your Stripe subscription export and predict which customers are most likely to churn. Get risk scores, key churn drivers, and segments to target with retention campaigns.

## The Conversation

```
You: "I have our Stripe subscription data. Can you predict which customers
     are at risk of churning and tell me why?"

AI:  I'll upload your subscription data and run churn prediction.

     [uploads CSV → discovers churn prediction module → maps columns → runs analysis]

     Here's what I found:

     ⚠️ Churn Risk Summary
     • 23% of active subscribers are high-risk (>70% churn probability)
     • Predicted churn rate next month: 6.8% (vs 5.2% historical average)
     • 142 subscribers flagged for immediate intervention

     🔑 Top Churn Drivers
     1. Days since last login (most predictive — inactive users churn 4x more)
     2. Support ticket count (3+ tickets = 2.8x churn risk)
     3. Plan type (monthly plans churn 3x more than annual)
     4. Usage decline (>50% drop in last 30 days = high risk signal)

     🎯 Segments
     • "Ghost subscribers": paying but no activity in 30+ days (87 users, 82% churn risk)
     • "Frustrated power users": high usage but 3+ support tickets (31 users, 61% churn risk)
     • "Price sensitive": downgraded plan in last 90 days (28 users, 55% churn risk)

     [View full interactive report →]
```

## When to Use This

- Monthly churn review and early warning system
- Building targeted retention campaigns
- Understanding why customers leave
- Prioritizing customer success outreach

## Data Format

Export from Stripe Dashboard → Subscriptions → Export, or use any CSV with subscription-level data including status, dates, plan info, and activity metrics.

## Try It

Upload your subscription data and ask:

```
"Predict churn risk for each subscriber. Show me the top risk factors
and which customer segments I should focus retention efforts on."
```

[View sample report →](https://mcpanalytics.ai/free/commerce__stripe__subscriptions__churn_prediction)
