import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function AdminLayout() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/adminlogin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6 flex flex-col justify-between">

        <div>
          <h1 className="text-2xl font-bold mb-10">Admin</h1>

          <nav className="flex flex-col gap-4">
            <NavLink
              to="/superadmin/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-white text-purple-600" : "hover:bg-purple-500"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/superadmin/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-white text-purple-600" : "hover:bg-purple-500"
                }`
              }
            >
             Products
            </NavLink>

            <NavLink
              to="/superadmin/add"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-white text-purple-600" : "hover:bg-purple-500"
                }`
              }
            >
              Add Product
            </NavLink>
          </nav>
        </div>

        
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Logout
        </button>
      </aside>

      
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;