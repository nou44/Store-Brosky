import { useParams, useNavigate } from "react-router-dom";
import products from "../data/product";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id == id);

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  const firstColor = Object.keys(product.images)[0];

  const [color, setColor] = useState(firstColor);
  const [size, setSize] = useState("");

 const currentImage = product.images[color].main;

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 text-black dark:text-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* 🔥 IMAGE */}
        <div className="
          rounded-2xl overflow-hidden
          border-2 border-yellow-500/30
          bg-gray-100 dark:bg-black

          w-[220px] sm:w-[400px] md:w-[360px]
          mx-auto

          flex items-center justify-center

          transition duration-500
          hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]
        ">
       <motion.img
  src={currentImage}
  className="
    max-h-[260px] sm:max-h-[320px] md:max-h-[460px]
    object-contain

    will-change-transform
  "
  animate={{ opacity: [0.5, 1] }}
  transition={{ duration: 0.3 }}
/>
        </div>

        {/* 🔥 INFO */}
        <div className="space-y-6">

          {/* TITLE + PRICE */}
          <div className="
            border border-yellow-500/20
            rounded-xl p-5
            bg-white dark:bg-[#0a0a0a]
            transition duration-500
            hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]
          ">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-yellow-500">
              {product.name}
            </h1>

            <p className="text-yellow-400 font-semibold text-xl">
              {product.price} DH
            </p>
          </div>

          {/* COLORS */}
          <div className="
            border border-yellow-500/20
            rounded-xl p-5
            bg-white dark:bg-[#0a0a0a]
          ">
            <p className="font-semibold mb-3">Color</p>

            <div className="flex gap-2 flex-wrap">
              {Object.keys(product.images).map(c => (
                <motion.button
                  key={c}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setColor(c)}
                  className={`
                    px-4 py-1 rounded-full border capitalize text-sm
                    transition duration-300
                    ${color === c
                      ? "bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/40 scale-105"
                      : "border-gray-300 dark:border-gray-700 hover:border-yellow-400 hover:scale-105 hover:text-yellow-500"}
                  `}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="
            border border-yellow-500/20
            rounded-xl p-5
            bg-white dark:bg-[#0a0a0a]
          ">
            <p className="font-semibold mb-3">Size</p>

            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(s => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSize(s)}
                  className={`
                    px-4 py-1 rounded-full border text-sm
                    transition duration-300
                    ${size === s
                      ? "bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/40 scale-105"
                      : "border-gray-300 dark:border-gray-700 hover:border-yellow-400 hover:scale-105 hover:text-yellow-500"}
                  `}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!size) {
                alert("Choose size");
                return;
              }

              navigate("/checkout", {
                state: { product, color, size }
              });
            }}
            className="
              w-full py-3 rounded-xl font-semibold
              text-black

              bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
              bg-[length:200%_200%]

              transition-all duration-500
              hover:bg-[position:100%_0]

              shadow-lg shadow-yellow-500/30
              hover:shadow-yellow-500/60
            "
          >
            Buy Now
          </motion.button>

        </div>
      </div>
    </div>
  );
}