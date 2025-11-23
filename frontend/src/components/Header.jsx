import ImportExportButtons from "./ImportExportButtons";
import AddProductModal from "./AddProductModal";
import { useState } from "react";
import 'remixicon/fonts/remixicon.css'

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

<option value="Electronics">Electronics</option>
<option value="Mobile">Mobile</option>
<option value="Computers & Laptops">Computers & Laptops</option>
<option value="Accessories">Accessories</option>
<option value="Home Appliances">Home Appliances</option>
<option value="Groceries">Groceries</option>
<option value="Clothing">Clothing</option>
<option value="Furniture">Furniture</option>
<option value="Gaming">Gaming</option>

      </select>

      <button 
        className="add-product-btn"
        onClick={() => setOpen(true)}
      >
        <i class="ri-add-circle-fill"></i> Add Product
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
