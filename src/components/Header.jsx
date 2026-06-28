import { useCart } from '../context/CartContext';

/** Renders the top navigation bar with logo, delivery location pill, and cart button. */
function Header({ onCartClick, onLogoClick }) {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Logo (text only) */}
      <button
        type="button"
        onClick={onLogoClick}
        className="shrink-0 text-xl font-extrabold tracking-tight text-orange-500 sm:text-2xl"
      >
        Instamart
      </button>

      {/* Delivery location pill — hidden on mobile */}
      <div className="hidden items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 sm:flex">
        📍 Delivering to: Home, Chennai
      </div>

      {/* Cart button with item-count badge */}
      <button
        type="button"
        data-testid="header-cart-btn"
        onClick={onCartClick}
        className="relative shrink-0 rounded-full p-2 text-2xl transition hover:bg-gray-100"
        aria-label="View cart"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
}

export default Header;
