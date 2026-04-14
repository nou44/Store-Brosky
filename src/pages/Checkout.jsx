import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Checkout() {
  const { state } = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.city) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // 🔥 WhatsApp message
      const msg = `New Order:
Product: ${product.name}
Price: ${product.price} DH
Color: ${color}
Size: ${size}

Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Address: ${form.address}`;

      window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, "_blank");

    }, 1500);
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

    </div>
  );
}