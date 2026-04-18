import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartCheckout() {

  const API_URL = import.meta.env.VITE_API_URL;

  const { state } = useLocation();
  const cart = state?.cart || [];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
useEffect(() => {
  if (showOptions) {
    const timer = setTimeout(() => {
      setShowOptions(false);
    }, 3500);

    return () => clearTimeout(timer);
  }
}, [showOptions]);
  if (cart.length === 0) {
    return <div className="text-center mt-10 text-gray-600 dark:text-gray-300">Cart is empty</div>;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.city) {
    alert("Fill all fields");
    return;
  }

  setLoading(true);

  try {
    await fetch(`${API_URL}/api/orders`, { // ✅ تبدلات غير هادي
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          color: item.color,
          size: item.size,

          image:
            item.images?.[item.color]?.main ||
            item.images?.black?.main ||
            "/placeholder.png",
        })),

        total,
        customer: form,
      }),
    });

    setLoading(false);
    setShowOptions(true);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

  return (
    <div className="
      min-h-screen p-4 relative
      bg-[#f5f5f7] 
      dark:bg-[#050505]
      text-black dark:text-white
    ">

      {/* subtle glow */}
      <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.06),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto relative z-10"
      >

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold mb-8 tracking-tight
          text-gray-900 dark:text-white
        ">
          Your Cart
        </h1>

        {/* PRODUCTS */}
        <div className="space-y-4 mb-6">
          {cart.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.015 }}
              className="
                flex gap-4 p-4 rounded-2xl
                bg-white dark:bg-[#0b0b0b]
                border border-gray-200 dark:border-white/5
                shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                hover:shadow-lg dark:hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)]
                transition-all duration-300
              "
            >

              <img
                src={item.images[item.color]?.main}
                className="
                  w-20 h-20 object-cover rounded-xl
                  border border-gray-200 dark:border-white/10
                "
              />

              <div className="flex-1">
                <p className="font-semibold text-[15px]">{item.name}</p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.color} / {item.size}
                </p>

                <p className="mt-2 font-semibold text-yellow-500">
                  {item.price} DH × {item.qty}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* TOTAL (FIXED 🔥) */}
        <div className="
          flex justify-between items-center mb-8
          px-5 py-4 rounded-2xl
          bg-white dark:bg-[#0b0b0b]
          border border-gray-200 dark:border-white/10
          shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        ">
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            Total
          </span>

          <span className="text-xl font-bold text-yellow-500">
            {total} DH
          </span>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {["name", "phone", "city"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="
                w-full p-3 rounded-xl
                bg-white dark:bg-[#0b0b0b]
                border border-gray-300 dark:border-white/10
                focus:border-yellow-500
                focus:ring-2 focus:ring-yellow-500/20
                outline-none transition
                placeholder:text-gray-400
              "
            />
          ))}

          <textarea
            name="address"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="
              w-full p-3 rounded-xl
              bg-white dark:bg-[#0b0b0b]
              border border-gray-300 dark:border-white/10
              focus:border-yellow-500
              focus:ring-2 focus:ring-yellow-500/20
              outline-none transition
              placeholder:text-gray-400
            "
          />
        </div>

        {/* BUTTON (UPGRADED 🔥) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          className="
            w-full mt-8 py-3 rounded-xl font-semibold
            bg-yellow-500 hover:bg-yellow-400
            text-black
            shadow-lg shadow-yellow-500/20
            hover:shadow-yellow-500/40
            transition-all duration-300
          "
        >
          {loading ? "Processing..." : "Confirm Order"}
        </motion.button>

      </motion.div>

      {/* MODAL */}
      {loading && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white dark:bg-[#111] px-6 py-5 rounded-2xl flex flex-col items-center gap-3 shadow-xl">

      {/* spinner */}
      <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Processing your order...
      </p>

    </div>
  </div>
)}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-3"
          >

            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              className="
                w-full max-w-md p-6 rounded-3xl text-center
                bg-white dark:bg-[#0b0b0b]
                border border-gray-200 dark:border-white/10
                shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              "
            >

              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/30">
               <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 180 }}
  className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30"
>
  <span className="text-2xl text-green-500">✔</span>
</motion.div>
                </div>
              </div>

            <h2 className="text-xl font-bold text-green-500">
                Order Confirmed
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">
                Your order has been saved successfully
              </p>

              <div className="flex flex-col gap-3">

                <button
                  onClick={() => {
                    const productsText = cart.map(item =>
                      `• ${item.name} (${item.color}/${item.size}) x${item.qty} - ${item.price} DH`
                    ).join("\n");

                    const msg = `New Order:\n\n${productsText}\n\nTotal: ${total} DH\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}`;

                    const url = `https://wa.me/212705464901?text=${encodeURIComponent(msg)}`;
                    window.open(url, "_blank");

                    setTimeout(() => setShowOptions(false), 500);
                  }}
                 className="
  py-3 rounded-xl font-semibold
  bg-gradient-to-r from-green-500 to-green-600
  text-white

  hover:scale-105 active:scale-95
  transition-all duration-300

  shadow-md hover:shadow-green-500/40
"
                >
                  Contact on WhatsApp
                </button>

                <button
                  onClick={() => {
                    setShowOptions(false);
                    navigate("/");
                  }}
                 className="
  py-3 rounded-xl
  bg-gray-100 dark:bg-[#111]

  border border-gray-300 dark:border-white/10

  hover:scale-105 active:scale-95
  transition
"
                >
                  Continue Shopping
                </button>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}