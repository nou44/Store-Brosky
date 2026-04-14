import { motion } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Location from "../components/Location";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Fill all fields");
      return;
    }

    alert("Message sent ✅");
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
            <div className="mx-auto mt-2 h-[2px] w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-6">

          {/* 🔥 LEFT */}
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

            {/* TITLE BOX */}
            <div className="
              border border-yellow-500/20
              rounded-lg p-4
              bg-gray-50 dark:bg-black
            ">
              <h2 className="text-xl font-bold text-yellow-500 mb-2">
                Get in Touch
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Feel free to contact us anytime. We will get back to you as soon as possible.
              </p>
            </div>

            {/* CONTACT BOX */}
            <div className="
              border border-yellow-500/20
              rounded-lg p-4
              bg-gray-50 dark:bg-black
              text-sm space-y-2
            ">
              <p>📧 Email: blackbox@gmail.com</p>
              <p>📱 Phone: +212 600000000</p>
            </div>

            {/* SOCIAL */}
            <div className="
              border border-yellow-500/20
              rounded-lg p-4
              bg-gray-50 dark:bg-black
              flex justify-center gap-4
            ">

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

          {/* 🔥 RIGHT FORM */}
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
                className="
                  w-full p-3 rounded-lg
                  bg-gray-100 dark:bg-black
                  border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:border-yellow-500
                  transition
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                className="
                  w-full p-3 rounded-lg
                  bg-gray-100 dark:bg-black
                  border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:border-yellow-500
                  transition
                "
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                onChange={handleChange}
                className="
                  w-full p-3 rounded-lg
                  bg-gray-100 dark:bg-black
                  border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:border-yellow-500
                  transition
                "
              />

            </div>

            {/* 🔥 BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="
                w-full mt-6 py-3 rounded-xl font-semibold text-black

                bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                bg-[length:200%_200%]

                transition-all duration-500
                hover:bg-[position:100%_0]

                shadow-lg shadow-yellow-500/30
                hover:shadow-yellow-500/60
              "
            >
              Send Message
            </motion.button>

          </motion.div>

        </div>

        {/* 🔥 FOOTER */}
        <div className="
          mt-16 pt-6
          border-t border-yellow-500/20
          flex flex-col items-center gap-3
        ">
          <img
            src="/logov.png"
            className="
              h-16 md:h-20 object-contain
              opacity-80 hover:opacity-100
              transition duration-300
              hover:scale-105
              drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]
            "
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 BLACKBOX. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

<Location />