const fs = require('fs');
const csvParser = require('csv-parser');
const ProductModel = require('../models/productModel');

const importProductsFromCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        let added = 0;
        let skipped = 0;
        const duplicates = [];

        const processNext = (index) => {
          if (index >= results.length) {
            return resolve({ added, skipped, duplicates });
          }

          const row = results[index];

          const name = row.name && row.name.trim();
          const unit = row.unit && row.unit.trim();
          const category = row.category && row.category.trim();
          const brand = row.brand && row.brand.trim();
          const stock = row.stock != null ? parseInt(row.stock, 10) : 0;
          const status = row.status && row.status.trim();
          const image = row.image ? row.image.trim() : '';

          if (!name) {
            skipped++;
            return processNext(index + 1);
          }

          ProductModel.getByNameCaseInsensitive(name, (err, existing) => {
            if (err) {
              console.error('Error checking duplicate:', err);
              skipped++;
              return processNext(index + 1);
            }

            if (existing) {
              duplicates.push({ name, existingId: existing.id });
              skipped++;
              return processNext(index + 1);
            }

            const newProduct = {
              name,
              unit: unit || 'pcs',
              category: category || 'Uncategorized',
              brand: brand || 'Unknown',
              stock: isNaN(stock) || stock < 0 ? 0 : stock,
              status: status || (stock > 0 ? 'In Stock' : 'Out of Stock'),
              image
            };

            ProductModel.create(newProduct, (err2) => {
              if (err2) {
                console.error('Error inserting product:', err2);
                skipped++;
              } else {
                added++;
              }
              processNext(index + 1);
            });
          });
        };

        processNext(0);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

module.exports = { importProductsFromCsv };
