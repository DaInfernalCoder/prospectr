# Prospectr Database Documentation

This document provides a comprehensive overview of the Prospectr database structure, including schemas, tables, relationships, and security policies.

## Table of Contents
1. [Schema Overview](#schema-overview)
2. [Public Schema](#public-schema)
3. [Auth Schema](#auth-schema)
4. [Storage Schema](#storage-schema)
5. [Row Level Security (RLS) Policies](#row-level-security-rls-policies)

## Schema Overview

The database consists of the following schemas:

| Schema Name | Size | Table Count | Description |
|------------|------|-------------|-------------|
| auth | 1656 kB | 16 | Authentication and user management |
| public | 312 kB | 9 | Main application data |
| realtime | 272 kB | 9 | Real-time functionality |
| storage | 144 kB | 5 | File storage system |
| supabase_functions | 64 kB | 2 | Edge functions |
| net | 48 kB | 2 | Network-related functionality |
| cron | 152 kB | 2 | Scheduled tasks |
| vault | 24 kB | 1 | Secure data storage |

## Public Schema

### Tables Overview

1. **profiles** (65536 bytes, 9 rows)
   - Primary user profile information
   - Links to auth.users
   - Stores LinkedIn integration and subscription data

2. **invitation_jobs** (81920 bytes, 4 rows)
   - Manages invitation campaigns
   - Tracks job status and metrics

3. **invitation_users** (32768 bytes, 6 rows)
   - Stores invitation recipients
   - Links to invitation_jobs

4. **invitation_templates** (32768 bytes, 3 rows)
   - Stores message templates
   - Used for invitation campaigns

5. **linkedin_status_updates** (32768 bytes, 0 rows)
   - Tracks LinkedIn status changes
   - Monitors integration health

6. **saved_profiles** (24576 bytes, 0 rows)
   - Stores saved LinkedIn profiles
   - User bookmarking system

7. **leads** (16384 bytes, 0 rows)
   - Stores potential customer information
   - Lead management system

8. **linkedin_connections** (16384 bytes, 0 rows)
   - Tracks LinkedIn connection data
   - Network growth monitoring

9. **linkedin_connection_events** (16384 bytes, 0 rows)
   - Logs connection-related events
   - Activity tracking

### Detailed Table Structure: profiles

| Column Name | Data Type | Nullable | Default | Description |
|------------|-----------|-----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| created_at | timestamp with time zone | NO | now() | Record creation timestamp |
| user_id | uuid | NO | - | Foreign key to auth.users |
| linkedin_token | text | YES | - | LinkedIn OAuth token |
| linkedin_status | boolean | YES | false | LinkedIn connection status |
| message_quota | integer | YES | 50 | Daily message limit |
| stripe_customer_id | text | YES | - | Stripe customer identifier |
| subscription_tier | enum | YES | 'FREE' | User's subscription level |
| oauth_state | text | YES | - | OAuth state token |
| unipile_account_id | text | YES | - | Unipile integration ID |
| reconnect_token | text | YES | - | Token for reconnection |
| reconnect_expires_at | date | YES | - | Token expiration date |
| customer_id | text | YES | - | Customer identifier |
| price_id | text | YES | - | Subscription price ID |
| has_access | boolean | YES | false | Access control flag |
| subscription_id | text | YES | - | Subscription identifier |
| subscription_status | text | YES | - | Current subscription status |
| trial_ends_at | timestamp with time zone | YES | - | Trial period end date |
| cancel_at_period_end | timestamp with time zone | YES | - | Subscription end date |
| subscription_created_at | timestamp with time zone | YES | - | Subscription start date |
| last_payment_at | timestamp with time zone | YES | - | Last payment timestamp |
| canceled_at | timestamp with time zone | YES | - | Cancellation timestamp |
| payment_failed | boolean | YES | false | Payment status flag |
| linkedin_connection_status | enum | YES | 'disconnected' | LinkedIn connection state |

## Auth Schema

The auth schema contains 16 tables managing user authentication and authorization:

1. **users** (204800 bytes, 9 rows)
   - Core user accounts
   - Authentication data
   - User metadata

2. **audit_log_entries** (450560 bytes, 1157 rows)
   - Security audit trail
   - User action logging

3. **refresh_tokens** (212992 bytes, 66 rows)
   - JWT token management
   - Session refresh handling

4. **sessions** (122880 bytes, 27 rows)
   - Active user sessions
   - Session metadata

5. **identities** (81920 bytes, 9 rows)
   - OAuth identities
   - External provider links

Plus additional tables for MFA, SSO, and SAML functionality.

## Storage Schema

The storage schema manages file storage with 5 tables:

1. **objects** (40960 bytes)
   - File metadata
   - Access controls

2. **buckets** (24576 bytes)
   - Storage containers
   - Bucket configuration

3. **migrations** (40960 bytes)
   - Schema version control
   - Migration history

4. **s3_multipart_uploads** (24576 bytes)
   - Large file upload management

5. **s3_multipart_uploads_parts** (16384 bytes)
   - Multipart upload chunks

## Row Level Security (RLS) Policies

### profiles Table Policies

1. **View Own Profile**
   ```sql
   POLICY "Users can view their own profile."
   ON public.profiles
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id)
   ```

2. **Update Own Profile**
   ```sql
   POLICY "Users can update their own profile."
   ON public.profiles
   FOR UPDATE
   TO authenticated
   USING (auth.uid() = user_id)
   WITH CHECK (auth.uid() = user_id)
   ```

3. **Insert Profile**
   ```sql
   POLICY "Enable insert for users based on user_id"
   ON public.profiles
   FOR INSERT
   TO public
   WITH CHECK (auth.uid() = user_id)
   ```

### invitation_jobs Table Policies

1. **View Own Jobs**
   ```sql
   POLICY "Users can view their own invitation jobs."
   ON public.invitation_jobs
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id)
   ```

2. **Create Own Jobs**
   ```sql
   POLICY "Users can create their own invitation jobs."
   ON public.invitation_jobs
   FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = user_id)
   ```

### saved_profiles Table Policies

1. **View Own Saved Profiles**
   ```sql
   POLICY "Users can view their own saved profiles."
   ON public.saved_profiles
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id)
   ```

2. **Create Saved Profiles**
   ```sql
   POLICY "Users can create their own saved profiles."
   ON public.saved_profiles
   FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = user_id)
   ```

### linkedin_connections Table Policies

1. **View Own Connections**
   ```sql
   POLICY "Users can view their own LinkedIn connections."
   ON public.linkedin_connections
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id)
   ```

2. **Create Connections**
   ```sql
   POLICY "Users can create their own LinkedIn connections."
   ON public.linkedin_connections
   FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = user_id)
   ```

## Security Notes

1. All tables in the public schema implement RLS policies
2. Authentication is required for most operations
3. Users can only access their own data
4. Public access is limited to specific operations (e.g., profile creation)
5. Stripe and LinkedIn integration data is protected by user-specific policies 