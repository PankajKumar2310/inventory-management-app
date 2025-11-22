const db = require('../config/db');

const InventoryLogModel = {
  createLog: ({ productId, oldStock, newStock, changedBy }, callback) => {
    const timestamp = new Date().toISOString();
    const query = `
      INSERT INTO inventory_logs (product_id, old_stock, new_stock, changed_by, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [productId, oldStock, newStock, changedBy, timestamp], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, productId, oldStock, newStock, changedBy, timestamp });
    });
  },

  getHistoryByProductId: (productId, callback) => {
    const query = `
      SELECT * FROM inventory_logs
      WHERE product_id = ?
      ORDER BY timestamp DESC
    `;
    db.all(query, [productId], callback);
  }
};

module.exports = InventoryLogModel;
