import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopLayout from "../components/layout/ShopLayout";
import AdminLayout from "../components/layout/AdminLayout";
import Loader from "../components/common/Loader";
import { ProtectedRoute, GuestRoute } from "../components/auth/ProtectedRoute";
import { ROLES } from "../services/authService";
import { useAuthStore } from "../store";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AddProduct from "../pages/admin/AddProduct";
import ProductEdit from "../pages/admin/ProductEdit";

const Home = lazy(() => import("../pages/Home"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../Cart"));
const WishlistPage = lazy(() => import("../WishlistPage"));
const OrderConfirmed = lazy(() => import("../pages/OrderConfirmed"));

function LazyRoute({ children }) {
  return <Suspense fallback={<Loader fullPage />}>{children}</Suspense>;
}

function AuthInit({ children }) {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    const unsubscribe = initAuth();
    return unsubscribe;
  }, [initAuth]);

  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthInit>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute allowedRoles={[ROLES.USER]}>
                <ShopLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <LazyRoute>
                  <Home />
                </LazyRoute>
              }
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="product/:id"
              element={
                <LazyRoute>
                  <ProductDetails />
                </LazyRoute>
              }
            />
            <Route
              path="cart"
              element={
                <LazyRoute>
                  <Cart />
                </LazyRoute>
              }
            />
            <Route
              path="wishlistpage"
              element={
                <LazyRoute>
                  <WishlistPage />
                </LazyRoute>
              }
            />
            <Route
              path="order-confirmed"
              element={
                <LazyRoute>
                  <OrderConfirmed />
                </LazyRoute>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/:id/edit" element={<ProductEdit />} />
            <Route path="add" element={<AddProduct />} />
          </Route>

          <Route path="/superadmin/*" element={<Navigate to="/admin" replace />} />
          <Route path="/adminlogin" element={<Navigate to="/login" replace />} />
          <Route path="/signuppage" element={<Navigate to="/signup" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthInit>
    </BrowserRouter>
  );
}
