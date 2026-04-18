import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LocationPage from "./pages/LocationPage";
import CartCheckout from "./pages/CartCheckout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>

      {/* 🔥 Loader overlay */}
      {loading && <Loader onFinish={() => setLoading(false)} />}

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/location" element={<LocationPage />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/cart-checkout" element={<CartCheckout />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;