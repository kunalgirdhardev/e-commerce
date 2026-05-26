import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeProducts } from "../../services/productService";

function StatCard({ title, value }) {
  return (
    <div className="admin-stat-card">
      <p className="text-sm text-ink-muted">{title}</p>
      <p className="text-3xl font-bold text-ink mt-1">{value}</p>
    </div>
  );
}

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return subscribeProducts(setProducts);
  }, []);

  const categories = ["electronics", "fashion", "home", "beauty"];
  const counts = Object.fromEntries(
    categories.map((c) => [
      c,
      products.filter((p) => p.category === c).length,
    ])
  );

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-ink tracking-tight">Dashboard</h1>
      <p className="text-ink-muted mt-1 mb-8">
        Overview of your store inventory
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <StatCard title="Total products" value={products.length} />
        {categories.map((cat) => (
          <StatCard
            key={cat}
            title={cat.charAt(0).toUpperCase() + cat.slice(1)}
            value={counts[cat]}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-ink">Recent products</h2>
        <Link to="/admin/add" className="btn-primary text-sm py-2">
          Add product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 6).map((item) => (
          <Link
            key={item.id}
            to={`/admin/products/${item.id}/edit`}
            className="premium-card overflow-hidden group"
          >
            <img
              src={item.img || "https://via.placeholder.com/300"}
              alt={item.title}
              className="h-40 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-4">
              <h3 className="font-semibold text-ink line-clamp-1">
                {item.title}
              </h3>
              <p className="text-accent font-bold mt-1">₹{item.price}</p>
              <p className="text-xs text-ink-subtle mt-1">
                Stock: {item.quantity}
                {item.has3DModel && " · 3D"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
