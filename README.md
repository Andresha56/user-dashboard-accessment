# User Management Dashboard

A responsive admin dashboard built with React, TypeScript, Vite, Tailwind CSS, React Hook Form, and Zod.

## Features

- User listing with search and pagination
- Add / edit user modal form
- Form validation with Zod and React Hook Form
- Reusable UI components and hooks
- Fast development experience with Vite

## Requirements

- Node.js 20+ recommended
- npm 10+ (or compatible package manager)

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd user-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the local development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production Build

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — compile TypeScript and build the production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint on the project

## Project Structure

- `src/` — application source code
- `src/components/` — reusable React components
- `src/pages/` — page views such as user list and user details
- `src/hooks/` — custom React hooks
- `src/dialog/` — modal dialog components
- `src/context/` — context providers (e.g. toast notifications)
- `src/queries/` — data-fetching or query utilities

## Notes

This project uses React 19, Vite, TypeScript, and Tailwind CSS via `@tailwindcss/vite`.
