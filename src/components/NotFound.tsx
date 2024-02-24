import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <p className="text-gray-500">
          Oops! The page you are looking for might be in another castle.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
