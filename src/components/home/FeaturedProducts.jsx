import { useState } from "react";
import ProductGrid from "../product/ProductGrid";

const CATEGORIES = ["all", "electronics", "fashion", "home", "beauty"];

function FeaturedProducts({ products, loading, searchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = products
    .filter((p) =>
      selectedCategory === "all" ? true : p.category === selectedCategory
    )
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section id="products" className="page-container py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-subtle mb-2">
            Curated for you
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Featured Products
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                selectedCategory === cat
                  ? "bg-ink text-white"
                  : "bg-white border border-border text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid products={filtered} loading={loading} />
    </section>
  );
}

export default FeaturedProducts;
