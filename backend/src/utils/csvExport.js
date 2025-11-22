const buildProductsCsv = (products) => {
  const headers = ['name', 'unit', 'category', 'brand', 'stock', 'status', 'image'];
  const lines = [headers.join(',')];

  products.forEach((p) => {
    const row = [
      p.name || '',
      p.unit || '',
      p.category || '',
      p.brand || '',
      p.stock != null ? p.stock : '',
      p.status || '',
      p.image || ''
    ].map((value) => {
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    });
    lines.push(row.join(','));
  });

  return lines.join('\n');
};

module.exports = { buildProductsCsv };
