import { motion } from "framer-motion";
import { useRef, useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function PromoBar() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="overflow-hidden mt-10">

      <motion.div
        className="flex whitespace-nowrap py-3 text-sm font-semibold"
        animate={{ x: [0, -width] }}
        transition={{
          repeat: Infinity,
          duration: window.innerWidth < 768 ? 10 : 10,
          ease: "linear",
        }}
      >

        {/* 🔥 content duplicated EXACT */}
        <div ref={ref} className="flex">

          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-6">

              <span className={dark ? "text-white" : "text-black"}>
                🔥 BIG SALE
              </span>

              <span className="opacity-40">✦</span>

              <span className={dark ? "text-white" : "text-black"}>
                🚀 FREE SHIPPING
              </span>

              <span className="opacity-40">✦</span>

              <span className={dark ? "text-white" : "text-black"}>
                💎 PREMIUM QUALITY
              </span>

              <span className="opacity-40">✦</span>

              <span className={dark ? "text-white" : "text-black"}>
                ⚡ LIMITED OFFER
              </span>

              <span className="opacity-40">✦</span>

              <span className={dark ? "text-white" : "text-black"}>
                🛍️ NEW DROPS
              </span>

<span className="opacity-40">✦</span>

              <span className={dark ? "text-white" : "text-black"}>
                🛍️ NEW DROPS
              </span>

            </div>
          ))}

        </div>

      </motion.div>

    </div>
  );
}