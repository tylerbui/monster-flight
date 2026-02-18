# Monster Flight

A flight information submission app built as a coding challenge deliverable. Users authenticate via Firebase, fill out a flight details form, and submit the data to a remote API endpoint.

## Tech Stack

- **Framework:** Angular 21 (Standalone Components)
- **Auth:** Firebase Authentication (Email/Password + Google OAuth)
- **Styling:** Tailwind CSS + SCSS
- **Build:** Vite via Angular CLI
- **Forms:** Reactive Forms
- **Testing:** Vitest

## Prerequisites

- **Node.js 22+** — Angular 21 requires Node 22 or later. Check with `node -v`.
- **npm 11+** — Comes bundled with Node 22.

## Quick Start

```bash
git clone <repo-url>
cd monster-flight
npm install
npm start
```

Open `http://localhost:4200` — you'll land on the login page.

## Authentication

You can authenticate in two ways:

1. **Create an account** — click "Create one" on the login page and register with any email/password
2. **Google Sign-In** — click "Continue with Google"

Once authenticated, you'll be redirected to the flight information form.

## How It Works

1. User logs in or registers
2. Protected route guard redirects authenticated users to the flight form
3. User fills out flight details (airline, date, time, flight number, guests, optional comments)
4. On submit, a POST request is sent to the challenge API with the required `token` and `candidate` headers
5. User sees success/error feedback and is redirected to a confirmation page on success

## Environment Configuration

The environment files (`environment.ts`, `environment.prod.ts`) are committed directly to this repository. This is intentional for the challenge deliverable so reviewers can clone and run the app with zero setup.

**In a production application**, sensitive configuration (API keys, tokens, etc.) would be managed via environment variables using a `.env` file with a dotenv loader (e.g., `dotenv` + a custom webpack/vite plugin) to keep secrets out of source control. The `.env` file would be gitignored and each environment (dev, staging, prod) would have its own configuration injected at build time or runtime.

For this project, that approach was not used because:
- Firebase client-side API keys are [designed to be public](https://firebase.google.com/docs/projects/api-keys) — they're scoped by Firebase Security Rules, not secrecy
- The API token is specific to this coding challenge
- Zero-friction setup provides the best reviewer experience

A reference template is available at `src/environments/environment.example.ts` for developers who want to set up their own Firebase project.

## Project Structure

```
src/app/
  core/
    guards/        # Route guards (auth)
    services/      # Auth service, Flight API service
  features/
    auth/login/    # Login/Register component
    flight/
      flight-form/ # Flight details form
      success/     # Submission confirmation page
  shared/models/   # TypeScript interfaces & enums
```
