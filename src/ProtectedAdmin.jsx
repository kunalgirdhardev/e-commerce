import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function ProtectedAdmin({ children }) {
  const auth = getAuth();

  const [user, setUser] = useState(undefined); // important
  const ADMIN_EMAIL = "admin@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  
  if (!user) {
    return <Navigate to="/adminlogin" />;
  }

  
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/home" />;
  }


  return children;
}

export default ProtectedAdmin;