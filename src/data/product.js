const products = [
  {
    id: 1,
    name: "Premium Over Shirt",
    shortName: "Oversized Tee",
    price: 550,
    oldPrice: 700,
    category: "outfit",
    badge: "sale",

    rating: 4.5,
    reviews: 120,

    description: "High-quality oversized t-shirt made from soft cotton.",

    images: {
      black: {
        main: "/brosky shirt black.png",
        hover: "/brosky shirt.png"
      },
      white: {
        main: "/brosky shirt.png",
        hover: "//brosky shirt black.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 12
  },

  {
    id: 2,
    name: "Nike Air Sneakers",
    shortName: "Nike Shoes",
    price: 599,
    oldPrice: null,
    category: "shoes",
    badge: "new",

    rating: 4.8,
    reviews: 320,

    description: "Comfortable and stylish sneakers.",

    images: {
      black: {
        main: "/Shooes black 2.png",
        hover: "/shoes1.jpg"
      }
    },

    sizes: ["40", "41", "42"],
    stock: 8
  },

  {
    id: 3,
    name: "Streetwear Hoodie",
    shortName: "Brosky Hoodie",
    price: 199,
    oldPrice: 299,
    category: "outfit",
    badge: "sale",

    rating: 4.3,
    reviews: 90,

    description: "Trendy hoodie for streetwear.",

    images: {
      black: {
        main: "/Sweat a caputcho black.png",
        hover: "/Sweat a caputcho black.png"
      },
      white: {
        main: "/Sweat a capuche BROSKy white.png",
        hover: "/Sweat a capuche BROSKy white.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 20
  },

  {
    id: 4,
    name: "Classic Cotton T-Shirt",
    shortName: "Classic Tee",
    price: 199,
    oldPrice: null,
    category: "outfit",
    badge: null,

    rating: 4.0,
    reviews: 60,

    description: "Simple cotton t-shirt.",

    images: {
      black: {
        main: "/outfit black ct.png",
        hover: "/outfit black ct.png"
      },
      white: {
        main: "/outfite white ct.png",
        hover: "/outfite white ct.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 15
  },

  {
    id: 5,
    name: "Bomber Jacket",
    shortName: "Bomber",
    price: 299,
    oldPrice: 399,
    category: "outfit",
    badge: "sale",

    rating: 4.2,
    reviews: 70,

    description: "Stylish bomber jacket.",

    images: {
      red: {
        main: "/Veste bomber rouge.png",
        hover: "/Veste bomber rouge.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 10
  },

  {
    id: 6,
    name: "Nike Air Sneakers",
    shortName: "Nike Shoes",
    price: 599,
    oldPrice: null,
    category: "shoes",
    badge: "new",

    rating: 4.8,
    reviews: 320,

    description: "Comfortable sneakers.",

    images: {
      black: {
        main: "/Soes black.png",
        hover: "/Soes black.png"
      },
      white: {
        main: "/Shoes white.png",
        hover: "/Shoes white.png"
      }
    },

    sizes: ["40", "41", "42"],
    stock: 8
  },

  {
    id: 7,
    name: "Denim Jeans",
    shortName: "Jeans",
    price: 299,
    oldPrice: null,
    category: "outfit",
    badge: null,

    rating: 4.0,
    reviews: 60,

    description: "Classic jeans.",

    images: {
      blue: {
        main: "/Jeans.png",
        hover: "/Jeans.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 15
  },

  {
    id: 8,
    name: "Classic Caps",
    shortName: "Caps",
    price: 199,
    oldPrice: null,
    category: "caps",
    badge: "hot",

    rating: 4.0,
    reviews: 60,

    description: "Clean cotton caps.",

    images: {
      white: {
        main: "/white caps.png",
        hover: "/white caps.png"
      },
      black: {
        main: "/black caps 1.png",
        hover: "/black caps 1.png"
      }
    },

    sizes: ["S", "M", "L"],
    stock: 15
  }
];

export default products;