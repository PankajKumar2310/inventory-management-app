const { body } = require('express-validator');
const ProductModel = require('../models/productModel');
const InventoryLogModel = require('../models/inventoryLogModel');
const { buildProductsCsv } = require('../utils/csvExport');
const { importProductsFromCsv } = require('../utils/csvImport');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const DEFAULT_CHANGED_BY = process.env.DEFAULT_CHANGED_BY || 'admin';


const productValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('status').notEmpty().withMessage('Status is required'),
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a number >= 0')
];

// GET /api/products  (Bonus -> pagination/sorting/category filter)
const getProducts = (req, res, next) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '50', 10);
  const sortBy = req.query.sortBy || 'id';
  const sortOrder = req.query.sortOrder || 'ASC';
  const category = req.query.category || null;

  ProductModel.getAll({ page, limit, sortBy, sortOrder, category }, (err, result) => {
    if (err) return next(err);
    res.json({
      total: result.total,
      page,
      limit,
      data: result.data
    });
  });
};

//get product
const searchProducts = (req, res, next) => {
  const name = req.query.name || '';
  ProductModel.searchByName(name, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
};

//  Add New Product
const createProduct = (req, res, next) => {
  const { name, unit, category, brand, stock, status, image } = req.body;
  const stockValue = parseInt(stock, 10);

  ProductModel.getByNameCaseInsensitive(name, (err, existing) => {
    if (err) return next(err);
    if (existing) {
      return res.status(400).json({ message: 'Product name must be unique' });
    }

    const productData = {
      name,
      unit,
      category,
      brand,
      stock: stockValue,
      status,
      image: image || ''
    };

    ProductModel.create(productData, (err2, newProduct) => {
      if (err2) return next(err2);
      res.status(201).json(newProduct);
    });
  });
};

// Update product
const updateProduct = (req, res, next) => {
  const id = req.params.id;
  const { name, unit, category, brand, stock, status, image } = req.body;
  const stockValue = parseInt(stock, 10);

  // Check condition if product is there
  ProductModel.getById(id, (err, existingProduct) => {
    if (err) return next(err);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check unique name
    ProductModel.getByNameCaseInsensitive(name, (err2, productByName) => {
      if (err2) return next(err2);
      if (productByName && productByName.id !== parseInt(id, 10)) {
        return res.status(400).json({ message: 'Product name must be unique' });
      }

      const updatedProductData = {
        name,
        unit,
        category,
        brand,
        stock: stockValue,
        status,
        image: image || existingProduct.image
      };

      const oldStock = existingProduct.stock;
      const newStock = stockValue;

      ProductModel.update(id, updatedProductData, (err3, updatedProduct) => {
        if (err3) return next(err3);

        if (oldStock !== newStock) {
          InventoryLogModel.createLog(
            {
              productId: parseInt(id, 10),
              oldStock,
              newStock,
              changedBy: DEFAULT_CHANGED_BY
            },
            (err4) => {
              if (err4) {
                console.error('Failed to create inventory log:', err4);
              }
              res.json(updatedProduct);
            }
          );
        } else {
          res.json(updatedProduct);
        }
      });
    });
  });
};

// Delete the product
const deleteProduct = (req, res, next) => {
  const id = req.params.id;
  ProductModel.delete(id, (err, result) => {
    if (err) return next(err);
    if (result.deleted === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
};

// get the inventory history
const getProductHistory = (req, res, next) => {
  const id = req.params.id;
  InventoryLogModel.getHistoryByProductId(id, (err, logs) => {
    if (err) return next(err);
    res.json(logs);
  });
};

// import the csv file data 
const importProducts = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required' });
  }

  const filePath = req.file.path;

  try {
    const result = await importProductsFromCsv(filePath);
    fs.unlink(filePath, () => {});
    res.json(result);
  } catch (err) {
    fs.unlink(filePath, () => {});
    next(err);
  }
};

// get the csv file means export feature
const exportProducts = (req, res, next) => {
  ProductModel.getAllRaw((err, products) => {
    if (err) return next(err);

    const csvData = buildProductsCsv(products);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.status(200).send(csvData);
  });
};

module.exports = {
  productValidationRules,
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductHistory,
  importProducts,
  exportProducts
};
