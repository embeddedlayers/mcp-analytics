# Security Policy

## Reporting a Vulnerability

**Do not report security vulnerabilities in public GitHub Issues.**

Email **support@mcpanalytics.ai** with subject line `[SECURITY]`. Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

**Response timeline:**
- Acknowledgement within 48 hours
- Status update within 7 days
- Fix deployed within 30 days for confirmed vulnerabilities

MCP Analytics processes financial data (Shopify orders, Stripe payments). We treat security reports seriously and respond promptly.

## Supported Versions

MCP Analytics is a hosted service — all users automatically run the latest version. There are no self-hosted editions to patch.

## Security Measures

### Authentication
- OAuth 2.0 with PKCE via Auth0
- No API keys — authentication is entirely OAuth-based
- Scoped permissions: `execute:tools`, `openid`, `profile`, `email`
- Token refresh handled automatically by the MCP client

### Data Protection
- TLS 1.3 for all data in transit
- AES-256-GCM encryption for connector credentials at rest
- Encryption keys stored in Azure Key Vault
- Ephemeral analysis: data is not retained after a job completes

### Infrastructure
- DDoS protection and WAF via Cloudflare
- Isolated Docker containers per analysis job
- Azure managed database with automated backups
- Secrets managed via Azure Key Vault (not hardcoded anywhere)

### Privacy
- No data retention after analysis completes
- Connector credentials deletable at any time from your account
- Reports are private by default; sharing is opt-in

## Best Practices for Users

**Credentials**: Never paste raw API tokens or passwords into your AI chat. Use the connector setup flow in your account — credentials are encrypted before storage.

**Data**: Anonymize PII before uploading datasets when possible. Uploaded data is processed ephemerally and not retained, but minimizing sensitive data in transit is good practice.

**Reports**: Shared report URLs are accessible to anyone with the link. Only share reports that contain data you're comfortable sharing.

**OAuth**: Review the permission scopes when authenticating. If you suspect your account is compromised, contact support@mcpanalytics.ai to revoke access.

## Compliance

- GDPR: Data deletion available upon request
- SOC 2: In progress
- No data retention by default

---

Last updated: March 2026
