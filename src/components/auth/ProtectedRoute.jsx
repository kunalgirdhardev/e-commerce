import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store";
import { ROLES } from "../../services/authService";
import Loader from "../common/Loader";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized || loading) {
    return <Loader fullPage label="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === ROLES.SUPERADMIN) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export function GuestRoute({ children }) {
  const { user, role, loading, initialized } = useAuthStore();

  if (!initialized || loading) {
    return <Loader fullPage />;
  }

  if (user && role) {
    if (role === ROLES.SUPERADMIN) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
