# System Patterns
**Last Updated:** 2024-02-21

## Auth Architecture
```mermaid
graph TD
  A[Client] --> B[Next.js Middleware]
  B --> C[Supabase Auth]
  C --> D[Session Cookie]
  D --> E[Protected Routes]
```

## API Rate Limiting
- Redis-backed counters
- Tier-based buckets (Free/Pro)
- Client-side quota display

## LinkedIn Integration
```mermaid
sequenceDiagram
  Client->>+Server: Campaign Request
  Server->>+Unipile: API Call
  Unipile->>+LinkedIn: Forward Request
  LinkedIn-->>-Unipile: Response
  Unipile-->>-Server: Normalized Data
  Server-->>-Client: Formatted Results
```

[//]: # (Cross-reference: techContext.md#api-security)
