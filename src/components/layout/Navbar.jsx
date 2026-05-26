import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore, useWishlistStore, useSearchStore } from "../../store";
import { subscribeProducts } from "../../services/productService";
import { logOut } from "../../services/authService";

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const unsubscribe = subscribeProducts(setProducts);
    return () => unsubscribe();
  }, []);

  const handleLogoClick = () => {
    setSearchTerm("");
    setSuggestions([]);
    setQuery("");
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setSuggestions(
        products.filter((p) =>
          p.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setSuggestions([]);
    setQuery(product.title);
    navigate("/");
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
    }`;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-border-subtle">
      <div className="page-container flex items-center justify-between h-16 gap-6">
        <button
          type="button"
          onClick={handleLogoClick}
          className="text-xl font-bold tracking-tight text-ink shrink-0"
        >
          LUXE<span className="text-accent">.</span>
        </button>

        <div className="relative flex-1 max-w-md hidden sm:block">
          <input
            type="text"
            value={query}
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="w-full bg-white/80 border border-border rounded-full px-5 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
          />
          {suggestions.length > 0 && (
            <div className="absolute mt-2 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden z-20">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full text-left text-sm text-ink px-4 py-2.5 hover:bg-surface transition"
                >
                  {product.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <NavLink to="/" end className={linkClass}>
            Shop
          </NavLink>

          <div className="relative">
            <NavLink to="/cart" className={linkClass}>
              Cart
            </NavLink>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] flex items-center justify-center bg-ink text-white text-[10px] font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          <div className="relative">
            <NavLink to="/wishlistpage" className={linkClass}>
              Wishlist
            </NavLink>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-ink text-[10px] font-bold rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-ink-muted hover:text-ink transition hidden md:block"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
