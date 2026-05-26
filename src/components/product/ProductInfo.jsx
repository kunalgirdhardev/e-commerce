import { useCartStore } from "../../store";
import Button from "../common/Button";

function ProductInfo({ product }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const itemInCart = cart.find((item) => item.id === product.id);
  const inStock = product.quantity > 0;

  return (
    <div className="lg:sticky lg:top-24 space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-subtle capitalize">
          {product.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mt-2">
          {product.title}
        </h1>
        <p className="text-3xl font-bold text-ink mt-4">₹{product.price}</p>
      </div>

      <p className="text-ink-muted leading-relaxed">
        {product.description ||
          "Premium quality product crafted with attention to detail. Experience luxury in every use."}
      </p>

      <p className="text-sm text-ink-subtle">
        {inStock ? (
          <span className="text-green-700 font-medium">
            In stock ({product.quantity} available)
          </span>
        ) : (
          <span className="text-red-600 font-medium">Out of stock</span>
        )}
      </p>

      {!itemInCart ? (
        <Button
          variant="primary"
          className="w-full md:w-auto"
          disabled={!inStock}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      ) : (
        <div className="inline-flex items-center gap-4 bg-surface border border-border rounded-full px-4 py-2">
          <button
            type="button"
            onClick={() => decreaseQty(product.id)}
            className="w-10 h-10 rounded-full bg-ink text-white font-bold hover:opacity-80 transition"
          >
            −
          </button>
          <span className="font-semibold text-lg min-w-[2rem] text-center">
            {itemInCart.qty}
          </span>
          <button
            type="button"
            onClick={() => increaseQty(product.id)}
            className="w-10 h-10 rounded-full bg-ink text-white font-bold hover:opacity-80 transition"
          >
            +
          </button>
        </div>
      )}

      {product.has3DModel && (
        <p className="text-xs text-ink-subtle flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Interactive 3D preview available
        </p>
      )}
    </div>
  );
}

export default ProductInfo;
