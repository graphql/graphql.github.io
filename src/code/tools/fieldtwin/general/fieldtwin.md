---
name: fieldtwin
description: A local, stateful twin of the Jobber GraphQL API, seeded with a believable fake business, for testing integrations and AI agents.
url: https://nickgeorgeai.com/fieldtwin
github: nickgeorgeseo/fieldtwin
tags:
  - tools-and-libraries
  - tools
---

fieldtwin runs a twin of Jobber's GraphQL API on your machine, seeded with a fake trades business: clients, technicians, and months of jobs, visits, quotes, and invoices. A twin of the QuickBooks Online API runs beside it, describing the same business. Point a client at `http://localhost:4010/api/graphql` instead of `https://api.getjobber.com/api/graphql` and it gets the same paths, headers, and JSON back, with no real account involved.

```bash
git clone https://github.com/nickgeorgeseo/fieldtwin && cd fieldtwin
npm ci && npm start

curl -X POST http://localhost:4010/api/graphql \
  -H "Authorization: Bearer dev" \
  -H "X-JOBBER-GRAPHQL-VERSION: 2025-04-16" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ clients(first: 5) { nodes { id name } totalCount } }"}'
```

The twin follows Jobber's public docs where a client would notice: Relay connections with `first`, `last`, `after`, and `before`, base64 `EncodedId` scalars, `userErrors` on mutations, and the documented query cost, checked before a query runs and spent from a budget that refills over time, so an expensive query comes back `THROTTLED` as it would in production. Where the docs leave a detail open, the project's fidelity notes say so instead of guessing quietly.

A control plane under `/_twin`, also offered as MCP tools, makes the hard cases easy to reach: mark a checkpoint, let your code or an AI agent work, list exactly what it changed, and rewind. Faults on demand (throttling, gateway errors, and answers lost after a write), webhooks delivered twice or late, and a clock you can move forward cover what a vendor sandbox rarely shows. Every run starts from a seed, so the same requests give the same results.
