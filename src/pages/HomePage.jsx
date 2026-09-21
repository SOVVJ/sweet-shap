import { ArrowUpRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { asset, baseProducts } from "../data/catalog";

export function Ticker() {
  return (
    <div className="ticker">
      <div>
        • Freshly made, just for you　• Experience unmatched freshness with our
        MAP packaging　• Preservative-free goodness　• Freshly made, just for
        you　• Experience unmatched freshness with our MAP packaging　
      </div>
    </div>
  );
}
function Category({ id, title, image, go }) {
  return (
    <button className="category" onClick={() => go(id)}>
      <img
        src={
          image.startsWith("http") || image.startsWith("/")
            ? image
            : asset(image)
        }
        alt={title}
      />
      <div>
        <h3>{title}</h3>
        <span>
          SHOP ALL <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  );
}
function Rail({ title, copy, items, add, go }) {
  return (
    <section className="rail">
      <div className="rail-head">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{copy}</h2>
        </div>
        <button onClick={() => go("sweets")}>
          VIEW ALL <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="product-grid">
        {items.map((p, i) => (
          <ProductCard key={i} p={p} add={add} />
        ))}
      </div>
    </section>
  );
}
function HomePage({ go, add }) {
  return (
    <main>
      <section className="hero">
        <img
          src={asset("Jhama-Web_Ganeshotsav_Banner_1_V1.jpg")}
          alt="Ganeshotsav modak celebration"
        />
      </section>
      <Ticker />
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          <Category
            id="sweets"
            title="Sweets"
            image="https://cdn.shopify.com/s/files/1/0707/2409/2203/products/9o1a9880.jpg?v=1674301416"
            go={go}
          />
          <Category
            id="namkeen"
            title="Namkeen"
            image="namkeen_2024.jpg"
            go={go}
          />
          <Category
            id="dryfruits"
            title="Dryfruits"
            image="/images/dryfruits-category.png"
            go={go}
          />
          <Category
            id="chocolates"
            title="Chocolates"
            image="assorted_chocolated_round_pic.jpg"
            go={go}
          />
        </div>
      </section>
      <section className="pride">
        <img src={asset("sindi_collection_banner.jpg")} alt="Sindhi sweets" />
        <div>
          <p className="eyebrow">A TASTE OF HOME</p>
          <h2>
            Discover Our
            <br />
            <i>Sindhi Pride</i> Selection
          </h2>
          <p>
            We celebrate our culinary heritage with an exquisite array of
            authentic, traditional sweets.
          </p>
          <button onClick={() => go("sweets")}>
            VIEW PRODUCTS <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
      <Rail
        title="NEW IN"
        copy="Taste tradition, explore our new collection."
        items={baseProducts.slice(5)}
        add={add}
        go={go}
      />
      <section className="discount">
        • SPEND ₹1499 AND GET A FLAT 10% OFF •
      </section>
      <Rail
        title="TOP SELLERS"
        copy="Explore our highly-rated bestsellers."
        items={baseProducts.slice(0, 5)}
        add={add}
        go={go}
      />
      <section className="look">
        <img src={asset("namkeen_2024.jpg")} alt="Find your go-to namkeen" />
        <div>
          <p className="eyebrow">SHOP THE LOOK</p>
          <h2>
            Find Your
            <br />
            Go-To Namkeen
          </h2>
          <button onClick={() => go("namkeen")}>SHOP NOW</button>
        </div>
      </section>
      <Heritage />
    </main>
  );
}
function Heritage() {
  return (
    <>
      <section className="heritage">
        <div>
          <p className="eyebrow">EST. 1948</p>
          <h2>Our Journey</h2>
          <p>
            Jhama Sweets, Mumbai’s fondest Indian sweets brand, was established
            in the 1950s. Our pillars stand strong on the hard work and
            eagerness of delivering never-ending sweetness.
          </p>
          <p>
            From our flagship store in Chembur Camp to homes around the world,
            every sweet is rooted in a tradition that feels like home.
          </p>
          <button>
            READ MORE <ArrowUpRight size={16} />
          </button>
        </div>
        <img src={asset("legacy_1948.jpg")} alt="Jhama Sweets heritage" />
      </section>
      <section className="values">
        <div>
          <b>01</b>
          <h3>Building a legacy of excellence in Indian sweets since 1948.</h3>
          <p>
            For over seven decades, we have dedicated ourselves to crafting the
            finest sweets.
          </p>
        </div>
        <div>
          <b>02</b>
          <h3>Crafting sweet memories with the best Indian artisans.</h3>
          <p>
            Each sweet and namkeen is crafted passionately with heritage
            techniques.
          </p>
        </div>
        <div>
          <b>03</b>
          <h3>Trusted by over 1 million happy customers.</h3>
          <p>
            Our commitment to quality has earned us the loyalty of families
            everywhere.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
