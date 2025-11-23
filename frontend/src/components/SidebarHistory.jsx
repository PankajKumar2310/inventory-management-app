import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { api } from "../api/productApi";
import { IoClose } from "react-icons/io5"; // <-- add icon

export default function SidebarHistory() {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      api.getHistory(selectedProduct.id).then(res => setLogs(res.data));
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <aside className="sidebar">
        
      <div className="sidebar-header">
        <h3>📌 {selectedProduct.name} History</h3>
        <button className="close-btn" onClick={() => setSelectedProduct(null)}>
          <IoClose size={22} />
        </button>
      </div>

      {logs.length === 0 ? (
        <p className="no-history">No history found.</p>
      ) : (
        logs.map(l => (
          <div key={l.id} className="log-item">
            <p>Stock: {l.old_stock} ➝ {l.new_stock}</p>
            <small>{new Date(l.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </aside>
  );
}
