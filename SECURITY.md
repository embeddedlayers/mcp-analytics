# Security Policy

## Reporting Security Vulnerabilities

The security of MCP Analytics is our top priority. If you discover a security vulnerability, please follow these steps:

### 🔴 Do NOT

- Do not open a public GitHub issue
- Do not discuss the vulnerability publicly
- Do not exploit the vulnerability beyond verification

### ✅ DO

1. **Email us immediately** at security@mcpanalytics.ai
2. Include the following information:
   - Type of vulnerability
   - Affected components
   - Steps to reproduce
   - Potential impact
   - Any proof of concept (if available)

### Our Commitment

- We will acknowledge receipt within 24 hours
- We will provide a detailed response within 72 hours
- We will work with you to understand and resolve the issue
- We will credit you in our security acknowledgments (unless you prefer to remain anonymous)

## Security Measures

### Authentication & Authorization
- OAuth2 with PKCE flow via Auth0
- API key rotation and management
- Rate limiting per API key
- Session timeout controls

### Data Protection
- TLS 1.3 for all data in transit
- AES-256 encryption for data at rest
- Ephemeral processing (no data persistence)
- Isolated Docker containers per analysis

### Infrastructure Security
- Regular security audits
- Automated vulnerability scanning
- DDoS protection via Cloudflare
- WAF (Web Application Firewall)
- Regular penetration testing

### Privacy Practices
- No data retention after processing
- User data deletion upon request
- Encrypted data transmission
- Isolated processing environments

## Best Practices for Users

### API Key Management
- Never share your API keys
- Rotate keys regularly
- Use environment variables for key storage
- Revoke compromised keys immediately

### Data Handling
- Never upload sensitive data without proper authorization
- Ensure PII is properly anonymized
- Use encrypted connections only
- Verify report sharing permissions

### Integration Security
- Keep MCP clients updated
- Review OAuth permissions carefully
- Monitor usage logs for anomalies
- Use separate keys for different environments

## Security Updates

Security updates are released as soon as possible after discovery and verification.

### Update Channels
- Email notifications to registered users
- Security advisory on GitHub
- Announcement on our Discord server
- Update on status.mcpanalytics.ai

### Version Support
- Latest version: Full security support
- Previous minor version: Critical security fixes only
- Older versions: Best effort basis

## Security Documentation

### Available Upon Request
- Security architecture documentation
- Privacy policy details
- Data handling procedures
- Enterprise security options

For enterprise compliance requirements, please contact sales@mcpanalytics.ai

## Contact

For security concerns, contact us at:
- **Email**: security@mcpanalytics.ai
- **PGP Key**: Available at [mcpanalytics.ai/pgp](https://mcpanalytics.ai/pgp)

For general support:
- **Email**: support@mcpanalytics.ai
- **Website**: [mcpanalytics.ai](https://mcpanalytics.ai)

---

Last updated: January 2025

Thank you for helping us keep MCP Analytics secure! 🔒