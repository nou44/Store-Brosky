import { motion } from "framer-motion";

export default function About() {
  const team = [
    {
      name: "Oussama",
      role: "Founder",
      desc: "Passionate about fashion and modern streetwear. Building BLACKBOX to deliver premium style.",
      img: "/about2.jpg"
    },
    {
      name: "Nouhe",
      role: "Co-Founder",
      desc: "Focused on design, branding and user experience to make the store unique.",
      img: "/about.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 TITLE PRO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">

            {/* DARK MODE */}
            <span className="hidden dark:inline bg-gradient-to-r from-yellow-400 via-white to-yellow-500 bg-[length:200%] animate-[shine_4s_linear_infinite] bg-clip-text text-transparent">
              About SNOUPI
            </span>

            {/* LIGHT MODE */}
            <span className="dark:hidden bg-gradient-to-r from-yellow-500 via-black to-yellow-600 bg-[length:200%] animate-[shine_4s_linear_infinite] bg-clip-text text-transparent">
              About SNOUPI
            </span>

          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 max-w-xl mx-auto">
            We are building more than a store — we are creating a premium streetwear experience.
          </p>

          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </motion.div>

        {/* 🔥 TEAM */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">

          {team.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="
                group
                relative
                border border-yellow-500/20
                rounded-2xl overflow-hidden
                bg-white dark:bg-[#0a0a0a]

                transition duration-500
                hover:border-yellow-400
                hover:shadow-[0_0_40px_rgba(234,179,8,0.4)]
              "
            >

              {/* 🔥 IMAGE */}
              <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                <img
                  src={person.img}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500" />
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-5 space-y-4">

                {/* NAME */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-yellow-500 group-hover:scale-105 transition">
                    {person.name}
                  </h2>

                  <p className="text-xs tracking-widest text-yellow-400">
                    {person.role}
                  </p>
                </div>

                {/* DESC */}
                <p className="
                  text-sm leading-relaxed text-center
                  text-gray-600 dark:text-gray-400
                  group-hover:text-gray-800 dark:group-hover:text-gray-300
                  transition
                ">
                  {person.desc}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* 🔥 FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-20 pt-8
            border-t border-yellow-500/20
            flex flex-col items-center gap-4
          "
        >

          <img
            src="/logov.png"
            className="
              h-16 md:h-20 object-contain
              opacity-90 hover:opacity-100
              transition duration-300
              hover:scale-105
              drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]
            "
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 SNOUPI. All rights reserved.
          </p>

        </motion.div>

      </div>
    </div>
  );
}