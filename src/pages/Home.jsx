import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PromoBar from "../components/PromoBar";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
export default function Home() {
  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL;
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

  
 const [email, setEmail] = useState("");
const [subscribed, setSubscribed] = useState(false);

const handleSubscribe = async () => {
  if (!email || !email.includes("@")) {
    alert("Enter a valid email");
    return;
  }

  try {
    await fetch(`${API_URL}/api/subscribe`, { // ✅ تبدلات غير هادي
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);

  } catch (err) {
    console.error(err);
    alert("Error");
  }
};
const texts = [
  "Discover your style",
  "Find your perfect outfit",
  "Upgrade your look",
  "Luxury streetwear vibes"
];

const [displayText, setDisplayText] = useState("");
const [textIndex, setTextIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const current = texts[textIndex];
  let timeout;

  if (!isDeleting) {
    // typing
    timeout = setTimeout(() => {
      setDisplayText(current.substring(0, displayText.length + 1));
    }, 60);
  } else {
    // deleting
    timeout = setTimeout(() => {
      setDisplayText(current.substring(0, displayText.length - 1));
    }, 40);
  }

  if (!isDeleting && displayText === current) {
    timeout = setTimeout(() => setIsDeleting(true), 1200);
  } else if (isDeleting && displayText === "") {
    setIsDeleting(false);
    setTextIndex((prev) => (prev + 1) % texts.length);
  }

  return () => clearTimeout(timeout);
}, [displayText, isDeleting, textIndex]);


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

  {/* 🔥 TITLE PRO */}
  <div className="text-center mb-12">
    <h2 className="
      text-xl sm:text-2xl md:text-3xl font-semibold

      bg-[linear-gradient(90deg,#eab308,#000000,#eab308)]
      dark:bg-[linear-gradient(90deg,#eab308,#ffffff,#eab308)]

      bg-[length:200%_100%]
      bg-clip-text text-transparent
      animate-gradientMove

      tracking-wide
    ">
      Categories
    </h2>
<p className="
  mt-3 text-sm md:text-base
  text-gray-600 dark:text-gray-300
  font-medium
  h-6
">
  {displayText}
  <span className="ml-1 animate-pulse text-yellow-500">|</span>
</p>
    <div className="mx-auto mt-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
  </div>

  {/* 🔥 GRID */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">

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
          transition-all duration-300

          hover:border-yellow-400
          hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]
          hover:-translate-y-1
        "
      >

        {/* IMAGE */}
        <img
          src={cat.img}
          className="
            w-full h-40 md:h-48 object-cover

            transition duration-700
            group-hover:scale-110
          "
        />

        {/* 🔥 OVERLAY */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/70 via-black/20 to-transparent
          flex items-end justify-center pb-4
        ">

          {/* 🔥 TEXT WITH ANIMATION */}
          <span className="
            text-white font-semibold text-sm md:text-lg uppercase tracking-widest

            transition-all duration-300
            group-hover:text-yellow-400
            group-hover:tracking-[0.25em]
            group-hover:scale-105
          ">
            {cat.name}
          </span>

        </div>

        {/* 🔥 subtle glow */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-yellow-500/10
          transition duration-300
        " />

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
      relative flex items-center
      border border-gray-700
      rounded-xl overflow-hidden
      transition duration-300
      focus-within:border-yellow-500
      focus-within:shadow-[0_0_20px_rgba(234,179,8,0.5)]
    ">

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleSubscribe}
        className="
          px-5 h-full
          bg-yellow-500 text-black font-bold

          hover:bg-yellow-400
          hover:scale-105
          active:scale-95

          transition duration-300
        "
      >
        →
      </button>

      {/* 🔥 glow effect */}
      <div className="absolute inset-0 pointer-events-none rounded-xl border border-yellow-500/20"></div>

    </div>

    {/* 🔥 SUCCESS MESSAGE */}
    <AnimatePresence>
      {subscribed && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-green-400 font-semibold text-sm md:text-base"
        >
          Welcome to the family 🖤🔥
        </motion.div>
      )}
    </AnimatePresence>

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