# System Patterns

Last Updated: 1/23/2025

## Architecture Overview
- Next.js application with dashboard functionality
- Client-side navigation using Next.js router
- Component-based UI structure
- Unipile integration for LinkedIn automation

## Core Technical Patterns

### LinkedIn Integration
- Unipile service layer for API abstraction
- Rate-limited operations with account tier management
- Checkpoint resolution system for auth flows
- Account connection with dual auth methods:
  - Username/password flow
  - Cookie-based (li_at token) auth

### Database Structure
- Supabase with RLS policies
- LinkedIn accounts table with:
  - User association
  - Account type tracking
  - Daily limits management
  - Activity monitoring

### API Layer
- RESTful endpoints for LinkedIn operations
- Authenticated routes with user context
- Error handling with specific status codes
- Rate limit tracking per account

### UI Components
- Sidebar navigation using Framer Motion
- Responsive design with mobile-first approach
- Dark/light theme support using Tailwind CSS
- LinkedIn account management in settings
- Campaign management interface

## Data Flow
- Dashboard data fetched from API endpoints
- Real-time updates for campaign progress
- Analytics data aggregation for replies
- LinkedIn operations through Unipile service
- Account status monitoring and updates

## Key Technical Decisions
- Using Framer Motion for smooth animations
- Implementing black and white theme for clean UI
- Modular component structure for easy maintenance
- Mobile-responsive sidebar with collapsible menu
- Unipile for LinkedIn API abstraction
- Supabase for data persistence

## UI/UX Patterns
- Minimalist black and white theme
- Responsive sidebar with hover animations
- Clear visual hierarchy in dashboard
- Campaign progress visualization
- Replies section for engagement tracking
- Account management interface

## Component Structure
- Sidebar: Collapsible navigation with animations
- Dashboard: Main content area with analytics
- Analytics: Campaign metrics and replies
- Settings: User configuration and LinkedIn accounts
- Campaign Management: Search and automation

## Error Handling
- Graceful fallbacks for loading states
- Clear error messages for failed operations
- Automatic retry mechanisms for API calls
- LinkedIn checkpoint resolution flow
- Rate limit violation prevention

## Performance Considerations
- Optimized animations for smooth transitions
- Lazy loading of dashboard components
- Efficient state management
- Rate limit tracking per account
- Spaced operations for LinkedIn actions

## Security Patterns
- RLS policies for data access
- Secure credential handling
- Token-based authentication
- API key protection
- Rate limit enforcement

## Integration Patterns
- Client-side navigation
- Server-side rendering where needed
- API routes for data operations
- Real-time updates for campaign data
- LinkedIn API abstraction layer

## Development Workflow
- Migration-based schema changes
- Component-first development
- Modular service architecture
- Comprehensive error handling
- Testing patterns for integrations
