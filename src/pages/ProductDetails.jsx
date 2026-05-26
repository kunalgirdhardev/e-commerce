import { useEffect, useState, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProductById,
  subscribeProducts,
  getRelatedProducts,
} from "../services/productService";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";

const ProductViewer3D = lazy(
  () => import("../components/product/ProductViewer3D")
);

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mediaTab, setMediaTab] = useState("photos");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const data = await getProductById(id);
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
        setProduct(null);
      } else {
        setProduct(data);
        setNotFound(false);
        if (data.has3DModel && data.model3D?.url) {
          setMediaTab("3d");
        }
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    const unsubscribe = subscribeProducts(setAllProducts);
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader fullPage label="Loading product..." />;
  }

  if (notFound || !product) {
    return (
      <div className="page-container py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Product not found</h1>
        <Link to="/" className="btn-primary inline-flex mt-6">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(allProducts, product.category, product.id, 4);
  const show3D = product.has3DModel && product.model3D?.url;
  const hasImages = product.images?.length > 0;

  return (
    <div className="animate-fade-in">
      <div className="page-container py-8">
        <nav className="text-sm text-ink-muted mb-8">
          <Link to="/" className="hover:text-ink transition">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-3 space-y-4">
            {show3D && hasImages && (
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setMediaTab("3d")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    mediaTab === "3d"
                      ? "bg-ink text-white"
                      : "bg-white border border-border text-ink-muted"
                  }`}
                >
                  3D View
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTab("photos")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    mediaTab === "photos"
                      ? "bg-ink text-white"
                      : "bg-white border border-border text-ink-muted"
                  }`}
                >
                  Photos
                </button>
              </div>
            )}

            {show3D && mediaTab === "3d" ? (
              <Suspense
                fallback={
                  <div className="skeleton w-full h-[min(70vh,600px)] rounded-2xl" />
                }
              >
                <ProductViewer3D model3D={product.model3D} />
              </Suspense>
            ) : (
              <ProductGallery images={product.images} />
            )}
          </div>

          <div className="lg:col-span-2">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="page-container py-16 border-t border-border">
          <h2 className="text-2xl font-bold text-ink mb-8 tracking-tight">
            You may also like
          </h2>
          <ProductGrid products={related} loading={false} />
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
