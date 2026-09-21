import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { allProducts, imageOf, priceFor } from "../data/catalog";

function ProductPage({ p, add }) {
  const [weight, setWeight] = useState("400g");
  const price = priceFor(p, weight);
  const originalPrice = p.was ? priceFor({ price: p.was }, weight) : "";
  const related = allProducts
    .filter((item) => item.name !== p.name)
    .slice(0, 4);
  return (
    <main className="product-page">
      <section className="product-detail">
        <div className="detail-image">
          <span>{p.tag}</span>
          <img src={imageOf(p)} alt={p.name} />
        </div>
        <div className="detail-info">
          <p className="eyebrow">JHAMA SWEETS</p>
          <h1>{p.name}</h1>
          <p className="detail-price">
            {price} {originalPrice && <s>{originalPrice}</s>}
          </p>
          <p className="detail-copy">
            Crafted fresh with premium ingredients and traditional care. A
            delicious choice for gifting, celebrations, or everyday indulgence.
          </p>
          <div className="weight-picker">
            <p>SELECT WEIGHT</p>
            {["400g", "800g"].map((option) => (
              <button
                key={option}
                className={weight === option ? "selected" : ""}
                onClick={() => setWeight(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="detail-add"
            onClick={() => add({ ...p, basePrice: p.price, price, weight })}
          >
            ADD TO CART · {price}
          </button>
          <div className="detail-notes">
            <span>Freshly made, just for you</span>
            <span>Preservative-free goodness</span>
            <span>Secure checkout</span>
          </div>
        </div>
      </section>
      <section className="recommendations">
        <div className="recommendation-heading">
          <div>
            <p className="eyebrow">MORE TO EXPLORE</p>
            <h2>You may also like</h2>
          </div>
        </div>
        <div className="recommendation-grid">
          {related.map((item) => (
            <ProductCard key={item.name} p={item} add={add} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
