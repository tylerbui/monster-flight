# Monster Flight

## Images 
### Login View
<img width="324" height="449" alt="Screenshot 2026-02-17 at 5 38 36 PM" src="https://github.com/user-attachments/assets/4a76300a-61bb-4df1-96ea-1b3e200afad6" />
### Flight Form 
<img width="575" height="486" alt="Screenshot 2026-02-17 at 5 39 16 PM" src="https://github.com/user-attachments/assets/826c3357-c33d-469d-85f5-3f57f1d90926" />
### Success Page 
<img width="372" height="541" alt="Screenshot 2026-02-17 at 5 39 28 PM" src="https://github.com/user-attachments/assets/8a87e748-f0ae-47f5-8ba6-4b5e1d28e341" />


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
6. Confirmation page shows details of the recent submitted form and also 2 buttons (Submit another form/Sign Out)

## Environment Configuration

The environment files (`environment.ts`, `environment.prod.ts`) are committed directly to this repository. This is intentional for the challenge deliverable so reviewers can clone and run the app.

**In a production application**, sensitive configuration (API keys, tokens, etc.) would be managed via environment variables using a `.env` file with a dotenv loader (e.g., `dotenv` + a custom webpack/vite plugin) to keep secrets out of source control. The `.env` file would be gitignored and each environment (dev, staging, prod) would have its own configuration injected at build time or runtime.

For this project, that approach was not used because:
- Firebase client-side API keys are [designed to be public](https://firebase.google.com/docs/projects/api-keys) — they're scoped by Firebase Security Rules, not secrecy
- The API token is specific to this coding challenge
- Zero-friction setup provides the best reviewer experience


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
