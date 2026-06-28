import { useCart } from '../context/CartContext';

/** Renders a compact − / quantity / + pill that drives cart quantity for one product. */
function QuantityStepper({ productId, quantity }) {
  const { incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-orange-500 bg-white px-2 py-1">
      <button
        type="button"
        data-testid={`decrement-${productId}`}
        onClick={() => decrementQuantity(productId)}
        className="text-lg font-bold leading-none text-orange-500"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        data-testid={`quantity-${productId}`}
        className="min-w-4 text-center text-sm font-semibold text-gray-800"
      >
        {quantity}
      </span>

      <button
        type="button"
        data-testid={`increment-${productId}`}
        onClick={() => incrementQuantity(productId)}
        className="text-lg font-bold leading-none text-orange-500"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
