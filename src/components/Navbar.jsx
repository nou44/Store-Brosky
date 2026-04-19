import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import CartIcon from "../components/CartIcon";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const navigate = useNavigate();

  // ✅ user (reactive)
  const [user, setUser] = useState(localStorage.getItem("user"));

  // 🔥 listen for login/logout changes
  useEffect(() => {
    const updateUser = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("userChanged", updateUser);

    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

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

  // 🔥 logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    // 🔥 notify app
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <>
      <TopBar />

      <div className="
        bg-white dark:bg-black text-black dark:text-white
        sticky top-[36px] z-50
        border-b border-gray-200 dark:border-yellow-500/40
      ">

     <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-2">

    {/* LOGO */}
    <Link to="/" className="flex items-center group">
      <img 
        src="/logos.png" 
        className="
          h-12 object-contain
          transition duration-300
          group-hover:scale-110
          group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]
        "
      />
    </Link>

    {/* SEARCH 👇 */}
    <SearchBar />

  </div>


          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <CartIcon />

            {/* DESKTOP */}
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

              {/* DARK MODE */}
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

              {/* 🔐 LOGIN / LOGOUT */}
              {!user ? (
                <Link
                  to="/login"
                  className="
                    px-4 py-1.5 text-sm font-semibold
                    border border-yellow-500/40
                    text-yellow-500
                    rounded-lg

                    hover:bg-yellow-500
                    hover:text-black
                    hover:shadow-[0_0_12px_rgba(234,179,8,0.5)]
                    transition duration-300
                  "
                >
                  Admin
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="
                    px-4 py-1.5 text-sm font-semibold
                    border border-red-500/40
                    text-red-500
                    rounded-lg

                    hover:bg-red-500
                    hover:text-white
                    hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]
                    transition duration-300
                  "
                >
                  Logout
                </button>
              )}

            </div>

            {/* MOBILE BUTTON */}
          {/* MOBILE BUTTON */}
<button
  onClick={(e) => {
    e.stopPropagation();
    setOpen(!open);
  }}
  className="
    md:hidden
    w-12 h-12 flex items-center justify-center
    rounded-xl

    text-2xl font-bold

    transition duration-300

    hover:bg-gray-100 dark:hover:bg-white/10
    active:scale-95
  "
>
  <span
    className={`
      transition-all duration-300 flex items-center justify-center
      ${open 
        ? "rotate-90 text-yellow-500 scale-110 text-2xl" 
        : "rotate-0 text-black dark:text-white scale-100 text-4xl"}
    `}
  >
    {open ? "✕" : "≡"}
  </span>
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
              animate-fadeIn
            "
          >
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/location" onClick={() => setOpen(false)}>Location</Link>

            {/* 🔐 LOGIN / LOGOUT MOBILE */}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-yellow-500 font-semibold"
              >
                Admin
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold text-left"
              >
                Logout
              </button>
            )}

            {/* DARK MODE */}
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