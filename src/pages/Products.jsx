import products from "../data/product";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Products() {
  const navigate = useNavigate();
  const { category } = useParams();

  const filteredProducts = category
    ? products.filter(p => p.category.toLowerCase() === category)
    : products;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      <div className="max-w-7xl mx-auto p-4">

        {/* 🔥 TITLE */}
        <div className="flex justify-center mb-10">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-yellow-400 tracking-wide capitalize">
              {category || "All Products"}
            </h1>
            <div className="mx-auto mt-2 h-[2px] w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </div>

        {/* 🔥 GRID (Temu style spacing) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="
                group cursor-pointer rounded-xl overflow-hidden
                border border-yellow-500/10
                bg-white dark:bg-[#0a0a0a]

                transition duration-300
                hover:border-yellow-400
                hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]
              "
            >

              {/* 🔥 IMAGE BIGGER (Temu style) */}
              <div className="
                relative w-full
                h-[240px] md:h-[260px]   /* 🔥 الصورة كبرناها */
                overflow-hidden
                bg-gray-100 dark:bg-black
              ">
                <img
                 src={Object.values(product.images)[0].main}
                  className="
                    w-full h-full
                    object-cover   /* 🔥 مهم باش يبان detail */
                    group-hover:scale-110
                    transition duration-500
                  "
                />

                {/* 🔥 subtle overlay hover */}
                <div className="
                  absolute inset-0
                  bg-black/0 group-hover:bg-black/10
                  transition duration-300
                " />
              </div>

              {/* 🔥 INFO */}
              <div className="p-3 space-y-1">

                <h2 className="
                  text-sm font-medium line-clamp-2
                  group-hover:text-yellow-500 transition
                ">
                  {product.name}
                </h2>

                <p className="text-yellow-500 font-bold text-sm">
                  {product.price} DH
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}