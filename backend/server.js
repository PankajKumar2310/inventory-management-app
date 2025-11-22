const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Connect to DB 
require('./src/config/db');

const productRoutes = require('./src/routes/productRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static  uploads if needed
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Inventory Management API is running' });
});

app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
