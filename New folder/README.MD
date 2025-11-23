# 📦 Inventory Management System

A production-ready **Full-Stack Inventory Management System** built using:

- **React (Vite)** for the frontend  
- **Node.js + Express** for backend APIs  
- **SQLite** as the database  

The system includes: product CRUD operations, authentication, search, filtering, sorting, pagination, CSV import/export, inline editing, inventory history logging, responsive UI, and error handling.

---

---

## ✨ Features

### 🔧 Core Features
- Add, edit, delete products
- Product table with sorting & pagination
- Inline editing with Save/Cancel
- Status indication (In Stock/Out of Stock)
- Modal-based add-product form
- Client + server validation

### 🔍 Advanced Features
- Search products (server-side)
- Category filtering
- CSV import/export support
- Sidebar history showing stock changes
- Authentication (login + protected routes)
- Toast notifications + loading states

### 📱 UI/UX
- Fully responsive and mobile-friendly
- Clean SCSS-based design system
- Custom reusable components

### 🎯 Bonus Features Implemented
| Feature | Status |
|---------|--------|
| Pagination | ✔ |
| Sorting | ✔ |
| Filtering | ✔ |
| Auth | ✔ |
| Responsive UI | ✔ |
| Error handling | ✔ |
| Unit/Integration Testing | ❌ Not completed |

---

## 🏗 Folder Structure

```
inventory-management-app/
│
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection + schema creation
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # DB operations
│   │   ├── routes/         # API routes
│   │   └── utils/          # CSV helpers, middleware
│   ├── uploads/            # Temp CSV uploads
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/            # Axios services
│   │   ├── components/     # Reusable UI
│   │   ├── context/        # React Context API
│   │   ├── hooks/          # Custom Hooks
│   │   ├── pages/          # Login + Dashboard
│   │   ├── styles/         # SCSS theme modules
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
│
├── vercel.json
└── README.md
```

---

## ⚙ Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone YOUR_REPO_URL
cd inventory-management-app
```

---

### 2️⃣ Backend Setup

```sh
cd backend
npm install
npm run dev
```

SQLite DB (`inventory.db`) will be created automatically.

---

### 3️⃣ Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

### Frontend `.env`

```
VITE_API_URL=https://inventory-backend-x3eb.onrender.com/api/products
```

(Optional if using vercel.json rewrite)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/search?name=` | Search |
| POST | `/api/products` | Create |
| PUT | `/api/products/:id` | Update |
| DELETE | `/api/products/:id` | Remove |
| POST | `/api/products/import` | Import CSV |
| GET | `/api/products/export` | Export inventory to CSV |
| GET | `/api/products/:id/history` | Audit logs |

---

## 🧪 CSV Example

```
name,unit,category,brand,stock,status,image
Laptop,pcs,Electronics,Dell,25,active,https://example.com/image.jpg
```

---

## 🧾 Inventory History Logging

The system stores:

- Old Stock  
- New Stock  
- Updated By  
- Timestamp  

Displayed on a right-hand drawer/side panel.

---

## 🛡 Authentication

Implemented using:

- Login screen
- JWT token storage
- Protected dashboard routes
- Middleware validation for protected APIs

---

## 📱 Responsive Breakpoints

| View | Supported |
|------|-----------|
| Mobile | ✔ |
| Tablet | ✔ |
| Desktop | ✔ |

---

## 🛡 License

MIT — free to use and modify.

---

## 🏁 Summary

This project demonstrates complete full-stack development including:

- REST API design  
- Architecture using MVC pattern  
- Frontend engineering with React + Context  
- Backend logic with SQLite persistence  
- Deployment (Render + Vercel)  
- Production-ready structure  

✔ All main + bonus requirements completed  
❌ Only testing remains pending  

