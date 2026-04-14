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

        {/* 🔥 TITLE GOLD */}
        <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    text-2xl md:text-3xl font-bold text-center
    text-yellow-500 tracking-wide
  "
>
  About BROSKY

  {/* 🔥 GOLD LINE UNDER TITLE */}
  <div className="mx-auto mt-2 h-[2px] w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
</motion.h1>
        {/* 🔥 TEAM */}
     <div className="grid md:grid-cols-2 gap-10 mt-8 md:mt-12">

          {team.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="
                group
                border border-yellow-500/20
                rounded-2xl overflow-hidden
                bg-white dark:bg-[#0a0a0a]

                h-[420px] md:h-[480px]

                flex flex-col justify-between

                transition duration-500
                hover:border-yellow-400
                hover:shadow-[0_0_35px_rgba(234,179,8,0.35)]
              "
            >

              {/* 🔥 IMAGE */}
              <div className="overflow-hidden h-[60%]">
                <img
                  src={person.img}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-5 space-y-4">

                {/* NAME BOX */}
                <div className="
                  border border-yellow-500/20
                  rounded-xl p-3 text-center
                  bg-gray-50 dark:bg-black
                ">
                  <h2 className="text-lg font-bold text-yellow-500">
                    {person.name}
                  </h2>

                  <p className="text-yellow-400 text-xs tracking-widest">
                    {person.role}
                  </p>
                </div>

                {/* DESC BOX */}
                <div className="
                  border border-yellow-500/10
                  rounded-xl p-4 text-center
                  bg-gray-50 dark:bg-black
                ">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {person.desc}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* 🔥 FOOTER GOLD */}
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
              drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]
            "
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 BLACKBOX. All rights reserved.
          </p>

        </motion.div>

      </div>
    </div>
  );
}