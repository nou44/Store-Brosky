import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/product";
import { useCart } from "../context/CartContext";

export default function YouMayAlsoLike() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // 🔥 FLY ANIMATION (مصلوحة)
  const flyToCart = (imgSrc, e) => {
    if (!window.cartIcon) return;

    const img = document.createElement("img");
    img.src = imgSrc;

    let start;

    // 👇 فرق بين card و popup
    const card = e.currentTarget.closest(".product-card");

    if (card) {
      start = card.querySelector("img").getBoundingClientRect();
    } else {
      // 👇 popup
      start = e.currentTarget
        .closest("div")
        .querySelector("img")
        .getBoundingClientRect();
    }

    const end = window.cartIcon.getBoundingClientRect();

    img.style.position = "fixed";
    img.style.left = start.left + "px";
    img.style.top = start.top + "px";
    img.style.width = start.width + "px";
    img.style.height = start.height + "px";
    img.style.objectFit = "cover";
    img.style.zIndex = 9999;
    img.style.transition = "all 0.7s cubic-bezier(0.22,1,0.36,1)";
    img.style.borderRadius = "12px";

    document.body.appendChild(img);

    setTimeout(() => {
      img.style.left = end.left + "px";
      img.style.top = end.top + "px";
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.opacity = "0.3";
    }, 10);

    setTimeout(() => {
      img.remove();
      window.triggerCartAnimation?.();
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">

      {/* TITLE */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">You may also like</h2>
        <div className="h-[2px] w-16 bg-yellow-500 mt-1" />
      </div>

      {/* SCROLL */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

        {products.map((p) => {
          const firstColor = Object.keys(p.images)[0];
          const mainImg = p.images[firstColor]?.main;

          return (
            <div
              key={p.id}
              className="product-card
                min-w-[190px]
                bg-white dark:bg-[#111]
                rounded-2xl overflow-hidden
                border border-gray-200 dark:border-yellow-500/20
                transition duration-300
                hover:border-yellow-400
                hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]
              "
            >

              {/* IMAGE */}
              <div
                onClick={() => navigate(`/product/${p.id}`)}
                className="relative cursor-pointer group overflow-hidden"
              >
                <img
                  src={mainImg}
                  className="w-full h-44 object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-3">

                <h3
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="font-semibold text-sm cursor-pointer hover:text-yellow-500 transition"
                >
                  {p.name}
                </h3>

                <div className="flex gap-2 mt-1 items-center">
                  <span className="text-red-500 font-bold">
                    {p.price} DH
                  </span>
                </div>

                {/* 🔥 BUTTON 1 (غير popup) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedProduct(p);
                    setSelectedColor(firstColor);
                    setSelectedSize(p.sizes[0]);
                  }}
                  className="mt-3 w-full py-2 rounded-xl bg-yellow-500 text-black font-semibold hover:scale-105 transition"
                >
                  Add to cart
                </button>

              </div>
            </div>
          );
        })}

      </div>

      {/* 🔥 TOAST */}
      {addedId && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-3 rounded-xl shadow-lg z-[999]">
          Product added to cart 🛒
        </div>
      )}

      {/* 🔥 POPUP */}
 {selectedProduct && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">

    <div
      className="
        bg-white dark:bg-[#111]
        rounded-2xl

        w-[85%] sm:w-[360px]
        max-w-[380px]

        p-4
        relative

        shadow-2xl
        border border-white/10

        animate-[scaleIn_.25s_ease]
      "
    >

      {/* ❌ CLOSE */}
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-3 right-3 text-lg hover:text-red-500 transition"
      >
        ✕
      </button>

      {/* 🖼️ IMAGE */}
      <div className="w-full h-[140px] sm:h-[160px] flex items-center justify-center bg-gray-100 dark:bg-black rounded-xl mb-3 overflow-hidden">
        <img
          src={selectedProduct.images[selectedColor]?.main}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* 🏷️ NAME */}
      <h3 className="font-semibold text-sm mb-1">
        {selectedProduct.name}
      </h3>

      {/* 💰 PRICE */}
      <p className="text-red-500 font-bold text-sm mb-3">
        {selectedProduct.price} DH
      </p>

      {/* 🎨 COLORS */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {Object.keys(selectedProduct.images).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`
              px-2 py-1 rounded-full border text-xs capitalize
              transition

              ${selectedColor === c
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-gray-300 dark:border-gray-700 hover:border-yellow-400"}
            `}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 📏 SIZES */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {selectedProduct.sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSize(s)}
            className={`
              px-2 py-1 rounded-full border text-xs
              transition

              ${selectedSize === s
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-gray-300 dark:border-gray-700 hover:border-yellow-400"}
            `}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 🔥 ADD TO CART (animation stays) */}
      <button
        onClick={(e) => {
          flyToCart(
            selectedProduct.images[selectedColor]?.main,
            e
          );

          addToCart({
            ...selectedProduct,
            color: selectedColor,
            size: selectedSize,
            qty: 1
          });

          setAddedId(selectedProduct.id);
          setSelectedProduct(null);

          setTimeout(() => {
            setAddedId(null);
          }, 1500);
        }}
        className="
          w-full py-2.5 rounded-xl text-sm font-semibold

          bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
          text-black

          hover:scale-105 transition
          shadow-md hover:shadow-yellow-500/40
        "
      >
        Add to cart
      </button>

      {/* 🔥 BUY NOW */}
      <button
        onClick={() => {
          navigate("/checkout", {
            state: {
              product: selectedProduct,
              color: selectedColor,
              size: selectedSize,
            },
          });
        }}
        className="
          w-full mt-2 py-2.5 rounded-xl text-sm font-semibold

          bg-red-500 text-white
          hover:scale-105 transition
        "
      >
        Buy it now
      </button>

    </div>
  </div>
)}

    </div>
  );
}