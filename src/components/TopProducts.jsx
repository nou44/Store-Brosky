import { motion } from "framer-motion";
import { useState } from "react"; // 🔥 جديد
import products from "../data/product";

export default function TopProducts({ orders }) {
  console.log("ORDERS:", orders);

  // 🔥 state ديال show more
  const [visibleProducts, setVisibleProducts] = useState(3);

  // 🔥 جمع المنتجات + image
  const productsMap = {};

  orders.forEach(order => {
    order.items?.forEach(item => {

      const image = item.image || "/placeholder.png";

      if (!productsMap[item.name]) {
        productsMap[item.name] = {
          qty: 0,
          image
        };
      }

      productsMap[item.name].qty += item.qty;
    });
  });

  // 🔥 ترتيب (❌ حيدنا slice من هنا)
  const sortedProducts = Object.keys(productsMap)
    .map(name => ({
      name,
      qty: productsMap[name].qty,
      image: productsMap[name].image
    }))
    .sort((a, b) => b.qty - a.qty);

  // 🔥 نطبقو slice هنا
  const topProducts = sortedProducts.slice(0, visibleProducts);

  const maxQty = sortedProducts[0]?.qty || 1;

  return (
    <div className="
      bg-white dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:to-[#050505]
      border border-gray-200 dark:border-yellow-500/20
      rounded-2xl p-5
      shadow-md dark:shadow-[0_0_20px_rgba(234,179,8,0.1)]
      transition
    ">

      {/* 🔥 HEADER */}
      <div className="mb-5">
        <h2 className="text-yellow-500 font-bold text-lg">
          Top Products
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Best selling products (by quantity)
        </p>
      </div>

      {/* 🔥 LIST + SCROLL */}
      <div className="max-h-[280px] overflow-y-auto pr-1 space-y-5 no-scrollbar">

        {topProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="
              transition
              p-2 rounded-xl
              hover:shadow-lg
              dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]
            "
          >

            {/* 🔥 NAME + IMAGE */}
       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">

              <div className="flex items-center gap-3">

                {/* 🔥 IMAGE WITH HOVER */}
                <motion.img
                  src={p.image}
                  alt={p.name}
                  whileHover={{ scale: 1.4, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="
                    w-10 h-10 rounded-lg object-cover
                    border border-gray-300 dark:border-yellow-500/30
                    shadow-md
                    cursor-pointer
                  "
                />

                <span className="text-sm text-black dark:text-white font-medium flex items-center gap-2">
                  #{i + 1} {p.name}

                  {i === 0 && (
                    <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">
                      BEST
                    </span>
                  )}
                </span>

              </div>

              <span className="text-green-500 font-semibold text-sm">
                {p.qty} sold
              </span>

            </div>

            {/* 🔥 PROGRESS */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(p.qty / maxQty) * 100}%`
                }}
                transition={{ duration: 0.8 }}
                className="
                  h-full
                  bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300
                  shadow-[0_0_10px_rgba(234,179,8,0.5)]
                "
              />

              {/* 🔥 shine animation */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear"
                }}
                className="
                  absolute top-0 left-0 h-full w-1/3
                  bg-white/20 blur-sm
                "
              />

            </div>

          </motion.div>
        ))}

      </div>

      {/* 🔥 SHOW MORE */}
      {visibleProducts < sortedProducts.length && (
        <button
          onClick={() => setVisibleProducts(prev => prev + 1)}
          className="mt-3 text-xs text-yellow-500 hover:underline"
        >
          Show more ↓
        </button>
      )}

    </div>
  );
}