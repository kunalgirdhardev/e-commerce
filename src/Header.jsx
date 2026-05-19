import React from "react";
import { NavLink } from "react-router-dom";
import { useCartStore, useWishlistStore } from "./store";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useSearchStore } from "./store";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth} from "firebase/auth";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlist.length;
  const navigate = useNavigate();
  const auth= getAuth();


  const handleClick = () => {
    setSearchTerm("");  
    setSuggestions([]);
    navigate("/home");
  };

  
    
  
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


    const handleLogout = async () => {
      await signOut(auth);
      navigate("/");
    };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      
      <button className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 tracking-wide cursor-pointer" onClick={handleClick}>
        MyShop
      </button>

      
      <div className="relative ml-37">
        <input
          type="text"
          placeholder="Search products..."
          
          onChange={(e) => {
  const value = e.target.value;

  if (value) {
    setSuggestions(
      products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  } else {
    setSuggestions([]);
  }
}}
          className="bg-gray-100 placeholder:text-gray-500 text-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full px-4 py-2 w-64 transition duration-300"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </span>
        

        {suggestions.length > 0 && (
          <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
            {suggestions.map((product, index) => (
              <p
  key={index}
  onClick={() => {
    setSearchTerm(product.name);
    setSuggestions([]);
  }}
  className="text-sm text-pink-700 hover:bg-pink-200 p-2 cursor-pointer"
>
  {product.name}
</p>
            ))}
          </div>
        )}

      </div>






      
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        
        
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-purple-600 transition ${
              isActive ? "text-purple-600 font-semibold" : ""
            }`
          }
        >
          🏠 Home
        </NavLink>

        
        <div className="relative">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-purple-600 transition ${
                isActive ? "text-purple-600 font-semibold" : ""
              }`
            }
          >
            🛒 Cart
          </NavLink>

          
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold shadow">
              {totalItems}
            </span>
          )}
        </div>

        
        <div className="relative">
          <NavLink
            to="/wishlistpage"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-pink-500 transition ${
                isActive ? "text-pink-500 font-semibold" : ""
              }`
            }
          >
            ❤️ Wishlist
          </NavLink>

          
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold shadow">
              {wishlistCount}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 py-2 rounded-lg font-semibold hover:text-pink-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;