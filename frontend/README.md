# Inventory Frontend

React + Vite frontend for the inventory management app.

## Tech Stack

- **Framework**: React (Vite)
- **Routing**: react-router-dom
- **HTTP**: axios
- **UI Helpers**: react-toastify, remixicon, react-icons
- **Styles**: SCSS modules (`global.scss`, `table.scss`, `modal.scss`, `sidebar.scss`)

## Getting Started

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run in development

```bash
npm run dev
```

By default Vite serves on `http://localhost:5173`.

Make sure the backend is running (see `../backend/README.md`).

## API Configuration

Product API base URL is configured in `src/api/productApi.js`:

```js
const API_BASE = "https://inventory-backend-x3eb.onrender.com/api/products";
```

Auth API base URL is configured in `src/api/authApi.js`:

```js
const AUTH_BASE = "https://inventory-backend-x3eb.onrender.com/api/auth";
```

For local development you can switch these to `http://localhost:5000/...` if your backend runs locally.

## Available Scripts

In the `frontend` folder:

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run preview` – preview the production build

## App Structure (High Level)

- `src/main.jsx` – Vite entry; renders `<App />`
- `src/App.jsx` – sets up `BrowserRouter`, `ProductProvider`, toasts, and routes
- `src/context/ProductContext.js` – global product-related context
- `src/hooks/useProducts.js` – custom hook for fetching and mutating products
- `src/pages/ProductDashboard.jsx` – main inventory dashboard (products table, pagination, sidebar)
- `src/pages/LoginPage.jsx` – login/register page
- `src/components/*` – UI components (header, tables, modals, sidebar, etc.)

## Authentication Flow

- Entry route:
  - `/login` – login/register page
  - `/` – protected dashboard

- On **register** (in LoginPage):
  - Sends `POST /api/auth/register` with `{ username, password }`
  - Shows success toast
  - Switches back to **Login** mode; user then logs in manually

- On **login**:
  - Sends `POST /api/auth/login`
  - Stores `authToken` and `authUser` in `localStorage`
  - Updates internal `isAuthenticated` state in `App`
  - Navigates to the dashboard (`/`)

- Routes in `App.jsx`:
  - `/login` → `LoginPage`
  - `/` → `ProductDashboard` wrapped in a `ProtectedRoute`
  - `*` → redirects to `/` or `/login` depending on authentication state

## Inventory Features

- Product listing with client-side pagination
- Search and category filter
- Add product modal (with category select and brand/image fields)
- Edit in table rows
- Delete with confirmation modal
- Inventory history sidebar
- CSV import/export (using the backend APIs)

## Optimization Notes

- `ProductDashboard` is lazy-loaded via `React.lazy` + `Suspense` for code splitting.
- Product images use `loading="lazy"` and `decoding="async"` to improve performance.
