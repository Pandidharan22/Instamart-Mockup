import { useCart } from '../context/CartContext';

/** Renders a compact − / quantity / + pill that drives cart quantity for one product. */
function QuantityStepper({ productId, quantity }) {
  const { incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="inline-flex items-center rounded-lg border border-orange-500 bg-white">
      <button
        type="button"
        data-testid={`decrement-${productId}`}
        onClick={() => decrementQuantity(productId)}
        className="flex h-11 w-10 items-center justify-center text-lg font-bold leading-none text-orange-500"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        data-testid={`quantity-${productId}`}
        className="min-w-6 text-center text-sm font-semibold text-gray-800"
      >
        {quantity}
      </span>

      <button
        type="button"
        data-testid={`increment-${productId}`}
        onClick={() => incrementQuantity(productId)}
        className="flex h-11 w-10 items-center justify-center text-lg font-bold leading-none text-orange-500"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
