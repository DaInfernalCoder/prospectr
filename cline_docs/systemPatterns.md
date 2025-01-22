# System Patterns
**Last Updated:** 2024-02-21

## Dashboard Architecture
```mermaid
graph TD
  A[DashboardShell] --> B[Navigation]
  A --> C[Content Area]
  B --> D[Sidebar]
  C --> E[Dashboard Overview]
  C --> F[Campaign Management]
  C --> G[Analytics]
  C --> H[Settings]
  E --> I[Stats Cards]
  E --> J[Recent Activity]
  F --> K[Campaign List]
  F --> L[Campaign Filters]
  G --> M[Metrics Overview]
  G --> N[Performance Charts]
  H --> O[LinkedIn Integration]
  H --> P[Notifications]
```

## Component Patterns
- Dark theme container wrappers
- Responsive grid layouts
- Card-based content blocks
- Real-time metric displays
- Empty state patterns
- Sidebar navigation with icons

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

[//]: # (Cross-reference: techContext.md#design-system)
