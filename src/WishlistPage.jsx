import { Link } from "react-router-dom";
import { useWishlistStore, useCartStore } from "./store";
import Button from "./components/common/Button";

function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const addToCart = useCartStore((state) => state.addToCart);

  const getImage = (item) =>
    item.images?.[0] || item.img || "https://via.placeholder.com/300";

  const getTitle = (item) => item.title || item.name;

  return (
    <div className="page-container py-12 md:py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-ink tracking-tight">
        Wishlist
      </h1>
      <p className="text-ink-muted mt-2 mb-10">{wishlist.length} items saved</p>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-muted text-lg mb-6">Your wishlist is empty</p>
          <Link to="/">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="premium-card overflow-hidden">
              <Link to={`/product/${item.id}`}>
                <img
                  src={getImage(item)}
                  alt={getTitle(item)}
                  className="h-56 w-full object-cover"
                />
              </Link>
              <div className="p-5">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-ink hover:text-accent transition">
                    {getTitle(item)}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-ink mt-1">
                  ₹{item.price}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="primary"
                    className="flex-1 text-sm py-2"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-sm py-2"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
