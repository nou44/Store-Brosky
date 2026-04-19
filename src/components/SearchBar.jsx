import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ search, setSearch }) {
  const [open, setOpen] = useState(false);
const navigate = useNavigate();
  return (
    <div className="flex items-center ml-2">

      {/* 🔍 ICON (mobile) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            md:hidden
            p-2
            rounded-full

            bg-white dark:bg-[#111]

            border border-gray-300 dark:border-gray-800

            hover:border-yellow-500/50
            hover:bg-gray-100 dark:hover:bg-[#1a1a1a]

            transition-all duration-200
          "
        >
          <Search
            size={17}
            className="text-gray-600 dark:text-gray-400"
          />
        </button>
      )}

      {/* 📱 MOBILE INPUT */}
      {open && (
        <div className="md:hidden relative w-[160px] ml-2">

          <input
            autoFocus
            type="text"
            placeholder="Search..."
            onChange={(e) => {
  setSearch(e.target.value);
  navigate(`/products?search=${e.target.value}`);
}}
            className="
              w-full

              bg-white dark:bg-[#111]
              text-black dark:text-white

              pl-8 pr-7 py-1.5
              rounded-full
              text-xs

              border border-gray-300 dark:border-gray-800

              placeholder:text-gray-400 dark:placeholder:text-gray-500

              focus:outline-none
              focus:border-yellow-500

              transition-all duration-200
            "
          />

          {/* 🔍 icon */}
          <Search
            size={14}
            className="
              absolute left-2.5 top-1/2 -translate-y-1/2
              text-gray-500 dark:text-gray-400
            "
          />

          {/* ❌ close */}
          <X
            onClick={() => setOpen(false)}
            size={13}
            className="
              absolute right-2 top-1/2 -translate-y-1/2

              text-gray-400 dark:text-gray-500
              hover:text-black dark:hover:text-white

              cursor-pointer
              transition
            "
          />
        </div>
      )}

      {/* 💻 DESKTOP INPUT */}
      <div className="hidden md:block relative w-56 ml-2">
        <input
          type="text"
          placeholder="Search..."
      onChange={(e) => {
  setSearch(e.target.value);
  navigate(`/products?search=${e.target.value}`);
}}
          className="
            w-full

            bg-white dark:bg-[#111]
            text-black dark:text-white

            pl-9 pr-3 py-2
            rounded-full
            text-sm

            border border-gray-300 dark:border-gray-800

            placeholder:text-gray-400 dark:placeholder:text-gray-500

            focus:outline-none
            focus:border-yellow-500

            transition-all duration-200
          "
        />

        <Search
          size={16}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-gray-500 dark:text-gray-400
          "
        />
      </div>

    </div>
  );
}