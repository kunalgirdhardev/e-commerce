import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const electronics = products.filter(p => p.category === "electronics").length;
  const fashion = products.filter(p => p.category === "fashion").length;
  const home = products.filter(p => p.category === "home").length;
  const beauty = products.filter(p => p.category === "beauty").length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total" value={products.length} />
        <Stat title="Electronics" value={electronics} />
        <Stat title="Fashion" value={fashion} />
        <Stat title="Home" value={home} />
        <Stat title="Beauty" value={beauty} />
      </div>

      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={item.img}
                className="h-70 w-full object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-pink-600 font-bold">₹{item.price}</p>
              <p className="text-gray-500 text-sm">
                Stock: {item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-purple-600">{value}</p>
    </div>
  );
}

export default AdminDashboard;