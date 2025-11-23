import ProductRow from "./ProductRow";

export default function ProductTable({ products, updateProduct }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th><th>Name</th><th>Unit</th><th>Category</th><th>Brand</th><th>Stock</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(item => (
          <ProductRow key={item.id} product={item} updateProduct={updateProduct} />
        ))}
      </tbody>
    </table>
  );
}
