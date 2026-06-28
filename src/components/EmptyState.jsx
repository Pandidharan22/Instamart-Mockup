/** Renders a centered empty/zero state with an emoji, message, and optional action button. */
function EmptyState({ emoji, title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="text-6xl">{emoji}</div>
      <h2 className="mt-4 text-lg font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-1 max-w-xs text-sm text-gray-500">{subtitle}</p>}

      {actionLabel && onAction && (
        <button
          type="button"
          data-testid="empty-state-action-btn"
          onClick={onAction}
          className="mt-6 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
