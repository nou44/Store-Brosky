import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import CartIcon from "../components/CartIcon";
export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // 🔥 close when click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

return (
  <>
    {/* 🔴 TOP BAR */}
    <TopBar />

    {/* 🔥 NAVBAR */}
    <div className="
      bg-white dark:bg-black text-black dark:text-white
      sticky top-[36px] z-50
      border-b border-gray-200 dark:border-yellow-500/40
    ">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* 🔥 LOGO */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logov.png" 
            className="
              h-12 object-contain
              transition duration-300
              group-hover:scale-110
              group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]
            "
          />
        </Link>

        {/* 🔥 RIGHT SIDE (DESKTOP + MOBILE ICONS) */}
        <div className="flex items-center gap-4">

          {/* 🛒 CART (كيبان فكلشي) */}
          <CartIcon />

          {/* 🔥 DESKTOP MENU */}
          <div className="hidden md:flex gap-8 items-center">

            {["/", "/products", "/about", "/contact", "/location"].map((path, i) => {
              const names = ["Home", "Products", "About", "Contact", "Location"];

              return (
                <Link key={i} to={path} className="relative group">
                  {names[i]}

                  <span className="
                    absolute left-0 -bottom-1 w-0 h-[2px]
                    bg-yellow-500 dark:bg-white
                    transition-all duration-300
                    group-hover:w-full
                  " />
                </Link>
              );
            })}

            {/* 🌙 DARK MODE */}
            <div
              onClick={() => setDark(!dark)}
              className={`
                w-12 h-6 flex items-center rounded-full p-1 cursor-pointer
                ${dark ? "bg-yellow-500" : "bg-gray-300"}
              `}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full transform transition
                  ${dark ? "translate-x-6" : ""}
                `}
              />
            </div>

          </div>

          {/* 📱 MOBILE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            style={{
              color: open ? "#eab308" : (dark ? "#ffffff" : "#000000")
            }}
            className="md:hidden text-2xl font-bold"
          >
            {open ? "X" : "≡"}
          </button>

        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div
          ref={menuRef}
          className="
            md:hidden
            flex flex-col gap-5 p-5
            bg-white dark:bg-black
            border-t border-yellow-500/30
          "
        >
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/location" onClick={() => setOpen(false)}>Location</Link>

          {/* 🌙 DARK MODE */}
          <div
            onClick={() => setDark(!dark)}
            className={`
              w-12 h-6 flex items-center rounded-full p-1 cursor-pointer
              ${dark ? "bg-yellow-500" : "bg-gray-300"}
            `}
          >
            <div
              className={`
                w-5 h-5 bg-white rounded-full transform transition
                ${dark ? "translate-x-6" : ""}
              `}
            />
          </div>
        </div>
      )}

    </div>
  </>
);
}