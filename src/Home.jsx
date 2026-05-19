import { useCartStore, useWishlistStore } from "./store";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSearchStore } from "./store";



const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);


  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="text-2xl transition-transform duration-200 hover:scale-125"
    >
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
};

function Home() {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-center text-lg font-semibold">
        Loading products...
      </p>
    );

  if (products.length === 0) {
    return <p className="p-6 text-center">No products available</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
    
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-12 shadow-md">
        <h2 className="text-4xl font-bold">Welcome to MyShop</h2>
        <p className="mt-2 text-lg">Discover amazing products </p>
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-6 mt-6">
  {["all", "electronics", "fashion", "home", "beauty"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-full font-semibold transition ${
        selectedCategory === cat
          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {cat}
    </button>
  ))}
</div>

      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       {products
  
  .filter((product) =>
    selectedCategory === "all"
      ? true
      : product.category === selectedCategory
  )
  .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .map((product) => {
          const itemInCart = cart.find((item) => item.id === product.id);

          return (
            
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden relative"
            >
            
              
              <div className="overflow-hidden">
                <img
                  src={product.img || "https://via.placeholder.com/300"}
                  className="h-75 w-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              
              <div className="absolute top-3 right-4">
                <WishlistButton product={product} />
              </div>

              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-pink-600 font-bold text-xl mt-1">
                  ₹{product.price}
                </p>

              
                {!itemInCart ? (
                  <button
                    onClick={() => addToCart(product)}

                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex justify-between items-center mt-4 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={() => decreaseQty(product.id)}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {itemInCart.qty}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(product.id)
                      
                      }
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;