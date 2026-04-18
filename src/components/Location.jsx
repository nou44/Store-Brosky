import { motion } from "framer-motion";

export default function Location() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-12 md:py-20">

      <div className="max-w-6xl mx-auto px-4">

        {/* 🔥 TITLE */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide">

            {/* DARK */}
            <span className="hidden dark:inline bg-gradient-to-r from-yellow-400 via-white to-yellow-500 bg-[length:200%] animate-[shine_4s_linear_infinite] bg-clip-text text-transparent">
              Our Location
            </span>

            {/* LIGHT */}
            <span className="dark:hidden bg-gradient-to-r from-yellow-500 via-black to-yellow-600 bg-[length:200%] animate-[shine_4s_linear_infinite] bg-clip-text text-transparent">
              Our Location
            </span>

          </h2>

          {/* ❌ نقصنا المسافة */}
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-2 md:mt-3">
            Visit our store or contact us anytime.
          </p>

          <div className="mx-auto mt-3 md:mt-4 h-[2px] w-20 md:w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* 🔥 MAP */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              relative
              rounded-2xl overflow-hidden
              border border-yellow-500/20
              group
              transition duration-500
              hover:shadow-[0_0_40px_rgba(234,179,8,0.4)]
            "
          >

            <iframe
              src="https://www.google.com/maps?q=Fes,Morocco&output=embed"
              className="
                w-full 
                h-[260px] sm:h-[300px] md:h-[320px]
                border-0
                scale-100 group-hover:scale-105
                transition duration-700
              "
              loading="lazy"
            ></iframe>

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500 pointer-events-none" />

          </motion.div>

          {/* 🔥 INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              space-y-4 md:space-y-6
              border border-yellow-500/20
              rounded-2xl p-4 md:p-6
              bg-white dark:bg-[#0a0a0a]
              transition duration-500
              hover:shadow-[0_0_35px_rgba(234,179,8,0.35)]
            "
          >

            <h3 className="text-lg md:text-xl font-bold text-yellow-500">
              Visit Our Store
            </h3>

            {/* INFO */}
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">

              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-yellow-500">📍</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Fès, Morocco
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-yellow-500">📞</span>
                <span className="text-gray-600 dark:text-gray-400">
                  +212 600000000
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-yellow-500">⏰</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Mon - Sat: 10:00 - 20:00
                </span>
              </div>

            </div>

            {/* DELIVERY */}
            <div className="
              rounded-xl p-3 md:p-4
              bg-gray-50 dark:bg-black
              border border-yellow-500/10
              text-xs md:text-sm
              text-gray-600 dark:text-gray-400
            ">
              🚚 Fast delivery across Morocco <br />
              💰 Cash on Delivery <br />
              ⚡ 24-48h delivery
            </div>

            {/* BUTTON */}
            <a
              href="https://www.google.com/maps?q=Fes,Morocco"
              target="_blank"
              rel="noreferrer"
              className="
                block text-center mt-1 md:mt-2
                py-2.5 md:py-3 rounded-xl font-semibold text-black

                bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                bg-[length:200%_200%]

                transition-all duration-500
                hover:bg-[position:100%_0]

                shadow-md shadow-yellow-500/30
                hover:shadow-yellow-500/60
              "
            >
              Open Map
            </a>

          </motion.div>

        </div>

      </div>
    </div>
  );
}