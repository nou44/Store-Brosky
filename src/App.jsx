import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LocationPage from "./pages/LocationPage";
import { CartProvider } from "./context/CartContext";

<CartProvider>
  <App />
</CartProvider>
function App() {
  return (
    <BrowserRouter>

      <Navbar />

  <Routes>
  <Route path="/" element={<Home />} />
<Route path="/location" element={<LocationPage />} />
  {/* 🔥 Products */}
  <Route path="/products" element={<Products />} />
  <Route path="/products/:category" element={<Products />} />

  {/* 🔥 Product details */}
  <Route path="/product/:id" element={<Product />} />

  <Route path="/checkout" element={<Checkout />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;