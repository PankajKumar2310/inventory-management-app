const errorHandler = (err, req, res, next) => {
  console.error('Error handler:', err);

  if (err.message === 'Only CSV files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
