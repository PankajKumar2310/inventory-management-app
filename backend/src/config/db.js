const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


const uploadsDir = path.join(__dirname, '..', '..', 'uploads');  //check directory
const dbPath = path.join(uploadsDir, 'inventory.db');


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database:Connected ');

    db.serialize(() => {
     //product table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (                   
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          unit TEXT NOT NULL,
          category TEXT NOT NULL,
          brand TEXT NOT NULL,
          stock INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL,
          image TEXT
        )
      `);

      // inventory table logs
      db.run(`
        CREATE TABLE IF NOT EXISTS inventory_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER NOT NULL,
          old_stock INTEGER NOT NULL,
          new_stock INTEGER NOT NULL,
          changed_by TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          FOREIGN KEY(product_id) REFERENCES products(id)
        )
      `);
    });
  }
});

module.exports = db;
