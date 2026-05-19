import { useCartStore } from "./store";
import Header from "./Header";
import Footer from "./Footer";

function Cart() {
  const { cart, removeFromCart, decreaseQty, increaseQty } = useCartStore();

  const total = cart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      
      <h2 className="text-3xl font-bold mb-6 text-center mt-30">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">

          {/* Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
            >
              
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img || "https://via.placeholder.com/100"}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-2">
                
                {/* Quantity */}
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 text-lg hover:text-red-500"
                  >
                    −
                  </button>

                  <span className="px-3 font-semibold">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 text-lg hover:text-purple-500"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-xl font-semibold flex justify-between">
              <span>Total</span>
              <span className="text-pink-600">₹{total}</span>
            </h3>

            <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;