/** Renders a controlled search input with a leading icon and a clear button. */
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full">
      {/* Leading search icon */}
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg">
        🔍
      </span>

      <input
        type="text"
        data-testid="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />

      {/* Clear button — only when there is a value */}
      {value && (
        <button
          type="button"
          data-testid="search-clear-btn"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
