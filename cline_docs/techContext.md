# Technical Context

Last Updated: 1/23/2025

## Core Technologies
- Next.js 14
- React
- Tailwind CSS
- Framer Motion
- Supabase (Authentication & Database)
  - Google OAuth
  - Magic Link Authentication
  - Session Management
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

### Authentication Flow
- Supabase Authentication
  - Google OAuth provider
  - Magic Link (email) provider
  - Session management with cookies
  - Protected routes in dashboard
  - Auth callback handling
  - Automatic redirect to dashboard after login

### API Integration
- Campaign progress tracking
- Reply management
- User session management
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

## Docs 
1. LinkedIn Hosted Auth: 
Quickstart
Step 1 : Generate a Hosted Auth Wizard link
To generate a hosted auth link, you'll need to make an API Request with the following parameters:

Specifies whether you want to create a new connection or reconnect a disconnected account.
Your Unipile API endpoint.
The expiration date and time for the link in ISO 8601 format. Make sure it is a relatively short expiration period, ranging from a few minutes to a few hours. All links expire upon daily restart, regardless of their stated expiration date. A new link must be generated each time a user clicks on your app to connect.
A list of messaging providers the user can choose from in the wizard. You can specify a specific provider or use "*" for all providers.
Upon a user's successful login, you can configure two distinct URLs, one for success (success_redirect_url) and another for failure (failure_redirect_url), to which the user will be redirected. Additionally, you have the option to receive a webhook notification containing account-related information at a URL of your choosing (notify_url).
You can specify the 'name' parameter with your internal user ID when requesting a hosted auth link. We will return this parameter when we call your 'notify_url', in order to match the connected account with your user
cURL
JavaScript

const response = await client.account.createHostedAuthLink({
  type: "create",
  api_url: "https://{YOUR_DSN}",
  expiresOn: "2024-12-22T12:00:00.701Z",
  providers: "*",
  // More options here https://developer.unipile.com/reference/hostedcontroller_requestlink
})
The utmost caution must be exercised to prevent the inadvertent exposure of your X-API-KEY. To accomplish this, it is necessary to establish an intermediary backend process responsible for make this api call who generate the unique link tailored to each user.

Upon a user's successful login, you can configure two distinct URLs, one for success (success_redirect_url) and another for failure (failure_redirect_url), to which the user will be redirected. Additionally, you have the option to receive a webhook notification containing account-related information at a URL of your choosing (notify_url).

Step 2 : Receive the Hosted Auth Link
Upon a successful API request, you'll receive a response containing a hosted auth URL. This URL is the link that will guide users through the authentication process.

JSON Response

{
  "object": "HostedAuthURL",
  "url": "https://account.unipile.com/pqb%2Gz77l.o72WXNPdqWX45jxqP5xMMlQp02zho8GAXZq0HWsAGiQ%3D"
}
Step 3: Implement the Hosted Auth Link
We strongly recommend the implementation of an automatic redirection mechanism when a user clicks a 'connect account' button within your application.

We do not recommend embedding our link in an iframe as this may cause some issues with solving the Linkedin captcha or loading the Microsoft Oauth screen..

Step 4: Receive callback when account is added
When your user successfully connects an account, you can receive a callback on a URL of your choice with the account_id and your internal ID to store the matching and make your future requests.

Add "notify_url" with your backend URL and "name" with your internal user ID parameters in your payload.

cURL
JavaScript

const response = await client.account.createHostedAuthLink({
  type: "create",
  api_url: "https://{YOUR_DSN}",
  expiresOn: "2024-12-22T12:00:00.701Z",
  providers: "*",
  notify_url: "https://www.yourhostedlink.com?youcanauth=asthis",
  name: "myuser1234"
})
After the user connects their account, you will receive this payload on your notify URL.

JSON

{
  "status":"CREATION_SUCCESS", // or "RECONNECTED" for reconnect type
  "account_id":"e54m8LR22bA7G5qsAc8w",
  "name":"myuser1234"
}
Reconnecting an account with Hosted Auth Wizard
The reconnection link follows a similar path as the initial connection process, but with the type parameter set to reconnect, and it necessitates the inclusion of the account ID (reconnect_account).

Example usage
First, you need to set up a webhook to monitor account status updates. Specifically, you should look for the "CREDENTIALS" status change, which indicates that an account requires reconnection.
Upon detecting the "CREDENTIALS" status update, send an email to the user. In this email, provide a link that will allow them to initiate the reconnection process. Ensure that the email contains clear instructions and reassures the user about the security of the process.
When the user clicks on the reconnection link in the email, they should be directed to your backend service. This backend service generates a hosted Auth Wizard link using the Unipile API
After generating the hosted Auth Wizard link, redirect the user to this link. The user will follow the authentication steps to reconnect their account securely.
Custom Domain URL (White-label)
You can set up a CNAME using your own URL (e.g. auth.yourapp.com) pointing to account.unipile.com.

Once set up, please contact us for configuration. Finally, you can make a string replace of our domain by yours in the hosted auth URL.
Important: This feature is only available for Unipile account with active subscription.