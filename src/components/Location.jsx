import { motion } from "framer-motion";

export default function Location() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-20">

      <div className="max-w-6xl mx-auto px-4">

        {/* 🔥 TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 tracking-wide">
            Our Location
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* 🔥 MAP */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              rounded-2xl overflow-hidden
              border border-yellow-500/20
              transition duration-500
              hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]
            "
          >
            <iframe
              src="https://www.google.com/maps?q=Fes,Morocco&output=embed"
              className="w-full h-[320px] border-0"
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* 🔥 INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              space-y-5
              border border-yellow-500/20
              rounded-2xl p-6
              bg-white dark:bg-[#0a0a0a]
              transition duration-500
              hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]
            "
          >

            <h3 className="text-xl font-bold text-yellow-500">
              Visit Our Store
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              📍 Fès, Morocco
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              📞 +212 600000000
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              ⏰ Mon - Sat: 10:00 - 20:00
            </p>

            {/* 🔥 DELIVERY INFO */}
            <div className="
              border border-yellow-500/10
              rounded-xl p-4
              bg-gray-50 dark:bg-black
              text-sm text-gray-600 dark:text-gray-400
            ">
              🚚 Fast delivery available across Morocco <br />
              💰 Cash on Delivery available <br />
              ⚡ Delivery in 24-48 hours
            </div>

            {/* 🔥 OPEN MAP BUTTON */}
            <a
              href="https://www.google.com/maps?q=Fes,Morocco"
              target="_blank"
              rel="noreferrer"
              className="
                inline-block mt-3 px-6 py-2 rounded-full font-semibold text-black

                bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                bg-[length:200%_200%]

                transition-all duration-500
                hover:bg-[position:100%_0]
                hover:scale-105

                shadow-md shadow-yellow-500/30
                hover:shadow-yellow-500/60
              "
            >
              Open in Google Maps
            </a>

          </motion.div>

        </div>

      </div>
    </div>
  );
}