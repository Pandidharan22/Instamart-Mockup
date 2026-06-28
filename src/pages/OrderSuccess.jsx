import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Renders the clean, centered order-confirmation screen with a stable generated order ID. */
function OrderSuccess() {
  const navigate = useNavigate();
  // Generate the order id once so it survives re-renders.
  const [orderId] = useState(() => `#IM-${Math.floor(1000 + Math.random() * 9000)}`);

  return (
    <div
      data-testid="order-success-page"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
        ✅
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-gray-900">Order Placed!</h1>
      <p className="mt-1 text-sm text-gray-500">Your order will arrive in 10 minutes</p>
      <p className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
        Order ID: {orderId}
      </p>

      <button
        type="button"
        data-testid="continue-shopping-btn"
        onClick={() => navigate('/')}
        className="mt-6 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
