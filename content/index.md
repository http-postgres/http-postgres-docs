---
seo:
  title: HTTP PostgreSQL Gateway Documentation
  description: Persistent HTTP bridge to PostgreSQL for serverless and edge runtimes with native connection pooling, least-privilege role mapping, and atomic transactions.
---

::u-page-hero
---
ui:
  root: 'hero-section-bg relative isolate overflow-hidden'
---
#title
The HTTP Bridge to PostgreSQL for Serverless & Edge

#description
Run PostgreSQL queries over standard **stateless HTTPS `fetch()`** without driver dependencies. Keep reusable connection pools alive, enforce **least-privilege role scopes**, and execute atomic multi-statement transactions with full idempotency guarantees.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started/quickstart
  trailing-icon: i-lucide-arrow-right
  ---
  Get Started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-lucide-terminal
  size: xl
  to: /api-reference/overview
  variant: outline
  ---
  API Reference
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  to: https://github.com/http-postgres/http-postgres
  target: _blank
  variant: ghost
  ---
  GitHub
  :::
::

::u-page-section
#title
Engineered for Modern Cloud & Edge Architectures

#description
Solve direct database connection limits and distributed secret exposure with a secure, long-running gateway process.

#features
  :::u-page-feature
  ---
  icon: i-lucide-zap
  to: /serverless/minimal-client
  ---
  #title
  Stateless [fetch() API]{.text-primary}
  
  #description
  Connect from Cloudflare Workers, Vercel, AWS Lambda, Deno, or Bun using standard HTTPS and JSON. Zero TCP socket requirements or native driver binaries.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  to: /configuration/connection-pools
  ---
  #title
  Persistent [Connection Pools]{.text-primary}
  
  #description
  Prewarm and reuse backend PostgreSQL sessions across thousands of ephemeral serverless invocations with automatic verification and `DISCARD ALL` resets.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  to: /api-reference/scopes-permissions
  ---
  #title
  Role-Based [Least Privilege]{.text-primary}
  
  #description
  Map API keys directly to dynamic PostgreSQL roles with granular database and table-level CRUD permissions (`c`, `r`, `u`, `d`). PostgreSQL enforces authorization.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers
  to: /api-reference/transactions
  ---
  #title
  Atomic [Transactions]{.text-primary}
  
  #description
  Submit multi-statement batches with `Idempotency-Key` headers, configurable isolation levels, and deferred status polling to prevent accidental duplicate writes.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-clock
  to: /api-reference/queries
  ---
  #title
  Asynchronous [Query Offload]{.text-primary}
  
  #description
  Offload long-running queries beyond invocation deadlines with durable status tracking, 5-minute statement timeouts, and non-blocking polling.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bar-chart-3
  to: /configuration/analytics
  ---
  #title
  Observability & [Rate Limiting]{.text-primary}
  
  #description
  Redis-backed distributed rate limits, worker-thread SQLite analytics, and automatic failed-SQL literal sanitization for production security.
  :::
::

::u-page-section
#title
Quick Integration

#description
Execute queries from any serverless environment using standard `fetch()` in just a few lines of code.

```typescript
// Minimal serverless client with timeout handling
export async function queryPostgres(sql: string, params: unknown[] = []) {
  const res = await fetch(`${process.env.PG_GATEWAY_URL}/query`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.PG_GATEWAY_API_KEY!,
      'x-database': process.env.PG_GATEWAY_DATABASE!,
    },
    body: JSON.stringify({ query: sql, parameters: params }),
  })

  const payload = await res.json()
  if (!res.ok) throw new Error(payload.error?.code ?? `HTTP_${res.status}`)
  return payload.data
}
```
::
