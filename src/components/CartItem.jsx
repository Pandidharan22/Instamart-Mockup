import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import QuantityStepper from './QuantityStepper';

// Look up a category's emoji by id, falling back to a generic box.
const emojiFor = (categoryId) =>
  categories.find((c) => c.id === categoryId)?.emoji ?? '📦';

/** Renders a single cart row with thumbnail, pricing, quantity stepper, and remove button. */
function CartItem({ item }) {
  const { removeFromCart } = useCart();
  const rowTotal = item.price * item.quantity;

  return (
    <div
      data-testid={`cart-item-${item.id}`}
      className="flex items-start gap-3 border-b border-gray-100 py-3"
    >
      {/* Emoji thumbnail */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
        {emojiFor(item.category)}
      </div>

      {/* Name, unit, then a row with the line total and the stepper */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-800">{item.name}</p>
        <p className="text-xs text-gray-500">
          {item.unit} · ₹{item.price} each
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-gray-900">₹{rowTotal}</span>
          <QuantityStepper productId={item.id} quantity={item.quantity} />
        </div>
      </div>

      {/* Remove button */}
      <button
        type="button"
        data-testid={`remove-item-${item.id}`}
        onClick={() => removeFromCart(item.id)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg transition hover:bg-gray-100"
        aria-label={`Remove ${item.name}`}
      >
        🗑️
      </button>
    </div>
  );
}

export default CartItem;
