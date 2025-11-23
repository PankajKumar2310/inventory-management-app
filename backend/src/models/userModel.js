const db = require('../config/db');

const UserModel = {
  getByUsername: (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], callback);
  },

  create: (username, password, callback) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM users WHERE id = ?', [this.lastID], callback);
    });
  }
};

module.exports = UserModel;
