import React from "react";
import { useWishlistStore } from "./store";
import { useCartStore } from "./store";
import Header from "./Header";
import Footer from "./Footer";

function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <h1 className="text-3xl font-bold mb-6 text-center mt-6">
        ❤️ My Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">
              <img
                src={item.img}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <p className="text-pink-600 font-bold">₹{item.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                  className="flex-1 bg-green-500 text-white py-2 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default WishlistPage;