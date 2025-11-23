import ImportExportButtons from "./ImportExportButtons";
import AddProductModal from "./AddProductModal";
import { useState } from "react";

export default function Header({ setQuery, setCategoryFilter, fetchProducts }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <input 
        className="search-input"
        placeholder="Search product..." 
        onChange={(e) => setQuery(e.target.value)} 
      />

      <select 
        className="category-select"
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Mobile">Mobile</option>
        <option value="Electronics">Electronics</option>
      </select>

      <button 
        className="add-product-btn"
        onClick={() => setOpen(true)}
      >
        ➕ Add Product
      </button>

      <ImportExportButtons fetchProducts={fetchProducts} />

      {open && (
        <AddProductModal 
          close={() => setOpen(false)} 
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}
