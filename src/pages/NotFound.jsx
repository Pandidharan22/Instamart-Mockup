import { useNavigate } from 'react-router-dom';

/** Renders a simple centered 404 page with a button back to home. */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-orange-500">404</h1>
      <p className="mt-2 text-lg font-semibold text-gray-700">Page not found</p>
      <button
        type="button"
        data-testid="go-home-btn"
        onClick={() => navigate('/')}
        className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
