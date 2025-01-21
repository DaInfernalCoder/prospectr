# Tech Context  
**Last Updated:** 2024-02-21

## Core Stack
- Next.js 14 (App Router)
- Tailwind CSS + Shadcn UI
- Supabase Auth + Postgres
- Unipile LinkedIn API

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
}
```

[//]: # (Cross-reference: systemPatterns.md#auth-architecture)
