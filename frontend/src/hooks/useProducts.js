import { useEffect, useState } from "react";
import { api } from "../api/productApi";
import { toast } from "react-toastify";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({
        limit: 100,
        category: categoryFilter
      });
      setProducts(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!query.trim()) return fetchProducts();
    const res = await api.searchProducts(query);
    setProducts(res.data);
  };

  const updateProduct = async (id, updated) => {
    const oldData = [...products];
    setProducts(products.map(p => p.id === id ? updated : p));
    try {
      await api.updateProduct(id, updated);
      toast.success("Updated");
    } catch {
      setProducts(oldData);
    }
  };

  useEffect(() => { fetchProducts(); }, [categoryFilter]);
  useEffect(() => { if (query) search(); }, [query]);

  return { products, loading, updateProduct, setQuery, setCategoryFilter, fetchProducts };
}
