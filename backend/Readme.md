# Inventory Backend

Express + SQLite backend for the inventory management app.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: SQLite (file-based)
- **Others**: multer (file upload), csv-parser (CSV import), express-validator, cors, dotenv

## Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment variables

Create a `.env` file in `backend` (if you don't have one) and configure:

```env
PORT=5000           # optional, defaults to 5000
```

### 3. Run the server

```bash
npm run dev   # start with nodemon
# or
npm start     # start with node
```

The server will run on:

```text
http://localhost:5000
```

## Database

The SQLite database file is created automatically in:

- `uploads/inventory.db`

On startup, the following tables are ensured:

- `products`
- `inventory_logs`
- `users`

## REST API

Base URL (local): `http://localhost:5000/api`

### Products

All product routes are under `/api/products`:

- `GET /api/products` – list products (with optional filters)
- `GET /api/products/search?name=...` – search products by name
- `POST /api/products` – create product
- `PUT /api/products/:id` – update product
- `DELETE /api/products/:id` – delete product
- `GET /api/products/:id/history` – inventory history for a product
- `POST /api/products/import` – import products from CSV (multipart upload, field name: `csvFile`)
- `GET /api/products/export` – export all products as CSV

### Auth

All auth routes are under `/api/auth`:

- `POST /api/auth/register`
  - Body: `{ "username": string, "password": string }`
  - Creates a new user (username must be unique).

- `POST /api/auth/login`
  - Body: `{ "username": string, "password": string }`
  - Returns:
    - `token`: simple opaque token string (base64)
    - `user`: `{ id, username }`

> Note: For this assignment, the token is not used to protect backend routes; it is mainly for frontend route protection.

## File Uploads & CSV Import

- Uploads are stored in `src/uploads`.
- CSV import expects a `.csv` file with appropriate product columns.

## Screenshots

Existing API testing screenshots are kept in this repo:

![API testing 1](<Screenshot 2025-11-23 003402.png>)
![API testing 2](<Screenshot 2025-11-23 003439.png>) 
![API testing 3](<Screenshot 2025-11-23 002909.png>) 
![API testing 4](<Screenshot 2025-11-23 003236.png>) 
![API testing 5](<Screenshot 2025-11-23 003248.png>)