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

      {isEmpty ? (
        <>
          <h1 className="sr-only">My Cart</h1>
          <EmptyState
            emoji="🛒"
            title="Your cart is empty"
            subtitle="Add items from the store to get started"
            actionLabel="Browse Products"
            onAction={() => navigate('/')}
          />
        </>
      ) : (
        <main className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6">
          <h1 className="mb-4 text-xl font-bold text-gray-800">
            My Cart{' '}
            <span className="text-base font-medium text-gray-500">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* Items list */}
            <div
              data-testid="cart-items-list"
              className="rounded-2xl border border-gray-200 bg-white px-4"
            >
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order summary — sticky on desktop, below the list on mobile */}
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
                data-testid="proceed-to-checkout-btn"
                onClick={() => navigate('/checkout')}
                className="mt-4 flex min-h-[44px] w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                data-testid="clear-cart-btn"
                onClick={clearCart}
                className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-xl border border-orange-500 px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}

export default Cart;
