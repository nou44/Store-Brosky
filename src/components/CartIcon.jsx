import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartIcon() {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false); // 🔥 animation state
  const cartRef = useRef();
  const iconRef = useRef(); // 🔥 ref ديال icon
  const navigate = useNavigate();

  // 🔥 expose icon + trigger globally
  useEffect(() => {
    window.cartIcon = iconRef.current;

    window.triggerCartAnimation = () => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    };
  }, []);

  // 🔥 close when click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* 🛒 ICON */}
      <button
        ref={iconRef}
        onClick={() => setOpen(true)}
        className={`
          relative text-2xl transition
          ${animate ? "scale-125" : "hover:scale-110"}
        `}
      >
        🛒

        {/* 🔴 COUNTER */}
        {cart.length > 0 && (
          <span className={`
            absolute -top-2 -right-2 
            bg-red-500 text-white text-xs 
            px-2 py-[2px] rounded-full
            ${animate ? "animate-ping" : "animate-bounce"}
          `}>
            {cart.length}
          </span>
        )}

        {/* ✨ GLOW EFFECT */}
        {animate && (
          <span className="absolute inset-0 rounded-full bg-yellow-400/40 blur-xl animate-pulse"></span>
        )}
      </button>

      {/* 🌑 OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition" />
      )}

    {/* 🧾 CART PANEL */}
<div
  ref={cartRef}
  className={`
    fixed right-3 top-[70px]

    w-[92%] max-w-[320px]
    h-[75vh]

    rounded-2xl

    bg-white dark:bg-[#0a0a0a]
    text-black dark:text-white
    z-50

    shadow-[0_10px_40px_rgba(0,0,0,0.6)]

    flex flex-col

    transform transition duration-300 ease-in-out
    ${open ? "translate-x-0" : "translate-x-[120%]"}
  `}
>

  {/* 🔥 HEADER */}
  <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-700">

    <div className="h-12 flex items-center justify-center relative">
      <div className="animate-slideY text-lg font-bold tracking-wide">
        🛒 Your Cart
      </div>
    </div>

    <button
      onClick={() => setOpen(false)}
      className="
        absolute right-4 top-3
        text-xl
        hover:scale-110
        transition
        text-gray-500 hover:text-yellow-500
      "
    >
      ←
    </button>

  </div>

  {/* 🔥 CONTENT */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">

    {cart.length === 0 && (
      <div className="text-center mt-20">
        <p className="text-gray-400">Your cart is empty</p>
      </div>
    )}

    {cart.map((item, i) => (
      <div
        key={i}
        className="
          flex gap-3 items-center
          bg-gray-100 dark:bg-[#111]
          p-2 rounded-xl
          hover:shadow-[0_0_10px_rgba(234,179,8,0.3)]
          transition
        "
      >

        <img
          src={item.images[item.color]?.main}
          className="w-16 h-16 object-cover rounded-lg"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold">
            {item.name}
          </p>

          <p className="text-xs text-gray-400">
            {item.color} / {item.size}
          </p>

          <p className="text-yellow-500 font-bold text-sm">
            {item.price} DH
          </p>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => updateQty(i, "dec")}
              className="px-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              -
            </button>

            <span className="text-sm">{item.qty}</span>

            <button
              onClick={() => updateQty(i, "inc")}
              className="px-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => removeFromCart(i)}
          className="text-red-500 text-sm hover:scale-110 transition"
        >
          ✕
        </button>

      </div>
    ))}

  </div>

  {/* 🔥 FOOTER (❌ حيدنا absolute) */}
  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a]">

    <div className="flex justify-between mb-3 font-bold text-lg">
      <span>Total</span>
      <span className="text-yellow-500">{total} DH</span>
    </div>

    <button
      onClick={() => {
        setOpen(false);
        navigate("/cart-checkout", { state: { cart } });
      }}
      className="
        w-full py-3 rounded-xl font-bold
        bg-yellow-500 text-black
        hover:scale-105 transition
        shadow-lg shadow-yellow-500/30
      "
    >
      Checkout
    </button>

    <button
      onClick={clearCart}
      className="
        w-full mt-2 py-2 rounded-xl
        bg-gray-200 dark:bg-gray-700
        hover:scale-105 transition
      "
    >
      Clear Cart
    </button>

  </div>

</div>
    </>
  );
}