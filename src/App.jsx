import Header from "./Header";
import Home from "./Home";
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Wishlist from "./WishlistPage";
import Signuppage from "./Signuppage";
import "./index.css";
import Footer from "./Footer";

import AdminLogin from "./AdminLogin.jsx";
import ProtectedAdmin from "./ProtectedAdmin.jsx";
import AdminLayout from "./AdminLayout.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AddProduct from "./AddProduct.jsx";

import {app} from "./firebase.js"
import Frontpage from "./frontpage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/signuppage" element={<Signuppage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
         
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlistpage" element={<Wishlist />} />
          <Route path="/superadmin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
