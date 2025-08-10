import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const POSTS_PER_PAGE = 6;

const AllVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input update
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setCurrentPage(1); // reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch posts from backend API with search query
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://volunteer-management-xi.vercel.app/volunteer-posts?search=${encodeURIComponent(
            searchQuery
          )}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center mb-10">
          Volunteer Needs
        </h2>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search volunteer posts by title..."
            className="input input-bordered w-full max-w-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search volunteer posts"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16"></div>
          </div>
        )}

        {/* No posts found */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-red-600 text-lg font-medium">
            No volunteer posts found.
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-6xl mx-auto">
          {paginatedPosts.map((post) => (
            <div
              key={post._id}
              className="card bg-white shadow-lg rounded-lg flex flex-col hover:shadow-xl transition-shadow duration-300"
              style={{ minHeight: "430px" }}
            >
              <figure className="h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </figure>
              <div className="card-body flex flex-col flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Category:</span> {post.category}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <div className="mt-auto text-right">
                  <Link to={`/volunteer-post/${post._id}`}>
                    <button className="btn btn-primary btn-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-3 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`btn btn-sm ${
                    pageNum === currentPage ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Loader CSS */}
      <style>{`
        .loader {
          border-top-color: #3b82f6; /* Tailwind blue-500 */
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AllVolunteerPosts;
