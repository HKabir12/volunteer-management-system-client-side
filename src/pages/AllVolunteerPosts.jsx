import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Tag,
  SortAsc,
  SortDesc,
} from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const POSTS_PER_PAGE = 6;

const AllVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/volunteer-posts?search=${encodeURIComponent(
            searchQuery
          )}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch volunteer posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  // Sort
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "asc") return new Date(a.deadline) - new Date(b.deadline);
    if (sortOrder === "desc")
      return new Date(b.deadline) - new Date(a.deadline);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen   transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 dark:text-white">
          Volunteer Needs
        </h2>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 "
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title..."
              className="pl-9 pr-3 py-2 w-full rounded-lg border   outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none pr-8 pl-3 py-2 w-full sm:w-auto rounded-lg border "
            >
              <option value="default">Default</option>
              <option value="asc">Earliest Deadline</option>
              <option value="desc">Latest Deadline</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center ">
              {sortOrder === "asc" ? (
                <SortAsc size={18} />
              ) : (
                <SortDesc size={18} />
              )}
            </div>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-base sm:text-lg font-medium text-red-500 py-12">
            No volunteer posts found.
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {paginatedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-32 sm:h-36 md:h-40 w-full object-cover"
              />
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1 text-blue-600 dark:text-blue-400">
                  {post.title}
                </h3>
                <p className="flex items-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <Tag className="w-3.5 h-3.5 mr-1 text-pink-500" />
                  {post.category}
                </p>
                <p className="flex items-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <CalendarDays className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Deadline: {new Date(post.deadline).toLocaleDateString()}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/volunteer-post/${post._id}`}
                    className="inline-block w-full text-center bg-blue-600 text-white text-xs sm:text-sm font-semibold py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded-full border border-blue-500 text-blue-500 disabled:opacity-50 hover:bg-blue-500 hover:text-white transition"
            >
              <ChevronLeft size={16} />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 rounded-full border border-blue-500 text-blue-500 disabled:opacity-50 hover:bg-blue-500 hover:text-white transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllVolunteerPosts;
