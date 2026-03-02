const products = [
  {
    name: "Classic Hoodie",
    description: "Premium cotton hoodie with relaxed fit.",
    price: 59.99,
    category: "hoodies",
    gender: "men",
    images: [
      "/uploads/products/hoodie-black-man-1.png",
      "/uploads/products/hoodie-black-man-2.png",
      "/uploads/products/hoodie-black-man-3.png"
    ],
    isActive: true,
    rating: 0,
    numReviews: 0,
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 },
    ],
  },
  {
    name: "Slim Fit T-Shirt",
    description: "Soft breathable fabric for everyday wear.",
    price: 29.99,
    category: "tshirts",
    gender: "women",
    images:[
      "/uploads/products/hoodie-black-man-1.png",
      "/uploads/products/hoodie-black-man-2.png",
      "/uploads/products/hoodie-black-man-3.png"
    ],
    isActive: true,
    rating: 0,
    numReviews: 0,
    sizes: [
      { size: "XS", stock: 7 },
      { size: "S", stock: 12 },
      { size: "M", stock: 9 },
      { size: "L", stock: 6 },
    ],
  },
];

module.exports = products;