# LinkedIn Integration

This document explains how the LinkedIn integration works in Prospectr.

## Overview

Prospectr integrates with LinkedIn through Unipile to allow users to:

- Connect their LinkedIn accounts
- Check the connection status
- Automatically update their Supabase profile with LinkedIn connection details

## Components

The following components are involved in the LinkedIn integration:

### 1. ButtonLinkedin Component

Located at `/components/ButtonLinkedin.js`, this client component:

- Shows the LinkedIn connect/reconnect button
- Checks the connection status via the status API endpoint
- Redirects users to the connect API endpoint when clicked

### 2. API Endpoints

#### LinkedIn Connect

- Path: `/api/auths/linkedin/connect`
- Uses Unipile to generate an authentication link for LinkedIn
- Redirects the user to the LinkedIn authorization page
- Associates the user's Supabase ID with the LinkedIn account

#### LinkedIn Callback

- Path: `/api/auths/linkedin/callback`
- Receives webhook callbacks from Unipile when a user connects or disconnects their LinkedIn account
- Updates the user's profile in Supabase with the connection status and token

#### LinkedIn Status

- Path: `/api/auths/linkedin/status`
- Checks if the user's LinkedIn account is connected
- Verifies the token is still valid with Unipile

### 3. Settings Page Integration

The LinkedIn connection UI is integrated in:

- Dashboard header for quick access (when not connected)
- Settings page for managing the connection

## Database Schema

The LinkedIn connection data is stored in the `profiles` table in Supabase:

- `linkedin_status`: Boolean indicating if the LinkedIn account is connected
- `unipile_account_id`: The Unipile account ID representing the LinkedIn connection
- `linkedin_token`: Legacy field (not currently used in the implementation)
- `created_at`/`updated_at`: Timestamps of when the profile was created/last updated

## Authentication Flow

1. User clicks the "Connect LinkedIn" button
2. User is redirected to the LinkedIn authorization page via Unipile
3. After authorizing, Unipile sends a webhook to our callback endpoint
4. The callback updates the user's profile in Supabase
5. The UI reflects the connected state

## Configuration

The LinkedIn integration relies on these environment variables:

- `UNIPILE_API_URL`: The Unipile API URL
- `UNIPILE_API_TOKEN`: The Unipile API token
- `NEXT_PUBLIC_APP_URL`: The URL of the application for webhook callbacks

## Troubleshooting

If the LinkedIn connection is not working:

1. Check the Unipile configuration in `.env`
2. Verify the user is authenticated
3. Check the browser console for errors
4. Check server logs for webhook errors

For support, contact the development team or refer to the Unipile documentation.
