import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "./store";
import Button from "./components/common/Button";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, decreaseQty, increaseQty } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const getImage = (item) =>
    item.images?.[0] || item.img || "https://via.placeholder.com/100";

  const getTitle = (item) => item.title || item.name;

  const handleCheckout = () => {
    navigate("/order-confirmed");
  };

  return (
    <div className="page-container py-12 md:py-16 animate-fade-in">
      <h2 className="text-3xl font-bold text-ink tracking-tight mb-2">
        Your Cart
      </h2>
      <p className="text-ink-muted mb-10">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-muted text-lg mb-6">Your cart is empty</p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="premium-card p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={getImage(item)}
                  alt={getTitle(item)}
                  className="w-20 h-20 object-cover rounded-lg shrink-0"
                />
                <div className="min-w-0">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-lg font-semibold text-ink hover:text-accent transition truncate block"
                  >
                    {getTitle(item)}
                  </Link>
                  <p className="text-ink-muted">₹{item.price}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center bg-surface rounded-full px-3 py-1 border border-border">
                  <button
                    type="button"
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 text-lg hover:text-red-600 transition"
                  >
                    −
                  </button>
                  <span className="px-3 font-semibold">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => increaseQty(item.id)}
                    className="px-2 text-lg hover:text-ink transition"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="premium-card p-6 mt-8">
            <div className="flex justify-between text-xl font-semibold text-ink">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Button
              variant="primary"
              className="w-full mt-6"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
