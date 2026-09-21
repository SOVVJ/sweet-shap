import { useState } from "react";
import { imageOf, priceFor } from "../data/catalog";

function ProductCard({ p, add }) {
  const [weight, setWeight] = useState("400g"),
    displayPrice = priceFor(p, weight),
    displayWas = p.was ? priceFor({ price: p.was }, weight) : "",
    cartItem = () => ({
      ...p,
      basePrice: p.basePrice || p.price,
      price: displayPrice,
      weight,
    });
  return (
    <article className="product-card">
      <div className="product-image">
        <button
          className="product-link"
          onClick={() => openProduct(p)}
          aria-label={`View ${p.name}`}
        >
          <img src={imageOf(p)} alt={p.name} />
        </button>
        <span>{p.tag}</span>
      </div>
      <div className="product-info">
        <button className="product-name" onClick={() => openProduct(p)}>
          {p.name}
        </button>
        <p>
          From <b>{displayPrice}</b> {displayWas && <s>{displayWas}</s>}
        </p>
        <div className="product-actions">
          <select
            aria-label={`${p.name} weight`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="400g">400g</option>
            <option value="800g">800g</option>
          </select>
          <button onClick={() => add(cartItem())}>ADD TO CART</button>
        </div>
      </div>
    </article>
  );
}
function openProduct(p) {
  const slug = p.name.toLowerCase().replaceAll(" ", "-");
  history.pushState({}, "", `/?product=${encodeURIComponent(slug)}`);
  dispatchEvent(new PopStateEvent("popstate"));
  scrollTo({ top: 0, behavior: "instant" });
}

export default ProductCard;
