import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function TopBar() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="bg-yellow-400 text-black overflow-hidden sticky top-0 z-[60]">

      <motion.div
        className="flex whitespace-nowrap py-2 text-sm font-semibold"
        animate={{ x: [0, -width] }}
        transition={{
          repeat: Infinity,
          duration: window.innerWidth < 768 ? 7 : 9,
          ease: "linear",
        }}
      >

        {/* 🔥 مهم: نفس content مكرر EXACT */}
        <div ref={ref} className="flex">

          {[...Array(2)].map((_, i) => (
           <div key={i} className="flex items-center gap-8 px-4">

              <span>FAST DELIVERY</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

              <span>NEW COLLECTION</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

              <span>BROSKY PREMIUM</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

              <span>LIMITED OFFER</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

              <span>FREE SHIPPING</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

              <span>NEW DROPS BR</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

                           <span>NEW DROPS BR</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full opacity-70" />

            </div>
          ))}

        </div>

      </motion.div>

    </div>
  );
}