import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';

/** Renders the cart page: item list plus an order-summary panel, or an empty state. */
function Cart() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, isEmpty, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => navigate('/cart')} onLogoClick={() => navigate('/')} />
      <h1 className="sr-only">Your Cart</h1>

      {isEmpty ? (
        <EmptyState
          emoji="🛒"
          title="Your cart is empty"
          subtitle="Add items from the store to get started"
          actionLabel="Browse Products"
          onAction={() => navigate('/')}
        />
      ) : (
        <main className="mx-auto grid max-w-5xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_320px]">
          {/* Items list */}
          <div data-testid="cart-items-list" className="rounded-2xl border border-gray-200 bg-white px-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 lg:sticky lg:top-5">
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
              data-testid="proceed-to-checkout-btn"
              onClick={() => navigate('/checkout')}
              className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              data-testid="clear-cart-btn"
              onClick={clearCart}
              className="mt-2 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Clear Cart
            </button>
          </aside>
        </main>
      )}
    </div>
  );
}

export default Cart;
