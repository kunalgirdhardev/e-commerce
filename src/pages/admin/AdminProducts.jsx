import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { subscribeProducts } from "../../services/productService";
import Button from "../../components/common/Button";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    return subscribeProducts(setProducts);
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
  };

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ink tracking-tight">
            Products
          </h1>
          <p className="text-ink-muted mt-1">{products.length} total</p>
        </div>
        <Link to="/admin/add">
          <Button variant="primary">Add product</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["all", "electronics", "fashion", "home", "beauty"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              category === cat
                ? "bg-ink text-white"
                : "bg-white border border-border text-ink-muted hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="p-4 font-semibold text-ink">Product</th>
                <th className="p-4 font-semibold text-ink">Category</th>
                <th className="p-4 font-semibold text-ink">Price</th>
                <th className="p-4 font-semibold text-ink">Stock</th>
                <th className="p-4 font-semibold text-ink">3D</th>
                <th className="p-4 font-semibold text-ink text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border-subtle hover:bg-surface/50 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.img || "https://via.placeholder.com/48"}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium text-ink line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-ink-muted capitalize">
                    {item.category}
                  </td>
                  <td className="p-4 font-semibold">₹{item.price}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">
                    {item.has3DModel ? (
                      <span className="text-accent text-xs font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-ink-subtle">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      to={`/admin/products/${item.id}/edit`}
                      className="text-ink hover:text-accent font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProduct(item.id)}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-ink-muted">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
