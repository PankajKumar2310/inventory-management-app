import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductRow({ product, updateProduct }) {
  const { setSelectedProduct } = useContext(ProductContext);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...product });

  const save = () => { updateProduct(product.id, form); setEdit(false); };

  return (
    <tr onClick={() => setSelectedProduct(product)}>
      <td><img src={product.image} width="40"/></td>
      <td>{edit ? <input defaultValue={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/> : product.name}</td>
      <td>{edit ? <input defaultValue={form.unit} onChange={(e)=>setForm({...form,unit:e.target.value})}/> : product.unit}</td>
      <td>{edit ? <input defaultValue={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/> : product.category}</td>
      <td>{edit ? <input defaultValue={form.brand} onChange={(e)=>setForm({...form,brand:e.target.value})}/> : product.brand}</td>
      <td>{edit ? <input defaultValue={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})}/> : product.stock}</td>
      <td className={product.stock > 0 ? "green" : "red"}>{product.stock > 0 ? "In Stock" : "Out Of Stock"}</td>
     <td>
  {edit ? (
    <>
      <button className="save-btn" onClick={save}>💾 Save</button>
      <button className="cancel-btn" onClick={() => { setEdit(false); setForm(product); }}>
        ❌ Cancel
      </button>
    </>
  ) : (
    <button className="edit-btn" onClick={() => setEdit(true)}>✏ Edit</button>
  )}
</td>

    </tr>
  );
}
