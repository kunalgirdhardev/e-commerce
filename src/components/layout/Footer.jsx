import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-white">
      <div className="page-container py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            LUXE<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
            Curated premium products. Crafted experiences. Designed for those
            who appreciate the exceptional.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Navigate
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink to="/" className="text-white/70 hover:text-accent transition">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-white/70 hover:text-accent transition">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlistpage"
                className="text-white/70 hover:text-accent transition"
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Contact
          </h3>
          <p className="text-sm text-white/60">support@luxe.shop</p>
          <p className="text-sm text-white/60 mt-2">+91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} LUXE. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
