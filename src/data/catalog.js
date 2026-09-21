// Central catalogue data. Keeping it here makes replacing it with an API later easy.
const shop = "https://www.jhamasweets.com";
export const asset = (name) =>
  `${shop}/cdn/shop/files/${name}?v=1737531624&width=1600`;
const productCdn = "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/";

export const baseProducts = [
  [
    "Gulab Jamun",
    "₹ 360.00",
    "₹ 380.00",
    "9o1a0124_fbdf0835-c562-480c-a0a8-d42fde760870_140x140.jpg",
    "BEST SELLER",
  ],
  ["Sev Barfi", "₹ 400.00", "₹ 430.00", "9o1a9873_140x140.jpg", "BEST SELLER"],
  [
    "Spec. Kaju Mix",
    "₹ 720.00",
    "₹ 780.00",
    "9o1a9857_140x140.jpg",
    "BEST SELLER",
  ],
  [
    "White Farali Chiwda",
    "₹ 380.00",
    "₹ 400.00",
    "jhma0028_1_140x140.jpg",
    "BEST SELLER",
  ],
  [
    "Mango Barfi",
    "₹ 400.00",
    "₹ 430.00",
    "9o1a9843_3ef2a158-f697-4cde-a9e5-f9aebb7b3372_140x140.jpg",
    "BEST SELLER",
  ],
  ["Kaju Katli", "₹ 620.00", "₹ 650.00", "9o1a9920_140x140.jpg", "SALE"],
  ["Kesar Kaju Modak", "₹ 672.00", "₹ 680.00", "9o1a9848_140x140.jpg", "SALE"],
  [
    "Colourful Kaju Modak",
    "₹ 672.00",
    "₹ 680.00",
    "9o1a9936_140x140.jpg",
    "SALE",
  ],
].map(([name, price, was, img, tag]) => ({ name, price, was, img, tag }));

const product = (name, price, img) => ({
  name,
  price: `₹ ${price}`,
  was: "",
  img,
  tag: "POPULAR",
});
const extraProducts = {
  sweets: [
    product(
      "Angoori Gulab Jamun",
      "360.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0121.jpg?v=1674301288",
    ),
    product(
      "Anjeer Barfi",
      "400.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9873.jpg?v=1674301421",
    ),
    product(
      "Anjeer Katli",
      "640.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9895.jpg?v=1674301399",
    ),
    product(
      "Anjeer Paak",
      "740.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9956.jpg?v=1674301305",
    ),
    product(
      "Anjeer Roll",
      "600.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9909.jpg?v=1674301374",
    ),
  ],
  namkeen: [
    product(
      "Corn Chiwda",
      "180.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9978.jpg?v=1674301237",
    ),
    product(
      "Fafda",
      "160.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/files/DSC03293.jpg?v=1728563387",
    ),
    product(
      "Kolkata Mix",
      "160.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9975_1.jpg?v=1674301234",
    ),
  ],
  dryfruits: [
    product(
      "Almonds",
      "640.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0010.jpg?v=1674301266",
    ),
    product(
      "Cashewnuts",
      "640.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0006.jpg?v=1674301274",
    ),
    product(
      "Dates",
      "360.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0031.jpg?v=1674301258",
    ),
    product(
      "Pistachio",
      "880.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0022.jpg?v=1674301270",
    ),
    product(
      "Walnuts",
      "880.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0034.jpg?v=1674301262",
    ),
  ],
  chocolates: [
    product(
      "Almond Overload",
      "740.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/b0026773.jpg?v=1674301196",
    ),
    product(
      "Dark Chocolate Hearts",
      "480.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/files/PlainDark.jpg?v=1739474369",
    ),
    product(
      "Orange Infused Hearts",
      "480.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/files/strawberry_multiplied.jpg?v=1739473204",
    ),
    product(
      "Strawberry Chocolate Hearts",
      "480.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/files/Strawberry.jpg?v=1739444539",
    ),
    product(
      "Almond Rocks",
      "660.00",
      "https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a0052.jpg?v=1674301225",
    ),
  ],
};

export const collections = {
  sweets: {
    title: "Sweets",
    intro: "Celebrate every little moment with the sweetness of tradition.",
    hero: "Jhama_Sweets_-_Sweets_Web_Banner_Desktop_Version.jpg",
    items: baseProducts
      .slice(0, 3)
      .concat(baseProducts.slice(5), extraProducts.sweets),
  },
  namkeen: {
    title: "Namkeen",
    intro: "Crisp, savoury and made for sharing.",
    hero: "Jhama_Sweets_-_Namkeen_Web_Banner_Desktop_Version.jpg",
    items: [
      baseProducts[3],
      ...extraProducts.namkeen,
      { ...baseProducts[1], name: "Dry Samosa", price: "₹ 160.00" },
      { ...baseProducts[2], name: "Mathi", price: "₹ 200.00" },
      { ...baseProducts[0], name: "Kachori", price: "₹ 280.00" },
      baseProducts[4],
      baseProducts[3],
    ],
  },
  dryfruits: {
    title: "Dry Fruits",
    intro: "Handpicked richness for mindful gifting and everyday nourishment.",
    hero: "Jhama_Sweets_-_Dry_Fruits_Web_Banner_Desktop_Version.jpg",
    items: [
      { ...baseProducts[2], name: "Premium Kaju Mix" },
      baseProducts[5],
      ...extraProducts.dryfruits,
      { ...baseProducts[4], name: "Anjeer Barfi" },
      baseProducts[6],
      baseProducts[2],
      baseProducts[5],
    ],
  },
  chocolates: {
    title: "Chocolates",
    intro: "A little indulgence, beautifully handcrafted.",
    hero: "Jhama_Sweets_-_Chocolate_Web_Banner_Desktop_Version.jpg",
    items: [
      { ...baseProducts[5], name: "Assorted Chocolates" },
      { ...baseProducts[4], name: "Chocolate Barfi" },
      baseProducts[6],
      { ...baseProducts[1], name: "Chocolate Peda" },
      baseProducts[7],
      baseProducts[5],
      ...extraProducts.chocolates,
    ],
  },
};

export const allProducts = [
  ...baseProducts,
  ...Object.values(collections).flatMap(({ items }) => items),
].filter(
  (item, index, items) =>
    items.findIndex((candidate) => candidate.name === item.name) === index,
);
const productImages = {
  "Gulab Jamun":
    "9o1a0124_fbdf0835-c562-480c-a0a8-d42fde760870.jpg?v=1674301292",
  "Sev Barfi": "9o1a9880.jpg?v=1674301416",
  "Spec. Kaju Mix": "9o1a9936.jpg?v=1674301382",
  "White Farali Chiwda": "9o1a9980.jpg?v=1674301255",
  "Mango Barfi": "9o1a9867.jpg?v=1674301438",
  "Kaju Katli": "9o1a9848.jpg?v=1674301406",
  "Kesar Kaju Modak": "kesar_kaju_modak_1.jpg?v=1674301140",
  "Colourful Kaju Modak": "colourful_1.png?v=1674301119",
  "Dry Samosa": "9o1a9986.jpg?v=1674301241",
  Mathi: "9o1a9999.jpg?v=1674301250",
  Kachori: "9o1a9989.jpg?v=1674301246",
  "Assorted Chocolates": "mix_assorted_choco_1.jpg?v=1674301046",
};
export const imageOf = (item) => {
  const image = productImages[item.name] || item.img;
  return image.startsWith("http") ? image : productCdn + image;
};
export const priceFor = (item, weight = "400g") => {
  const basePrice = Number(
    String(item.basePrice || item.price).replace(/[^\d.]/g, ""),
  );
  return `₹ ${(basePrice * (weight === "800g" ? 2 : 1)).toFixed(2)}`;
};
export const productFromUrl = () => {
  const slug = new URLSearchParams(location.search).get("product");
  return slug
    ? allProducts.find((item) =>
        item.name.toLowerCase().replaceAll(" ", "-").includes(slug),
      )
    : null;
};
export const currentScreen = () =>
  productFromUrl()
    ? "product"
    : location.pathname.slice(1) === "account"
      ? "account"
      : location.pathname.slice(1) === "checkout"
        ? "checkout"
        : location.pathname.slice(1) in collections
          ? location.pathname.slice(1)
          : "home";
