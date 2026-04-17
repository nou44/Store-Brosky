import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Checkout() {
  const [showOptions, setShowOptions] = useState(false);
  const { state } = useLocation();
const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });
const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


useEffect(() => {
  if (showOptions) {
    const timer = setTimeout(() => {
      setShowOptions(false);
    }, 3500); // 3.5 sec

    return () => clearTimeout(timer);
  }
}, [showOptions]);
if (!state || !state.product) {
  return (
    <div className="text-center mt-10 text-red-500">
      No product selected
    </div>
  );
}
  const { product, color, size } = state;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.city) {
    alert("Fill all fields");
    return;
  }

  setLoading(true);

  try {
    await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            color: color,
            size: size,
            image: product.images[color]?.main,
          },
        ],
        total: product.price,
        customer: {
          name: form.name,
          phone: form.phone,
          city: form.city,
          address: form.address,
        },
      }),
    });

    setLoading(false);
    setSuccess(true);
    setShowOptions(true);

  } catch (err) {
    console.error(err);
    alert("Error sending order");
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">

  <div className="
  max-w-5xl mx-auto 
  grid md:grid-cols-2 gap-10

  items-start   /* 🔥 هادي هي السر */
">

        {/* 🔥 PRODUCT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            border border-yellow-500/20
            rounded-2xl p-6
            bg-white dark:bg-[#0a0a0a]
            flex flex-col items-center text-center
            transition duration-500
            hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]
          "
        >

          <div className="
            w-full h-[220px]
            flex items-center justify-center
            bg-gray-100 dark:bg-black
            rounded-xl mb-4 overflow-hidden
          ">
            <img
        src={product.images[color]?.main}
              
  className="
    w-full h-full object-contain

    md:hover:scale-105
    transition-transform duration-300

    will-change-transform
  "
/>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-yellow-500">
            {product.name}
          </h2>

          <p className="text-yellow-400 font-semibold mt-1 text-lg">
            {product.price} DH
          </p>

          <div className="mt-3 flex gap-2 flex-wrap justify-center text-sm">
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-black border border-yellow-500/20">
              Color: {color}
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-black border border-yellow-500/20">
              Size: {size}
            </span>
          </div>

        </motion.div>

        {/* 🔥 FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            border border-yellow-500/20
            rounded-2xl p-6
            bg-white dark:bg-[#0a0a0a]
            transition duration-500
            hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]
          "
        >

          <h2 className="text-xl font-bold text-yellow-500 mb-4">
            Your Information
          </h2>

          {/* INPUTS */}
          <div className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className={`
                w-full p-3 rounded-lg
                bg-gray-100 dark:bg-black
                border
                ${!form.name ? "border-red-400" : "border-gray-300 dark:border-gray-700"}
                focus:outline-none focus:border-yellow-500 transition
              `}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className={`
                w-full p-3 rounded-lg
                bg-gray-100 dark:bg-black
                border
                ${!form.phone ? "border-red-400" : "border-gray-300 dark:border-gray-700"}
                focus:outline-none focus:border-yellow-500 transition
              `}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className={`
                w-full p-3 rounded-lg
                bg-gray-100 dark:bg-black
                border
                ${!form.city ? "border-red-400" : "border-gray-300 dark:border-gray-700"}
                focus:outline-none focus:border-yellow-500 transition
              `}
            />

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="
                w-full p-3 rounded-lg
                bg-gray-100 dark:bg-black
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:border-yellow-500 transition
              "
            />

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={handleSubmit}
            className="
              w-full mt-6 py-3 rounded-xl font-semibold text-black

              bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
              bg-[length:200%_200%]

              transition-all duration-500
              hover:bg-[position:100%_0]

              shadow-lg shadow-yellow-500/30
              hover:shadow-yellow-500/60

              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : success ? "Order Sent ✅" : "Confirm Order"}
          </motion.button>

        </motion.div>

      </div>

      {/* 🔥 SUCCESS MESSAGE */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10 text-yellow-500 font-semibold"
        >
          Your order has been sent successfully 🎉
        </motion.div>
      )}
<AnimatePresence>
  {showOptions && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >

      <motion.div
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl text-center w-[90%] max-w-sm shadow-2xl"
      >

        {/* ICON SUCCESS */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500/10">
            <span className="text-2xl text-yellow-500">✔</span>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-bold text-yellow-500">
          Order Confirmed
        </h2>

        <p className="text-gray-400 text-sm mt-2 mb-6">
          Your order has been saved successfully
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">

          {/* WhatsApp button */}
          <button
            onClick={() => {
              const msg = `New Order:
Product: ${product.name}
Price: ${product.price} DH
Color: ${color}
Size: ${size}

Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Address: ${form.address}`;

              window.open(
                `https://wa.me/212705464901?text=${encodeURIComponent(msg)}`,
                "_blank"
              );
            }}
            className="
              flex items-center justify-center gap-2
              bg-green-500 hover:bg-green-600
              text-white py-2 rounded-lg font-medium
              transition
            "
          >
            {/* WhatsApp Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0012.07 0C5.47 0 .07 5.4.07 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.62A11.94 11.94 0 0012.07 24c6.6 0 12-5.4 12-12 0-3.2-1.25-6.2-3.55-8.52zM12.07 21.8c-1.82 0-3.6-.49-5.16-1.42l-.37-.22-3.67.96.98-3.58-.24-.37A9.8 9.8 0 012.27 12c0-5.41 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.87A9.74 9.74 0 0121.87 12c0 5.4-4.4 9.8-9.8 9.8zm5.38-7.36c-.29-.14-1.72-.85-1.98-.95-.27-.1-.47-.14-.66.14-.19.29-.76.95-.93 1.14-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.35-1.43-.87-.77-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.59.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.6-.9-2.2-.24-.58-.49-.5-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.03 1-1.03 2.43s1.06 2.8 1.21 3c.14.19 2.09 3.2 5.07 4.48.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.19-.56-.33z"/>
            </svg>

            WhatsApp
          </button>

          {/* Continue */}
          <button
            onClick={() => setShowOptions(false)}
            className="
              py-2 rounded-lg
              bg-gray-200 dark:bg-gray-700
              hover:opacity-80 transition
            "
          >
            Continue
          </button>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );

}