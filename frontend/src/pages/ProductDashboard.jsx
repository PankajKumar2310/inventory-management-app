import useProducts from "../hooks/useProducts";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import SidebarHistory from "../components/SidebarHistory";
import Loader from "../components/Loader";

export default function ProductDashboard() {
  const { products, loading, updateProduct, setQuery, setCategoryFilter, fetchProducts } = useProducts();

  return (
    <>
      <Header setQuery={setQuery} setCategoryFilter={setCategoryFilter} fetchProducts={fetchProducts} />
      {loading ? <Loader /> : <ProductTable products={products} updateProduct={updateProduct} />}
      <SidebarHistory />
    </>
  );
}
