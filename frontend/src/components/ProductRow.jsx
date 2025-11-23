import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductRow({ product, updateProduct, onDelete }) {
  const { setSelectedProduct } = useContext(ProductContext);
  const [edit, setEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({ ...product });

  const save = (e) => {
    e.stopPropagation();
    updateProduct(product.id, form);
    setEdit(false);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    if (onDelete) {
      await onDelete(product.id);
    }
    setShowDeleteModal(false);
  };

  const startEdit = (e) => {
    e.stopPropagation();
    setEdit(true);
  };

  const cancelEdit = (e) => {
    e.stopPropagation();
    setEdit(false);
    setForm(product);
  };

  return (
    <>
    <tr onClick={() => !edit && setSelectedProduct(product)}>
      <td><img src={product.image} width="40" alt="" loading="lazy" decoding="async"/></td>

      <td>{edit ? <input defaultValue={form.name} onClick={(e)=>e.stopPropagation()} onChange={(e)=>setForm({...form,name:e.target.value})}/> : product.name}</td>

      <td>{edit ? <input defaultValue={form.unit} onClick={(e)=>e.stopPropagation()} onChange={(e)=>setForm({...form,unit:e.target.value})}/> : product.unit}</td>

      <td>{edit ? <input defaultValue={form.category} onClick={(e)=>e.stopPropagation()} onChange={(e)=>setForm({...form,category:e.target.value})}/> : product.category}</td>

      <td>{edit ? <input defaultValue={form.brand} onClick={(e)=>e.stopPropagation()} onChange={(e)=>setForm({...form,brand:e.target.value})}/> : product.brand}</td>

      <td>{edit ? <input defaultValue={form.stock} onClick={(e)=>e.stopPropagation()} onChange={(e)=>setForm({...form,stock:e.target.value})}/> : product.stock}</td>

      <td className={product.stock > 0 ? "green" : "red"}>{product.stock > 0 ? "In Stock" : "Out Of Stock"}</td>

      <td>
        {edit ? (
          <div className="action-div" onClick={(e) => e.stopPropagation()}>
            <button className="save-btn" onClick={save}>
              <i className="ri-save-fill"></i> Save
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              <i className="ri-close-circle-fill"></i> Cancel
            </button>
          </div>
        ) : (
          <div className="action-buttons">
            <button className="edit-btn" onClick={startEdit}>
              <i className="ri-pencil-fill"></i> Edit
            </button>
            <button 
              className="delete-btn" 
              onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); }}
              title="Delete Product"
            >
              <i className="ri-delete-bin-fill"></i> Delete
            </button>
          </div>
        )}
      </td>
    </tr>

    {showDeleteModal && (
      <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <h2>Delete Product</h2>
          <p>Are you sure you want to delete {product.name}?</p>

          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={confirmDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
