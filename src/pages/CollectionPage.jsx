import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { asset, collections } from "../data/catalog";
import { Ticker } from "./HomePage";

function CollectionPage({ id, add }) {
  let c = collections[id];
  let items = c.items.concat(c.items.slice(0, 2));
  return (
    <main className="collection">
      <section className="collection-hero">
        <img src={asset(c.hero)} alt={c.title} />
        <div>
          <p className="eyebrow">JHAMA COLLECTIONS</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      <Ticker />
      <section className="collection-products">
        <div className="collection-title">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>{c.title}</h2>
            <p>{c.items.length} products</p>
          </div>
          <button className="filter">
            <SlidersHorizontal size={16} /> FILTER & SORT
          </button>
        </div>
        <div className="catalog-grid">
          {items.map((p, i) => (
            <ProductCard p={p} add={add} key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CollectionPage;
