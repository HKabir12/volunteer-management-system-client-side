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
          `https://volunteer-management-xi.vercel.app/volunteer-posts?search=${encodeURIComponent(
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
    <div>
      

      <div className="min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 w-6xl mx-auto bg-primary ">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-blue-400">
            Volunteer Needs
          </h2>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-1/2">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm cursor-pointer focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="default">Default</option>
                <option value="asc">Earliest Deadline</option>
                <option value="desc">Latest Deadline</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
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
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
          )}

          {/* Empty */}
          {!loading && posts.length === 0 && (
            <p className="text-center text-lg font-medium text-red-500 py-16">
              No volunteer posts found.
            </p>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-1 line-clamp-1 text-blue-600 dark:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Tag className="w-4 h-4 mr-1 text-pink-500" />
                    {post.category}
                  </p>
                  <p className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <CalendarDays className="w-4 h-4 mr-1 text-emerald-500" />
                    Deadline: {new Date(post.deadline).toLocaleDateString()}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/volunteer-post/${post._id}`}
                      className="inline-block w-full text-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
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
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-blue-500 text-blue-500 disabled:opacity-50 hover:bg-blue-500 hover:text-white transition"
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
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
                className="p-2 rounded-full border border-blue-500 text-blue-500 disabled:opacity-50 hover:bg-blue-500 hover:text-white transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </main>
      </div>
      
    </div>
  );
};

export default AllVolunteerPosts;
