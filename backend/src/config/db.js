const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(__dirname, '..', '..', 'inventory.db'); //file setup

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err.message);
  } else {
    console.log('Connected to SQLite database:', dbPath);
  }
});


db.serialize(() => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      unit TEXT,
      category TEXT,
      brand TEXT,
      stock INTEGER NOT NULL,
      status TEXT,
      image TEXT
    )
  `);

  // Inventory logs table 
  db.run(`
    CREATE TABLE IF NOT EXISTS inventory_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      old_stock INTEGER,
      new_stock INTEGER,
      changed_by TEXT,
      timestamp TEXT,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);
});

module.exports = db;
