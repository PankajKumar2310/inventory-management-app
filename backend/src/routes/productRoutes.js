const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');

const {
  productValidationRules,
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductHistory,
  importProducts,
  exportProducts
} = require('../controllers/productController');

// GET /api/products
router.get('/', getProducts);

// GET /api/products/search
router.get('/search', searchProducts);

// POST /api/products
router.post('/', productValidationRules, validateRequest, createProduct);

// PUT /api/products/:id
router.put('/:id', productValidationRules, validateRequest, updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// GET /api/products/:id/history
router.get('/:id/history', getProductHistory);

// POST /api/products/import
router.post('/import', upload.single('csvFile'), importProducts);

// GET /api/products/export
router.get('/export', exportProducts);

module.exports = router;
