# Technical Context

Last Updated: 1/23/2025

## Core Technologies
- Next.js 14
- React
- Tailwind CSS
- Framer Motion
- Supabase
- Unipile API (LinkedIn Integration)

## Integration Patterns
- Client-side navigation
- Server-side rendering where needed
- API routes for data operations
- Real-time updates for campaign data
- Unipile API integration for LinkedIn operations

## Technical Constraints
- Must maintain mobile responsiveness
- Performance optimization for animations
- Accessibility compliance
- Cross-browser compatibility
- LinkedIn Rate Limits:
  - Free accounts: ~15 invitations/week
  - Paid accounts: 80-100 invitations/day, ~200/week
  - Profile visits: 80-100/day (free), 150/day (Sales Navigator)
  - Messages: 100-150/day
  - Search results: 1000/day (free), 2500/day (Sales Navigator)

## Development Environment
- Node.js
- npm/yarn package management
- VSCode IDE
- Git version control
- Unipile Dashboard for API configuration

## Current Implementation Details

### UI Components
- New sidebar implementation with Framer Motion
- Black and white theme using Tailwind
- Campaign progress visualization
- Replies section in analytics
- Mobile-responsive design patterns

### Data Management
- Campaign data structure
- Analytics aggregation
- User settings persistence
- Real-time updates
- LinkedIn account credentials (via Unipile)

### API Integration
- Campaign progress tracking
- Reply management
- User authentication
- Analytics data fetching
- Unipile Integration:
  - Authentication flows (username/password & cookie-based)
  - Profile search and filtering
  - Connection request management
  - Message templating and sending
  - Rate limit handling
  - Error management and retries

### Unipile Implementation Requirements
- DSN configuration for API endpoints
- Access token management
- Checkpoint handling (2FA, OTP, CAPTCHA)
- Action spacing (~1 min intervals)
- Working hours distribution
- Account warmup strategy

## Future Considerations
- API implementation for campaign progress
- Real-time updates for replies
- Performance monitoring
- Analytics data caching
- Advanced LinkedIn search parameters
- Multi-account management
- Rate limit optimization
