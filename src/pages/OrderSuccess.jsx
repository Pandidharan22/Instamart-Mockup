import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Renders the clean, centered order-confirmation screen with a stable generated order ID. */
function OrderSuccess() {
  const navigate = useNavigate();
  // Generate the order id once so it survives re-renders.
  const [orderId] = useState(() => `#IM-${Math.floor(1000 + Math.random() * 9000)}`);
  // Bounce the success badge briefly on mount, then settle.
  const [bounce, setBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBounce(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-testid="order-success-page"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center"
    >
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-white ${
          bounce ? 'animate-bounce' : ''
        }`}
      >
        ✓
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-gray-900">Order Placed!</h1>
      <p className="mt-1 text-sm text-gray-500">Your order will arrive in 10 minutes</p>
      <p className="mt-4 rounded-full bg-gray-100 px-4 py-1 font-mono text-sm text-gray-600">
        Order ID: {orderId}
      </p>

      <button
        type="button"
        data-testid="continue-shopping-btn"
        onClick={() => navigate('/')}
        className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
