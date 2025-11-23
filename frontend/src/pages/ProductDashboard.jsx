import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import SidebarHistory from "../components/SidebarHistory";
import Loader from "../components/Loader";

export default function ProductDashboard() {
  const { products, loading, updateProduct, deleteProduct, setQuery, setCategoryFilter, fetchProducts } = useProducts();

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  useEffect(() => {
    
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [products.length, totalPages, page]);

  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <Header setQuery={setQuery} setCategoryFilter={setCategoryFilter} fetchProducts={fetchProducts} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductTable
            products={paginatedProducts}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
          />

          {products.length > pageSize && (
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", alignItems:"center", gap: "8px" }}>
              <i
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                class="ri-arrow-left-circle-fill arrow"
              ></i>
              <span>
                Page {page} of {totalPages}
              </span>
              <i
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                class="ri-arrow-right-circle-fill arrow"
              ></i>
            </div>
          )}
        </>
      )}
      <SidebarHistory />
    </>
  );
}
