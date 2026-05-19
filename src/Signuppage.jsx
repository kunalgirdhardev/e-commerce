import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase.js";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const auth = getAuth(app);

const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created");
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-200">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join MyShop and start shopping
        </p>

        
        <form onSubmit={createUser} className="space-y-4">
          
          
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signuppage;