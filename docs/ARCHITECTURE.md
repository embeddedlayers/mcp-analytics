# MCP Analytics — Architecture Overview

This document describes how MCP Analytics works at a high level. It is written for developers and technically curious users evaluating the platform.

## How It Works

MCP Analytics is a hosted MCP server. You connect your AI client (Claude Desktop, Cursor, or any MCP-compatible tool) to our server URL. When you ask a question, your AI assistant discovers the right analysis tool, uploads your data, runs the analysis, and returns an interactive HTML report — all through the MCP protocol.

```
Your AI Client (Claude / Cursor)
        │  MCP Protocol
        ▼
  api.mcpanalytics.ai
        │
  ┌─────┴──────┐
  │  Auth0     │  OAuth 2.0 / PKCE
  │  FastAPI   │  Request routing, tool registry, job management
  │  PostgreSQL│  User data, job queue, report storage, semantic search (pgvector)
  └─────┬──────┘
        │
  Docker containers (per analysis)
        │
  R statistical modules
        │
  Interactive HTML Report → returned to your AI client
```

## Core Components

### API Server

FastAPI application handling the MCP protocol, REST endpoints, OAuth authentication, and job orchestration. Deployed on Azure, protected by Cloudflare.

### Tool Registry

Every analysis module is registered in PostgreSQL with its schema, column requirements, and precheck rules. The registry drives discovery — when you describe what you want to analyze, the discovery system searches the registry to find matching tools.

### Semantic Tool Discovery

Five-signal Reciprocal Rank Fusion matches your dataset and question to the right analysis tool:
1. Structural similarity — tool schema vs. dataset columns
2. LLM description embeddings — semantic match of tool description to your question
3. LLM overview embeddings — analytical fit to your use case
4. Type coverage — column type overlap
5. Category fit — domain alignment

Embeddings are stored in PostgreSQL via pgvector. The five signals are combined and ranked to surface the best-matching tool.

### Analysis Execution

Each analysis runs in an isolated Docker container with the R statistical environment. Containers are ephemeral — they start for your job and terminate when it finishes. Your data is never persisted between sessions.

### Report Generation

Analysis output is rendered into interactive HTML reports — charts, statistical summaries, and AI-written interpretation. Reports get a permanent shareable URL.

### Data Connectors

Native connectors for Shopify, Stripe, WooCommerce, and eBay pull data directly via their APIs. CSV and JSON uploads are also supported. Connector credentials are encrypted with AES-256-GCM using per-connector keys stored in Azure Key Vault.

## Authentication

OAuth 2.0 with PKCE via Auth0. No API keys. On first connection, your MCP client initiates the OAuth flow and you authenticate once in a browser. The token is stored by your MCP client and refreshed automatically.

## Data Privacy

- Data uploaded for analysis is processed ephemerally — not retained after the job completes
- Connector credentials are encrypted at rest with keys you can revoke at any time
- Reports are stored and accessible via your account; you control sharing
- TLS 1.3 for all data in transit

## Technology

| Component | Technology |
|-----------|-----------|
| API framework | FastAPI (Python) |
| Database | PostgreSQL (Azure managed) |
| Vector search | pgvector |
| Auth | Auth0 (OAuth 2.0) |
| Analysis runtime | R (validated statistical modules) |
| Container runtime | Docker |
| CDN / DDoS | Cloudflare |
| Secrets | Azure Key Vault |
| Hosting | Azure |

---

For API reference: [api.mcpanalytics.ai/docs](https://api.mcpanalytics.ai/docs)
For support: support@mcpanalytics.ai
