import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  // 🔥 LOAD من localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔥 SAVE فـ localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ ADD
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (exist) {
        return prev.map((item) =>
          item === exist
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ❌ REMOVE
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔢 UPDATE QTY
  const updateQty = (index, type) => {
    setCart((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        if (type === "inc") return { ...item, qty: item.qty + 1 };
        if (type === "dec" && item.qty > 1)
          return { ...item, qty: item.qty - 1 };

        return item;
      })
    );
  };

  // 🧹 CLEAR
  const clearCart = () => setCart([]);

  // 💰 TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);