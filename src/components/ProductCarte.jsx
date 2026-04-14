import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  // 🔥 أول image (باش نخدمو بها فالكارت)
  const firstImage = Object.values(product.images)[0];

  return (
    <Link to={`/product/${product.id}`}>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="
          bg-white dark:bg-gray-900
          rounded-xl overflow-hidden
          border border-gray-200 dark:border-purple-500/20
          shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
          transition duration-300 cursor-pointer
        "
      >

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={firstImage}
            className="
              w-full h-60 object-cover
              group-hover:scale-110
              transition duration-500
            "
          />
        </div>

        {/* INFO */}
        <div className="p-4">

          <h2 className="font-semibold text-lg">
            {product.name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            {product.price} DH
          </p>

          {/* COLORS PREVIEW */}
          <div className="flex gap-2 mt-3">
            {Object.keys(product.images).map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border"
                style={{ background: color }}
              />
            ))}
          </div>

        </div>

      </motion.div>

    </Link>
  );
}