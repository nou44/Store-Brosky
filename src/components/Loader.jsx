import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(onFinish, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`
      fixed inset-0 z-[9999]
      flex flex-col items-center justify-center
      bg-white dark:bg-black
      transition-all duration-700
      ${hide ? "opacity-0 scale-105" : "opacity-100 scale-100"}
    `}>

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent animate-pulse" />

      {/* LOGO */}
      <div className="relative mb-10">
        <img
          src="/logos.png"
          className="w-24 animate-logo"
        />

        {/* glow */}
        <div className="
          absolute inset-0
          bg-yellow-500/20 blur-3xl
          rounded-full
          animate-pulse
        " />
      </div>

      {/* TEXT */}
      <p className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
        LOADING EXPERIENCE
      </p>

      {/* BAR */}
      <div className="w-48 h-[3px] rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden relative">

  {/* gradient fill */}
  <div className="h-full w-full animate-loading bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300" />

  {/* moving shine */}
  <div className="absolute top-0 left-0 h-full w-24 bg-white/40 blur-md animate-shine" />

</div>

    </div>
  );
}