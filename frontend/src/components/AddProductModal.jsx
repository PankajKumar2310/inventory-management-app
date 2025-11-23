import { useState } from "react";
import { api } from "../api/productApi";
import { toast } from "react-toastify";

export default function AddProductModal({ close, fetchProducts }) {
  const categories = [
    "Electronics",
    "Mobile",
    "Computers & Laptops",
    "Accessories",
    "Home Appliances",
    "Groceries",
    "Clothing",
    "Furniture",
    "Gaming"
  ];

  const [form, setForm] = useState({
    name: "",
    unit: "pcs",
    category: "",
    brand: "",
    stock: 0,
    status: "In Stock",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.category || !form.brand) {
      return toast.error("Please fill required fields");
    }

    try {
      await api.createProduct({
        ...form,
        stock: Number(form.stock),
        status: Number(form.stock) > 0 ? "In Stock" : "Out of Stock"
      });

      toast.success("Product added");

      if (fetchProducts) await fetchProducts();

      close();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Product</h2>

        <div className="form-group">
          <label>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Unit *</label>
          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="litre">litre</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand *</label>
          <input name="brand" value={form.brand} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Stock *</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Image URL (optional)</label>
          <input name="image" value={form.image} onChange={handleChange} />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="save-btn" onClick={submit}>Save</button>
        </div>
      </div>
    </div>
  );
}
