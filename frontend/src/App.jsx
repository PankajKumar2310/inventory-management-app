import { ProductProvider } from "./context/ProductContext";
import ProductDashboard from "./pages/ProductDashboard";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ProductProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <ProductDashboard />
    </ProductProvider>
  );
}

export default App;
