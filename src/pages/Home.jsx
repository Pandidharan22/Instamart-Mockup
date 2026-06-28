import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { products, categories } from '../data/products';

/** Renders the landing page: search, category grid, and the product grid (with live search filtering). */
function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;
  const filtered = isSearching
    ? products.filter((p) => p.name.toLowerCase().includes(query))
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white">
        <Header onCartClick={() => navigate('/cart')} onLogoClick={() => navigate('/')} />
        <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for products, brands and more"
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-4 pb-8 sm:px-6">
        <h1 className="sr-only">Instamart — Browse Products</h1>

        {/* Slim hero banner */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-4 text-white">
          <p className="text-lg font-bold leading-tight">Delivery in 10 minutes</p>
          <p className="text-sm text-orange-50">Fresh groceries at your door</p>
        </div>

        {/* Category grid — only when not searching */}
        {!isSearching && (
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-gray-800">Shop by Category</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  data-testid={`category-tile-${category.id}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white p-4 text-center shadow-sm transition-transform hover:scale-105"
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-sm font-bold text-gray-700">{category.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-800">
            {isSearching ? `Results for "${searchQuery}"` : 'All Products'}
          </h2>

          {filtered.length === 0 ? (
            <EmptyState
              emoji="🔍"
              title="No results found"
              subtitle={`No products matching "${searchQuery}"`}
              actionLabel="Clear Search"
              onAction={() => setSearchQuery('')}
              variant="ghost"
            />
          ) : (
            <div
              data-testid="product-grid"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
