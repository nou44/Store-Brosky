import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PromoBar from "../components/PromoBar";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
export default function Home() {
  const navigate = useNavigate();

  const images = [
    "/Outfit.png",
    "/Shoes.png",
    "/Caps.png",
    "/hero as.png",
  ];

  const [index, setIndex] = useState(0);

  // 🔥 popup
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔥 auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

 

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">

      {/* 🔥 SLIDER */}
      <div className="max-w-6xl mx-auto pt-6 px-4">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-yellow-500/30">

          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              className="w-full h-[260px] md:h-[420px] object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>

          {/* 🔥 overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">

            <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
              Welcome to BROSKY
            </h1>

            <button
              onClick={() =>
                document.getElementById("categories").scrollIntoView({ behavior: "smooth" })
              }
              className="
                px-8 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                transition-all duration-500
                hover:scale-110
                shadow-lg shadow-yellow-500/40
              "
            >
              Shop Now
            </button>

          </div>
        </div>

        {/* 🔥 DOTS */}
        <div className="flex justify-center gap-3 mt-4">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`
                w-3 h-3 rounded-full cursor-pointer transition
                ${index === i
                  ? "bg-yellow-500 scale-125"
                  : "bg-gray-400 hover:bg-yellow-400"}
              `}
            />
          ))}
        </div>
      </div>

      {/* 🔥 CATEGORIES */}
      <div id="categories" className="max-w-6xl mx-auto mt-16 px-4">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 tracking-wide">
            Categories
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {[
            { name: "outfit", img: "/outfit ct.png" },
            { name: "shoes", img: "/Shoes ct.png" },
            { name: "caps", img: "/Caps.png" },
            { name: "accessories", img: "/Accessoires.png" },
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/products/${cat.name.toLowerCase()}`)}
              className="
                relative rounded-2xl overflow-hidden group cursor-pointer
                border border-yellow-500/20
                hover:border-yellow-400
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]
              "
            >

              <img
                src={cat.img}
                className="
                  w-full h-40 object-cover
                  group-hover:scale-110
                  transition duration-500
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                <span className="text-white font-bold text-lg uppercase tracking-wide">
                  {cat.name}
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* 🔥 PROMO BAR */}
      <div className="mt-10">
        <PromoBar />
      </div>

<YouMayAlsoLike />  

{/* 🔥 NEWSLETTER */}
<div className="mt-20 px-4 flex justify-center">

  <div className="w-full max-w-xl text-center">

    {/* 🔥 TITLE */}
    <h2 className="text-xl md:text-3xl font-bold mb-2 tracking-wide">
      JOIN THE BLACKBOX FAMILY
    </h2>

    {/* 🔥 DESCRIPTION */}
    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
      Discover exclusive drops, premium streetwear and limited offers.  
      Be the first to know about new collections and special deals.
    </p>

    {/* 🔥 INPUT */}
    <div className="
      flex items-center
      border border-gray-700
      rounded-xl overflow-hidden
      transition duration-300
      focus-within:border-yellow-500
      focus-within:shadow-[0_0_15px_rgba(234,179,8,0.4)]
    ">

      <input
        type="email"
        placeholder="Enter your email"
        className="
          flex-1 px-4 py-3
          bg-transparent
          outline-none
          text-white
          placeholder-gray-400
          text-sm md:text-base
        "
      />

      <button
        className="
          px-5 h-full
          bg-yellow-500 text-black font-bold

          hover:bg-yellow-400
          hover:scale-105
          transition duration-300
        "
      >
        →
      </button>

    </div>

    {/* 🔥 SMALL TRUST TEXT */}
    <p className="text-xs text-gray-400 mt-3">
      No spam. Only premium content.
    </p>

  </div>

</div>
      {/* 🔥 FOOTER */}
      <div className="mt-12 py-8 border-t border-gray-200 dark:border-yellow-500/20 text-center">

        <img
          src="/logov.png"
          alt="logo"
          className="h-20 mx-auto mb-3 opacity-80 hover:opacity-100 transition"
        />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2026 BLACKBOX. All rights reserved.
        </p>

      </div>

    </div>
  );
}