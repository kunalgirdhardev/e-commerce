import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { app } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth(app);



function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ADMIN_EMAIL = "admin@gmail.com";

  
useEffect(() => {
  
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      navigate("/superadmin/dashboard");
    }
  });

  return () => unsubscribe();
}, []);

const signIn = async (e) => {
  e.preventDefault();
  try {
    await setPersistence(auth, browserLocalPersistence); 

    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential.user.email !== ADMIN_EMAIL) {
      alert("Not authorized as admin");
      return;
    }

    navigate("/superadmin/dashboard");
  } catch (error) {
    if (error.code === "auth/too-many-requests") {
      alert("Too many attempts. Try again later.");
    } else {
      alert(error.message);
    }
  }
};

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          MyShop
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to Super Admin
        </p>

        {/* Form */}
        <form onSubmit={signIn} className="space-y-4">
          
          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login as Admin
          </button>



           <p className="text-center text-sm text-gray-600 mt-6">
                    Log in as{" "}
                    <NavLink
                      to="/"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      User
                    </NavLink>
                  </p>
          
        </form>

       



      </div>
    </div>
  );
}

export default AdminLogin;