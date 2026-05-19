import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

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

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">

      
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">Your Products</h1>
      </div>

      
      <div className="flex gap-3 flex-wrap justify-center mt-6">
        {["all", "electronics", "fashion", "home", "beauty"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold ${
              category === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat} (
            {cat === "all"
              ? products.length
              : products.filter((p) => p.category === cat).length}
            )
          </button>
        ))}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={item.img || "https://via.placeholder.com/200"}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{item.name}</h3>
            <p className="text-pink-600 font-bold">₹{item.price}</p>
            <p className="text-sm text-gray-500">
              Stock: {item.quantity}
            </p>

            <button
              onClick={() => deleteProduct(item.id)}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;