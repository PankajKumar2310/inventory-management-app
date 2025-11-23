const crypto = require('crypto');
const UserModel = require('../models/userModel');

const hashPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

// POST /api/auth/register
const register = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  UserModel.getByUsername(username, (err, existing) => {
    if (err) return next(err);
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashed = hashPassword(password);

    UserModel.create(username, hashed, (err2, newUser) => {
      if (err2) return next(err2);
      res.status(201).json({ id: newUser.id, username: newUser.username });
    });
  });
};

// POST /api/auth/login
const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  UserModel.getByUsername(username, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const hashed = hashPassword(password);
    if (user.password !== hashed) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const tokenPayload = `${user.id}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    const token = Buffer.from(tokenPayload).toString('base64');

    res.json({
      token,
      user: { id: user.id, username: user.username }
    });
  });
};

module.exports = { register, login };
