# EMS Pro

EMS Pro is an education management platform that brings learning, institute discovery, and study-abroad counselling into one place. Students can explore courses, connect with coaching institutes, and request guidance from counsellors. Mentors and institute teams can manage their offerings and follow up on student interest.

## What’s included

- **Accounts and profiles** — sign in, create an account, and complete a role-based profile.
- **Courses and lessons** — browse courses, view course details, enroll, and access lesson content.
- **Institute discovery** — explore institutes, view their details, and submit an application.
- **Lead tracking** — review institute enquiries and update their status.
- **Study-abroad consultations** — browse counsellors and schedule a consultation.
- **Role-aware workspace** — access the dashboard and tools available to your account.

Authentication is provided by Clerk. Application data is stored in PostgreSQL and accessed through the Express API.

## Run locally

### Requirements

- Node.js 20 or later
- PostgreSQL
- A Clerk application configured for the project

### Setup

1. Install dependencies:

   ```sh
   npm ci
   ```

2. Configure the environment variables in your local environment or Replit Secrets:

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | PostgreSQL connection string |
   | `VITE_CLERK_PUBLISHABLE_KEY` | Clerk key used by the browser app |
   | `CLERK_PUBLISHABLE_KEY` | Clerk key used by the server |
   | `CLERK_SECRET_KEY` | Clerk server-side key |
   | `SESSION_SECRET` | Secret used to protect session data |

3. Start the development server:

   ```sh
   npm run dev
   ```

   The app runs on port `5000`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run the TypeScript checks |
| `npm run build` | Build the client and server for production |
| `npm start` | Start the production server after building |
| `npm run db:push` | Apply the Drizzle schema to the configured database |

Review database schema changes before running `npm run db:push` against a database with data.

## Project structure

```text
client/       React application and pages
server/       Express API and database access
shared/       Shared API definitions and database schema
script/       Build and post-merge setup scripts
```

## Deployment

The project includes Replit deployment configuration. Build with `npm run build`, then start the production server with `npm start` or the configured deployment command.

## License

This project is licensed under the MIT License.