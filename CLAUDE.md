# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prospectr is a LinkedIn lead generation and outreach automation platform built with Next.js. It integrates with LinkedIn via Unipile API, handles subscriptions through Stripe, and stores data in Supabase.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build the application  
npm run build

# Production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15.2.2 with App Router, React 18.2.0, Tailwind CSS, DaisyUI, shadcn/ui
- **Backend**: Next.js API routes, Supabase (auth + database), Stripe (payments)
- **Integrations**: Unipile (LinkedIn API), Resend (emails), Crisp (support chat)
- **State Management**: React Context, Zustand (campaign flow), TanStack Query (server state)
- **Deployment**: Vercel with cron jobs

### Directory Structure

**Core Application**:
- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components with naming pattern (e.g., ButtonAccount.js, CardAnalytics.js)
- `libs/` - Core services (stripe.js, supabase-client.js, api.js, gpt.js)
- `utils/` - Helper functions and utilities

**Key Directories**:
- `app/api/` - API routes for LinkedIn, Stripe, authentication, cron jobs
- `app/dashboard/` - Main user dashboard and campaign management
- `components/contexts/` - React Context providers (LinkedInContext, AnalyticsContext)
- `app/store/` - Zustand stores (campaignStore.js for multi-step campaign creation)
- `supabase/` - Database migrations and configuration
- `tasks/` - Task Master AI project management files

### Database Schema (Supabase)

**Main Tables**:
- `profiles` - User profiles with LinkedIn integration status, subscription data
- `invitation_jobs` - Campaign/outreach job management  
- `invitation_users` - Recipients for invitation campaigns
- `invitation_templates` - Message templates
- `saved_profiles` - Bookmarked LinkedIn profiles
- `leads` - Lead management
- `linkedin_connections` - Connection tracking

All tables implement Row Level Security (RLS) policies for user data isolation.

### API Integration Patterns

**LinkedIn Integration (Unipile)**:
- Authentication flow: `/api/auths/linkedin/*`
- Search and profiles: `/api/linkedin/search`, `/api/linkedin/profile`
- Invitations: `/api/linkedin/invitations/send`
- Status monitoring: `/api/linkedin/test-connection`

**Stripe Integration**:
- Checkout: `/api/stripe/create-checkout`
- Webhooks: `/api/webhook/stripe` (with signature verification)
- Customer portal: `/api/stripe/customer-portal`

**Cron Jobs**: `/api/cron/*` - Scheduled tasks for LinkedIn activity monitoring

### State Management Patterns

- **Global State**: React Context for LinkedIn connection status and analytics
- **Campaign Flow**: Zustand store with persistence for multi-step campaign creation
- **Server State**: TanStack Query for caching LinkedIn search results and API data
- **Wrap client components with Suspense**: Required for components using useSearchParams, usePathname, useRouter

### Code Conventions

**From .cursorrules**:
- Use functional/declarative patterns, avoid classes
- Naming: kebab-case directories, camelCase variables, PascalCase components
- Component files: PascalCase with prefixes (ButtonAccount.js, CardAnalyticsMain.js)
- Minimize 'use client' - favor React Server Components
- Always wrap client components using hooks in Suspense boundaries
- Use &apos; for apostrophes in JSX to prevent build errors
- DaisyUI theme set to "black"

### Environment Configuration

Required environment variables (stored in .env.local):
- Supabase: connection details and auth
- Stripe: secret key and price IDs  
- Unipile: API URL and token for LinkedIn integration
- Resend: API key for transactional emails

### Testing and Quality

- ESLint configuration ignores: "no-unused-vars", "react/no-unescaped-entities", "react-hooks/exhaustive-deps"
- Auto-fix enabled for linting issues
- Run `npm run lint` before committing changes