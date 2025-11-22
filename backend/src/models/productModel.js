const db = require('../config/db');

const ProductModel = {
  getAll: ({ page, limit, sortBy, sortOrder, category }, callback) => {
    let params = [];
    let whereClause = '';
    if (category) {
      whereClause = 'WHERE category = ?';
      params.push(category);
    }

    const validSortFields = ['name', 'category', 'brand', 'stock', 'status', 'id'];
    if (!validSortFields.includes(sortBy)) sortBy = 'id';

    sortOrder = sortOrder && sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) as total FROM products ${whereClause}`;
    const dataQuery = `
      SELECT * FROM products
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    db.get(countQuery, params, (err, row) => {
      if (err) return callback(err);

      const total = row ? row.total : 0;

      db.all(dataQuery, [...params, limit, offset], (err2, rows) => {
        if (err2) return callback(err2);
        callback(null, { total, data: rows });
      });
    });
  },

  searchByName: (name, callback) => {
    const query = `
      SELECT * FROM products
      WHERE LOWER(name) LIKE '%' || LOWER(?) || '%'
      ORDER BY name ASC
    `;
    db.all(query, [name], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], callback);
  },

  getByNameCaseInsensitive: (name, callback) => {
    db.get('SELECT * FROM products WHERE LOWER(name) = LOWER(?)', [name], callback);
  },

  create: (product, callback) => {
    const { name, unit, category, brand, stock, status, image } = product;
    const query = `
      INSERT INTO products (name, unit, category, brand, stock, status, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [name, unit, category, brand, stock, status, image], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM products WHERE id = ?', [this.lastID], callback);
    });
  },

  update: (id, product, callback) => {
    const { name, unit, category, brand, stock, status, image } = product;
    const query = `
      UPDATE products
      SET name = ?, unit = ?, category = ?, brand = ?, stock = ?, status = ?, image = ?
      WHERE id = ?
    `;
    db.run(query, [name, unit, category, brand, stock, status, image, id], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM products WHERE id = ?', [id], callback);
    });
  },

  delete: (id, callback) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    });
  },

  getAllRaw: (callback) => {
    db.all('SELECT * FROM products ORDER BY id ASC', [], callback);
  }
};

module.exports = ProductModel;
