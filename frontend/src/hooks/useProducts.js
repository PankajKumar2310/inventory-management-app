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

  const updateProduct = async (id, updates) => {
    try {
      await api.updateProduct(id, updates);
      fetchProducts(); 
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
     
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      
      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  useEffect(() => { fetchProducts(); }, [categoryFilter]);
  useEffect(() => {
  if (query.trim() === "") {
    fetchProducts(); 
  } else {
    search(); 
  }
}, [query]);


  return { 
    products, 
    loading, 
    updateProduct, 
    deleteProduct,
    setQuery, 
    setCategoryFilter, 
    fetchProducts 
  };
}
