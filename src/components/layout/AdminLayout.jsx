import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../../services/authService";
import { useAuthStore } from "../../store";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-ink text-white"
      : "text-ink-muted hover:bg-surface hover:text-ink"
  }`;

function AdminLayout() {
  const navigate = useNavigate();
  const profile = useAuthStore((s) => s.profile);

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="w-64 shrink-0 bg-ink text-white flex flex-col border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <span className="text-xl font-bold tracking-tight">
            LUXE<span className="text-accent">.</span>
          </span>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">
            Admin
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/admin/add" className={navLinkClass}>
            Add Product
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          {profile && (
            <p className="text-xs text-white/50 truncate mb-3 px-2">
              {profile.email}
            </p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full btn-ghost !text-white/80 !border-white/20 hover:!bg-white/10 text-sm py-2"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
