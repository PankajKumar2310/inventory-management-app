import { Suspense, lazy } from "react";
import { ProductProvider } from "./context/ProductContext";
import { ToastContainer } from 'react-toastify';

const ProductDashboard = lazy(() => import("./pages/ProductDashboard"));

function App() {
  return (
    <ProductProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDashboard />
      </Suspense>
    </ProductProvider>
  );
}

export default App;
