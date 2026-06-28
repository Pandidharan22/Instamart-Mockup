import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import QuantityStepper from './QuantityStepper';

// Look up a category's emoji by id, falling back to a generic box.
const emojiFor = (categoryId) =>
  categories.find((c) => c.id === categoryId)?.emoji ?? '📦';

/** Renders a single product card with pricing, badge, stock state, and add/stepper controls. */
function ProductCard({ product }) {
  const { addToCart, isInCart, getQuantity } = useCart();
  const inCart = isInCart(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image placeholder with category emoji */}
      <div className="relative flex h-32 items-center justify-center rounded-xl bg-gray-100 text-5xl">
        {emojiFor(product.category)}
        {product.badge && (
          <span className="absolute left-1 top-1 rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 text-sm font-bold text-gray-600">
            Out of Stock
          </div>
        )}
      </div>

      <p className="mt-2 line-clamp-2 text-sm font-semibold text-gray-800">{product.name}</p>
      <p className="text-xs text-gray-500">{product.unit}</p>

      {/* Delivery time · rating on one line */}
      <div className="mt-1 text-xs text-gray-500">
        ⏱ {product.deliveryTime} · ⭐ {product.rating}
      </div>

      {/* Price + action pinned to the bottom of the card */}
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          </div>
          {discount > 0 && (
            <span className="text-xs font-semibold text-green-600">{discount}% off</span>
          )}
        </div>

        {/* Stock-gated control: Add button, stepper, or nothing when out of stock */}
        {product.inStock &&
          (inCart ? (
            <QuantityStepper productId={product.id} quantity={getQuantity(product.id)} />
          ) : (
            <button
              type="button"
              data-testid={`add-to-cart-${product.id}`}
              onClick={() => addToCart(product)}
              className="inline-flex min-h-[44px] items-center rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
            >
              + Add
            </button>
          ))}
      </div>
    </div>
  );
}

export default ProductCard;
