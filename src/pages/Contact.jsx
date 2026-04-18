import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Location from "../components/Location";

export default function Contact() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      // 🔥 UX delay باش يبان loading
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 800);

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error sending message");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 tracking-wide">
              Contact Us
            </h1>
            <div className="mx-auto mt-2 h-[2px] w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-6">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              border border-yellow-500/20
              rounded-2xl p-6
              bg-white dark:bg-[#0a0a0a]
              space-y-5
              transition duration-500
              hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]
            "
          >

            <div className="border border-yellow-500/20 rounded-lg p-4 bg-gray-50 dark:bg-black">
              <h2 className="text-xl font-bold text-yellow-500 mb-2">
                Get in Touch
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Feel free to contact us anytime. We’ll reply as soon as possible.
              </p>
            </div>

            <div className="border border-yellow-500/20 rounded-lg p-4 bg-gray-50 dark:bg-black text-sm space-y-2">
              <p>📧 Email: blackbox@gmail.com</p>
              <p>📱 Phone: +212 600000000</p>
            </div>

            <div className="border border-yellow-500/20 rounded-lg p-4 bg-gray-50 dark:bg-black flex justify-center gap-4">
              {[FaInstagram, FaXTwitter, FaFacebook, FaWhatsapp].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  className="
                    p-3 rounded-full
                    bg-white dark:bg-black
                    border border-yellow-500/20
                    text-yellow-500
                    transition duration-300
                    hover:bg-yellow-500
                    hover:text-white
                    hover:shadow-[0_0_15px_rgba(234,179,8,0.6)]
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

          </motion.div>

          {/* FORM */}
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
              Send Message
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={form.name}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-yellow-500 transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                value={form.email}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-yellow-500 transition"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                onChange={handleChange}
                value={form.message}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-yellow-500 transition"
              />

            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full mt-6 py-3 rounded-xl font-semibold text-black
                bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                transition-all duration-500
                shadow-lg shadow-yellow-500/30
                hover:shadow-yellow-500/60
                disabled:opacity-60
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : "Send Message"}
            </motion.button>

          </motion.div>
        </div>

        {/* 🔥 PRO CONFIRMATION */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            >
              <motion.div
                initial={{ scale: 0.6, y: 80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.6, y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 140 }}
                className="
                  w-full max-w-sm p-6 rounded-3xl text-center
                  bg-white/90 dark:bg-[#0a0a0a]/90
                  backdrop-blur-xl
                  border border-yellow-500/20
                  shadow-[0_0_50px_rgba(234,179,8,0.3)]
                "
              >

                <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500/10">
                  <span className="absolute w-full h-full rounded-full bg-green-500/20 animate-ping"></span>
                  <span className="text-3xl text-green-500 z-10">✔</span>
                </div>

                <h2 className="text-lg font-bold text-yellow-500">
                  Message Sent
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                  Thank you! We’ll reply very soon.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="
                    w-full py-2 rounded-xl
                    bg-gradient-to-r from-yellow-500 to-yellow-600
                    text-black font-semibold
                    hover:scale-105 transition
                  "
                >
                  Continue
                </button>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
