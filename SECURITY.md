# Security Policy

## Reporting a Vulnerability

**Do not report security vulnerabilities in public GitHub Issues.**

Email **support@mcpanalytics.ai** with subject line `[SECURITY]`. Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

MCP Analytics processes financial data (Shopify orders, Stripe payments). We treat security reports seriously.

## Supported Versions

MCP Analytics is a hosted service, all users automatically run the latest version. There are no self-hosted editions to patch.

## Security Measures

### Authentication
- Connect with an API key in the X-API-Key header (from your account settings) or with OAuth 2.0 via Auth0
- Scoped permissions: `execute:tools`, `openid`, `profile`, `email`
- Token refresh handled automatically by the MCP client

### Data Protection
- Your data travels to us over HTTPS (TLS), and plain HTTP requests are redirected to HTTPS. Our database runs on encrypted storage managed by Azure. Each dataset's contents are also stored encrypted under their own key. Today our service also holds that key so it can run your analysis, which means this layer protects the stored copy but does not protect against someone who has access to our database.

### Infrastructure
- DDoS protection and WAF via Cloudflare
- Secrets managed via Azure Key Vault

### Privacy
- Datasets you upload are stored, encrypted as described above, so you can reuse them.
- Connector credentials deletable at any time from your account
- Reports are private by default; sharing is opt-in

## Best Practices for Users

**Credentials**: Never paste raw API tokens or passwords into your AI chat. Use the connector setup flow in your account.

**Data**: Anonymize PII before uploading datasets when possible. Minimizing sensitive data in transit is good practice.

**Reports**: Shared report URLs are accessible to anyone with the link. Only share reports that contain data you're comfortable sharing.

**OAuth**: Review the permission scopes when authenticating. If you suspect your account is compromised, contact support@mcpanalytics.ai to revoke access.

## Compliance

- GDPR: Data deletion available upon request
- SOC 2: In progress

---

Last updated: March 2026
