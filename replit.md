# EMS Pro

Authentication uses Replit-managed Clerk for web sign-in and sessions. The approved Clerk migration provisioned the app and copied existing users into Clerk. The provisioning service configures the session token's custom `userId` claim: it resolves to Clerk `externalId` for migrated users and to the Clerk native ID for new users. The local `users` table remains the bridge for application profiles and relationships. Use `sessionClaims.userId` for local user lookups and Clerk's native `auth.userId` only for Clerk API calls. The `sessions` table is retained for existing data and must not be dropped.

Migration verification: one migrated Clerk account's `externalId` matched an existing local user row. A signed-in browser check confirmed that account's `sessionClaims.userId` matched the original local ID (and was distinct from Clerk's native ID). That account did not have a local profile before migration, so `/api/profiles/me` correctly returned `null` and onboarding remained available. A new-user browser check confirmed profile creation, dashboard and courses access, cookie-only API access, and logout.

Web API requests use the shared `apiRequest` path and browser cookies; do not attach bearer tokens.
