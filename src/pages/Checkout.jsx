import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { mockUser } from '../data/user';

/** Renders the checkout page: address selection, delivery slot, order summary, and place-order action. */
function Checkout() {
  const navigate = useNavigate();
  const { totalPrice, totalItems, isEmpty, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(mockUser.addresses[0].id);
  const [selectedSlot, setSelectedSlot] = useState(mockUser.deliverySlots[0].id);
  // Tracks an intentional order placement, so the empty-cart guard doesn't hijack the success redirect.
  const orderPlaced = useRef(false);

  // Guard: bounce to home if the cart is empty — but not when it just emptied from placing an order.
  useEffect(() => {
    if (isEmpty && !orderPlaced.current) navigate('/', { replace: true });
  }, [isEmpty, navigate]);

  if (isEmpty && !orderPlaced.current) return null;

  // Place the order: mark intent, clear the cart, then show the success screen.
  const placeOrder = () => {
    orderPlaced.current = true;
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => navigate('/cart')} onLogoClick={() => navigate('/')} />
      <h1 className="sr-only">Checkout</h1>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pt-4 pb-8 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <button
            type="button"
            data-testid="back-to-cart-btn"
            onClick={() => navigate('/cart')}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-orange-500 px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50"
          >
            ← Back to Cart
          </button>

          {/* Delivery address selection */}
          <section>
            <h2 className="mb-3 text-base font-bold text-gray-800">Delivery Details</h2>
            <div className="space-y-3">
              {mockUser.addresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  data-testid={`address-card-${address.id}`}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`block w-full rounded-xl border-2 bg-white p-4 text-left transition ${
                    selectedAddress === address.id ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-800">{address.label}</p>
                  <p className="text-xs text-gray-500">
                    {address.line1}, {address.line2}, {address.city} - {address.pincode}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Delivery slot selection */}
          <section>
            <h2 className="mb-3 text-base font-bold text-gray-800">Delivery Slot</h2>
            <div className="flex flex-wrap gap-3">
              {mockUser.deliverySlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  data-testid={`slot-${slot.id}`}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
                    selectedSlot === slot.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 lg:sticky lg:top-20">
          <h2 className="mb-3 text-base font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{totalItems} items</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            data-testid="place-order-btn"
            onClick={placeOrder}
            className="mt-4 flex min-h-[44px] w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
          >
            Place Order
          </button>
        </aside>
      </main>
    </div>
  );
}

export default Checkout;
