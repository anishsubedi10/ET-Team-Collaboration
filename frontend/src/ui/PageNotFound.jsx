import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 text-white">
      <div className="text-center bg-green-800 p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold   mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-sm mb-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          to="/"
          className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
