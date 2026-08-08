# Architecture Overview

This document explains the main architecture of the Grocery Calculator project and how the frontend, backend, and data storage interact.

## High-level System Diagram

```text
+-------------------+          +----------------------+          +-----------------------+
|                   |  HTTP    |                      |  MongoDB  |                       |
|  Ionic / Angular  | <------> |  Express API Server  | <------> |  MongoDB Database     |
|   Frontend App    |          |  (server/server.js)  |          |  (grocery-items)      |
|                   |          |                      |          |                       |
+-------------------+          +----------------------+          +-----------------------+
```

## Frontend

`src/` contains the Ionic/Angular client app.

### Core concepts

- **Standalone components**: Uses Angular standalone component style with `@ionic/angular/standalone` imports.
- **Pages**:
  - `src/app/pages/cart/cart.page.ts` — main cart UI, item list, editing, deleting, and totals.
  - `src/app/pages/item-form/item-form.page.ts` — modal form for adding/updating grocery items.
- **Routing**:
  - `src/app/app.routes.ts` defines the app routes.
  - Redirects the root path to `/cart`.
- **Configuration**:
  - `src/app/app.config.ts` provides router, Ionic, and HTTP client providers.
  - `src/environments/environment.ts` and `src/environments/environment.prod.ts` contain API endpoint config.
- **API integration**:
  - `src/app/services/grocery.service.ts` handles CRUD operations for grocery items.

### Frontend responsibilities

- Display grocery items
- Open item add/edit modal
- Calculate subtotal, food tax, non-food tax, and total
- Send requests to backend API for persistence

## Backend

`server/` contains the Express server and MongoDB model.

### Core files

- `server/server.js`
  - Loads `.env` configuration.
  - Connects to MongoDB using Mongoose.
  - Registers middleware: `helmet`, `cors`, `compression`, `express.json()`, and `morgan`.
  - Mounts the grocery items router at `/api/grocery-items`.
  - Serves static app files from `www/` in production.
- `server/routes/groceryItems.js`
  - Implements RESTful routes for grocery item CRUD and cart clearing.
- `server/models/groceryItem.js`
  - Defines the grocery item schema and validation rules.

### Backend responsibilities

- Persist grocery items in the database
- Validate item data
- Serve API responses for frontend interaction
- Serve built app assets in production mode

## Data flow

1. User opens the app in the browser or mobile environment.
2. Frontend loads and calls `GroceryService.getItems()`.
3. `GroceryService` sends `GET /api/grocery-items`.
4. Express handles the request and returns items from MongoDB.
5. Frontend renders the item list and calculates totals.
6. When the user adds/edits/deletes items:
   - Frontend sends `POST`, `PUT`, or `DELETE` to the API.
   - Backend validates and saves changes in MongoDB.
   - Frontend refreshes the list from the API.

## Technology stack

- Frontend:
  - Angular 20
  - Ionic Angular 8
  - Capacitor 7
  - SCSS styling
- Backend:
  - Node.js
  - Express 5
  - Mongoose
  - dotenv
- Dev tooling:
  - Angular CLI
  - ESLint
  - Karma + Jasmine

## Deployment notes

- Production builds go into `www/`.
- `server/server.js` serves static assets from the built `www/` directory.
- Production API URL is configured in `src/environments/environment.prod.ts`.
- Use `npm run build` to generate the production app.

## Future extension points

- Add authentication and per-user carts.
- Add item categories or more detailed pricing rules.
- Add offline support / local storage fallback.
- Add automated tests for frontend pages and backend routes.
- Add logging and monitoring for production deployment.
