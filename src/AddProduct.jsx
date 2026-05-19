import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");

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

  const addProduct = async (e) => {
    e.preventDefault();
   if (!name || !price || !category || !quantity) return;

    try {
     await addDoc(collection(db, "products"), {
  name,
  price: Number(price),
  img,
  category,
  quantity: Number(quantity), 
});
      setName("");
      setPrice("");
      setImg("");
        setCategory("");
        setQuantity("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">

      
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">
           Add New Product
        </h1>
        <p className="text-center text-sm opacity-80">
           Fill in the details to add a new product to your store
        </p>
      </div>

      
      <div className="max-w-4xl mx-auto mt-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-purple-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
           Add Product
        </h2>

        <form
          onSubmit={addProduct}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <select
  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="electronics">Electronics</option>
  <option value="fashion">Fashion</option>
  <option value="home">Home</option>
  <option value="beauty">Beauty</option>
</select>
       

       <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <input type="number"
            placeholder="Quantity"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button className="md:col-span-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Add Product
          </button>
        </form>
      </div>

     
        </div>
  );
}

export default AddProduct;