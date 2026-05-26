import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function OrderConfirmed() {
  const orderId = `LUXE-${Date.now().toString(36).toUpperCase().slice(-8)}`;

  return (
    <div className="page-container py-16 md:py-24 animate-fade-in">
      <div className="max-w-lg mx-auto text-center">
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center success-check">
              <svg
                className="w-8 h-8 text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">
          Order placed
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
          Your order is confirmed
        </h1>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Thank you for shopping with LUXE. We&apos;ve received your order and
          will send you a confirmation email shortly.
        </p>

        <div className="premium-card p-6 mt-10 text-left">
          <p className="text-xs text-ink-subtle uppercase tracking-wider mb-1">
            Order reference
          </p>
          <p className="text-lg font-mono font-semibold text-ink">{orderId}</p>
          <p className="text-sm text-ink-muted mt-4">
            Estimated delivery: 3–5 business days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost">View Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
