# Tech Context  
**Last Updated:** 2024-02-21

## Core Stack
- Next.js 14 (App Router)
- Tailwind CSS + Shadcn UI
- Supabase Auth + Postgres
- Unipile LinkedIn API

## Design System
- Dark theme primary (#0f172a)
- White secondary (#ffffff)
- Neutral grays for UI elements
- Responsive dashboard grid
- Shadcn UI components base
- Icon-based navigation

## Component Architecture
- DashboardShell (layout wrapper)
- Sidebar navigation system
- Stats cards and metrics
- Campaign management views
- Analytics visualizations
- Settings configuration panels

## Auth Implementation
- Cookie-based sessions with JWT
- Middleware-protected routes (/dashboard)
- Custom auth hooks using Zustand
- Team role management system

## API Security
- Redis rate limiting (Supabase)
- Request signing for LinkedIn API calls
- Daily key rotation via Vault
- Tier-based quotas (Free/Pro)

## Monitoring & Analytics
- Supabase Logflare integration
- Custom quota tracking dashboard
- Sentry error tracking
- Campaign performance metrics

## Development Environment
- Node.js v18.17+
- Local Supabase CLI
- VSCode with Prettier/ESLint
- Postman for API testing

## Key Dependencies
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@unipile/js-client": "^1.2.1",
  "d3": "^7.8.5",
  "lucide-react": "latest",
  "framer-motion": "latest"
}
```

[//]: # (Cross-reference: systemPatterns.md#dashboard-architecture)
