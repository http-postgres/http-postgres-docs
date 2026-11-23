<div align="center">

  <h1>HTTP PostgreSQL Gateway Documentation</h1>

  <p>
    <strong>The official developer documentation portal for HTTP PostgreSQL Gateway.</strong><br />
    Persistent HTTP bridge to PostgreSQL for serverless and edge runtimes with connection pooling, least-privilege role scopes, and atomic transactions.
  </p>

  <p>
    <a href="https://github.com/http-postgres/http-postgres"><img src="https://img.shields.io/badge/GitHub-http--postgres%2Fhttp--postgres-blue?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
    <a href="https://github.com/http-postgres/http-postgres/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
  </p>

</div>

---

## Overview

This repository contains the documentation portal for **[HTTP PostgreSQL Gateway](https://github.com/http-postgres/http-postgres)**, built with [Nuxt](https://nuxt.com) and [Docus](https://docus.dev).

It covers:
- **Getting Started:** Quickstart guides, architecture overview, and prerequisites.
- **Serverless Integration:** Minimal `fetch()` client, execution modes, and timeout/retry safety.
- **API Reference:** Full reference for Query, Transaction, and Administration endpoints, CRUD scopes, and error codes.
- **Configuration:** Complete `gateway.yaml` specification, connection pool sizing, and SQLite analytics worker.
- **Operations & Security:** Production deployment topology, systemd/Docker setups, security hardening, and contributor guides.

---

## Development

### Prerequisites

- Node.js 22.13+ or 23.4+ with `node:sqlite`
- npm 10+

### Setup

```bash
# Install dependencies
npm ci

# Start local documentation server
npm run dev
```

Visit `http://localhost:3000` to preview the documentation with live reload.

### Build for Production

```bash
# Build static / Nitro server output
npm run build

# Preview production build
npm run preview
```

---

## Upstream Repository

For the core gateway codebase, issue tracker, and releases:
- [HTTP PostgreSQL Gateway on GitHub](https://github.com/http-postgres/http-postgres)
# http-postgres-docs
