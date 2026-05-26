import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import {
  subscribeProduct,
  updateProduct,
  updateProductModel3D,
} from "../../services/productService";
import { buildModel3D } from "../../constants/model3D";
import Model3DControls from "../../components/admin/Model3DControls";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const ProductViewer3D = lazy(
  () => import("../../components/product/ProductViewer3D")
);

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return subscribeProduct(id, (data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const inputClass =
    "border border-border p-3 rounded-xl focus:ring-2 focus:ring-accent/40 outline-none w-full bg-white";

  const handleFieldSave = async (fields) => {
    setSaving(true);
    try {
      await updateProduct(id, fields);
    } finally {
      setSaving(false);
    }
  };

  const handleModel3DChange = async (model3DPartial) => {
    if (!product) return;
    const url = model3DPartial.url ?? product.model3D?.url;
    const next = buildModel3D(url, model3DPartial);
    setProduct((p) => ({ ...p, model3D: next, has3DModel: true }));
    await updateProductModel3D(id, { ...model3DPartial, url });
  };

  if (loading) return <Loader label="Loading product..." />;
  if (!product) {
    return (
      <p className="text-ink-muted">
        Product not found.{" "}
        <Link to="/admin/products" className="text-accent">
          Back
        </Link>
      </p>
    );
  }

  return (
    <div className="animate-fade-in">
      <Link
        to="/admin/products"
        className="text-sm text-ink-muted hover:text-ink mb-4 inline-block"
      >
        ← Back to products
      </Link>
      <h1 className="text-3xl font-bold text-ink tracking-tight">
        Edit: {product.title}
      </h1>
      {saving && (
        <p className="text-xs text-accent mt-1">Saving changes...</p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <div className="space-y-6">
          <div className="premium-card p-6 space-y-4">
            <input
              className={inputClass}
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              onBlur={() =>
                handleFieldSave({
                  title: product.title,
                  name: product.title,
                })
              }
            />
            <textarea
              className={inputClass}
              rows={3}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              onBlur={() =>
                handleFieldSave({ description: product.description })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className={inputClass}
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
                onBlur={() => handleFieldSave({ price: product.price })}
              />
              <input
                type="number"
                className={inputClass}
                value={product.quantity}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    quantity: Number(e.target.value),
                  })
                }
                onBlur={() =>
                  handleFieldSave({ quantity: product.quantity })
                }
              />
            </div>
          </div>

          {product.has3DModel && product.model3D && (
            <Model3DControls
              model3D={product.model3D}
              onChange={handleModel3DChange}
            />
          )}

          {!product.has3DModel && (
            <div className="premium-card p-6">
              <p className="text-ink-muted text-sm mb-4">
                This product has no 3D model. Enable and set a URL to configure.
              </p>
              <Button
                variant="outline"
                onClick={async () => {
                  const url = "/models/fashion/checkshirt.glb";
                  const model3D = buildModel3D(url);
                  await updateProduct(id, { has3DModel: true, model3D });
                }}
              >
                Enable 3D with defaults
              </Button>
            </div>
          )}
        </div>

        <div>
          {product.has3DModel && product.model3D?.url ? (
            <Suspense
              fallback={
                <div className="skeleton w-full h-[400px] rounded-2xl" />
              }
            >
              <p className="text-xs text-ink-subtle mb-2 uppercase tracking-wider">
                Live preview
              </p>
              <ProductViewer3D model3D={product.model3D} />
            </Suspense>
          ) : (
            <img
              src={product.img}
              alt={product.title}
              className="w-full rounded-2xl premium-card"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
