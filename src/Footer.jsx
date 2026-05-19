import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-600 text-white mt-10 shadow-inner sticky top-[100vh]">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        
        <div>
          <h2 className="text-2xl font-bold">MyShop</h2>
          <p className="mt-4 text-sm text-blue-100 leading-relaxed">
            Your one-stop shop for all your needs. Discover amazing products at the best prices.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/home"
                className="hover:text-yellow-300 transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="hover:text-yellow-300 transition"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlistpage"
                className="hover:text-yellow-300 transition"
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-blue-100">
            Email: support@myshop.com
          </p>
          <p className="text-sm text-blue-100 mt-2">
            Phone: +91 6446464
          </p>

          
          <div className="flex gap-4 mt-5 text-lg">
            <span className="cursor-pointer hover:text-yellow-300 transition">
              🌐
            </span>
            <span className="cursor-pointer hover:text-pink-300 transition">
              📸
            </span>
            <span className="cursor-pointer hover:text-sky-300 transition">
              🐦
            </span>
          </div>
        </div>
      </div>

      
      <div className="text-center text-sm text-blue-200 border-t border-blue-400/30 py-4">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
