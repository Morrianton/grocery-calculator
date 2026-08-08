# Grocery Calculator

A grocery shopping calculator and cart manager built with Ionic + Angular on the frontend and Express + MongoDB on the backend.

## Project Overview

This project is designed to help track grocery items, calculate tax, and manage a persistent cart. It combines a mobile-friendly Ionic UI with a Node/Express API and MongoDB persistence.

## Architecture

- `src/` contains the Ionic/Angular frontend.
- `server/` contains the Node.js backend.
- `www/` is the build output directory for the Ionic application.
- `server/server.js` serves both the API and the built frontend in production.

### Frontend

- Built with Angular 22.1.1 and Ionic Angular 8.
- Uses standalone Angular components and the Ionic component library.
- Routes are defined in `src/app/app.routes.ts`.
- Main pages:
  - `src/app/pages/cart/cart.page.ts` — cart listing, item editing, delete, clear cart, and subtotal/tax/total calculations.
  - `src/app/pages/item-form/item-form.page.ts` — modal form for adding or editing grocery items.
- HTTP integration is done via `src/app/services/grocery.service.ts`.
- Environment config:
  - `src/environments/environment.ts` for local development.
  - `src/environments/environment.prod.ts` for production.

### Backend

- Built with Express and Mongoose.
- Uses `dotenv` to load environment variables.
- Security and production middleware:
  - `helmet` for HTTP headers
  - `cors` for cross-origin requests
  - `compression` for response compression
  - `morgan` for request logging
- Mongoose model:
  - `server/models/groceryItem.js`
  - Fields: `name`, `price`, `quantity`, `unit`, `isFood`, and `createdAt`.
- API routes:
  - `GET /api/health` — health check endpoint.
  - `GET /api/grocery-items` — list all items.
  - `POST /api/grocery-items` — create a new item.
  - `GET /api/grocery-items/:id` — fetch one item.
  - `PUT /api/grocery-items/:id` — update an item.
  - `DELETE /api/grocery-items/:id` — delete an item.
  - `DELETE /api/grocery-items` — clear all items.

## Architecture Document

For a detailed architecture overview, see `docs/architecture.md`.

## Main Technologies

- Angular 22.1.1
- Ionic Angular 8.8.17
- Capacitor 8.5.0
- Node.js + Express 5.2.1
- MongoDB + Mongoose
- SCSS for styling
- ESLint and Angular ESLint for linting
- Karma + Jasmine for testing

## Getting Started

### Prerequisites

- Node.js `>= 24.15.0` (tested with `24.19.0`)
- npm
- MongoDB running locally or accessible remotely

### Current dependency status

- Angular: `22.1.1`
- Ionic Angular: `8.8.17`
- Capacitor: `8.5.0`
- Express: `5.2.1`
- Mongoose: `9.9.1`
- TypeScript: `6.0.3`

### Project Health (Current State)

- **Node**: `v24.19.0` (required `>= 24.15.0`)
- **npm**: `11.17.0`
- **Last npm audit (post-fix)**: 12 advisories — **9 moderate**, **3 high**, **0 critical**
- **Direct vulnerable packages**: `@angular-devkit/build-angular`, `@angular/cli`, `@capacitor/cli` (these are currently at the latest compatible stable versions for the Angular 22/Capacitor 8 stack; fixes would require semver-major upgrades)
- **Notes**: `npm audit fix` was run. Remaining advisories are in build/tooling dependencies and now require moving to a newer Angular major release or a newer Capacitor toolchain to resolve safely.
- **Build verified**: `npm run build-dev` completed successfully under Node `v24.19.0` and produced the `www/` output.
- **CI**: a GitHub Actions workflow has been added at `.github/workflows/ci.yml` to run lint, tests, and build on `main`.

### Install dependencies

```bash
npm install
```

### Local development

The repo includes a proxy config so the Angular dev server can call the Express API during development.

```bash
npm run dev
```

This runs:
- `npm run start` — starts the Express server on `http://localhost:3000`
- `ng serve --proxy-config proxy.conf.json` — Angular dev server on `http://localhost:4200`

### Running the production server locally

Build the app and run the server:

```bash
npm run build
npm start
```

Then open `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the project root with values such as:

```env
MONGODB_URI_LOCAL=mongodb://localhost:27017/grocery-calculator
MONGODB_URI_PROD=<your-production-mongo-uri>
PORT=3000
NODE_ENV=development
```

The server chooses `MONGODB_URI_PROD` when `NODE_ENV=production`, otherwise it uses `MONGODB_URI_LOCAL`.

## Scripts

- `npm run dev` — run both backend and frontend for development.
- `npm run start` — start the Express backend only.
- `npm run build` — build the Ionic app for production into `www/`.
- `npm run build-dev` — build Angular app in development mode.
- `npm run watch` — build Angular app with watch mode.
- `npm test` — run unit tests.
- `npm run lint` — run ESLint checks.
- `npm run deploy-prod` — build and deploy to GitHub Pages using `angular-cli-ghpages`.

## Notes & Suggestions
- CI is configured to run lint, tests, and a development build on every push or pull request to `main`.
- A Render deployment is triggered automatically after successful builds on `main` via the GitHub Actions workflow.
- Store your Render API key in GitHub repository secrets as `RENDER_API_KEY`.
- The Render service ID used by the workflow is `srv-d3neg26r433s73bgp1l0`.
- The Render API key name inside Render is only a friendly label and does not need to match the GitHub secret name.

- The frontend currently uses the built production API URL in `environment.prod.ts`.
- The `clearCart()` method in `GroceryService` maps to the backend route `DELETE /api/grocery-items`.
- Future improvements:
  - Add validation/error feedback in the UI.
  - Add user authentication if you want per-user carts.
  - Add tests for both frontend pages and backend routes.
  - Add CI/CD config and MongoDB seed scripts.

## Project Structure

- `src/app/` — main frontend app code
- `src/app/pages/` — UI pages for cart and item form
- `src/app/services/` — shared frontend service for API calls
- `server/` — Express API and Mongoose models
- `www/` — built production frontend output

---