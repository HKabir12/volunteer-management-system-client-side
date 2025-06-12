import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link to="/" className="btn btn-primary text-white px-6 py-2 rounded">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
