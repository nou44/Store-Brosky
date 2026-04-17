import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

     if (!res.ok) {
  setError(data.error || "Login failed");
  setLoading(false);
  return;
}

// ✅ SAVE USER
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);

// 🔥 update navbar
window.dispatchEvent(new Event("userChanged"));



// 🔥 redirect
navigate("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center px-4
      ${dark ? "bg-black text-white" : "bg-gray-100 text-black"}
    `}>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          w-full max-w-md
          rounded-2xl p-6

          ${dark 
            ? "bg-[#0a0a0a] border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.15)]"
            : "bg-white border border-gray-200 shadow-xl"
          }

          transition duration-300
        `}
      >

        {/* 🔥 TITLE */}
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-2">
          Admin Login
        </h2>

        {/* 🔥 ADMIN NOTICE */}
        <p className="text-center text-xs mb-4 text-gray-400">
          🔒 This area is restricted to authorized administrators only
        </p>

        <p className="text-gray-400 text-center text-sm mb-6">
          Access your dashboard securely
        </p>

        {/* 🔥 ERROR */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* 🔥 INPUTS */}
        <div className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`
              w-full p-3 rounded-lg
              transition duration-300

              ${dark 
                ? "bg-black border border-gray-700 focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                : "bg-gray-100 border border-gray-300 focus:border-yellow-500 focus:bg-white"
              }

              focus:outline-none
            `}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={`
              w-full p-3 rounded-lg
              transition duration-300

              ${dark 
                ? "bg-black border border-gray-700 focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                : "bg-gray-100 border border-gray-300 focus:border-yellow-500 focus:bg-white"
              }

              focus:outline-none
            `}
          />

        </div>

        {/* 🔥 BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
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
          {loading ? "Logging in..." : "Login"}
        </motion.button>

      </motion.div>
    </div>
  );
}