require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./src/config/db'); 

const app = express();


app.use(cors());   //json parse
app.use(express.json());

// static uploads - for image
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
