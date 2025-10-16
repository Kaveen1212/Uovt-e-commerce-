import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Home from "./components/home/Hero";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Wishlist from "./pages/Wishlist";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />

        <Route path="/wishlist" element={
          <>
            <Navbar />
            <Wishlist />
            <Footer />
          </>
        } />

        <Route path="/products" element={
          <>
            <Navbar />
            <Products />
            <Footer />
          </>
        } />

        <Route path="/products/:id" element={
          <>
            <Navbar />
            <ProductDetailPage />
            <Footer />
          </>
        } />

        {/* Auth Routes without Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
