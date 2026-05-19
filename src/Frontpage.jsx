import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from "firebase/auth";
import { app } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth(app);


function Frontpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/home");
    }
  });

  return () => unsubscribe();
}, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
       await setPersistence(auth, browserLocalPersistence);
  await signInWithEmailAndPassword(auth, email, password);
  
} catch (error) {
  if (error.code === "auth/too-many-requests") {
    alert("Too many attempts. Please try again later.");
  } else if (error.code === "auth/wrong-password") {
    alert("Wrong password");
  } else if (error.code === "auth/user-not-found") {
    alert("User not found");
  } else {
    alert(error.message);
  }
}
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          MyShop
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to continue shopping
        </p>

        
        <form onSubmit={signIn} className="space-y-4">
          
          
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        
        <p className="text-center text-sm text-gray-600 mt-6">
          New user?{" "}
          <NavLink
            to="/signuppage"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </NavLink>
        </p>

        <p className="text-center text-sm text-gray-600 mt-6">
          Log in to{" "}
          <NavLink
            to="/adminlogin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Superadmin
          </NavLink>
        </p>




      </div>
    </div>
  );
}

export default Frontpage;