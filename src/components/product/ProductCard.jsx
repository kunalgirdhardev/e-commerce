import { memo } from "react";
import { Link } from "react-router-dom";
import { useCartStore, useWishlistStore } from "../../store";
import Button from "../common/Button";

function ProductCard({ product }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const itemInCart = cart.find((item) => item.id === product.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const imageUrl = product.images?.[0] || product.img || "https://via.placeholder.com/400";

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article className="premium-card group overflow-hidden animate-fade-in">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="overflow-hidden aspect-[4/5] bg-border-subtle">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <button
          type="button"
          onClick={toggleWishlist}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-lg hover:scale-110 transition-transform z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs uppercase tracking-widest text-ink-subtle mb-1">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-ink line-clamp-1 hover:text-accent transition">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-ink mt-1">₹{product.price}</p>
        </Link>

        {!itemInCart ? (
          <Button
            variant="primary"
            className="w-full mt-4 text-sm py-2.5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex justify-between items-center mt-4 bg-surface rounded-full px-3 py-2 border border-border">
            <button
              type="button"
              onClick={() => decreaseQty(product.id)}
              className="w-8 h-8 rounded-full bg-ink text-white text-sm font-bold hover:opacity-80 transition"
            >
              −
            </button>
            <span className="font-semibold text-ink">{itemInCart.qty}</span>
            <button
              type="button"
              onClick={() => increaseQty(product.id)}
              className="w-8 h-8 rounded-full bg-ink text-white text-sm font-bold hover:opacity-80 transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
