import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";

import BeVolunteerModal from "./BeVolunteerModal";
import { AuthContext } from "../provider/AuthProvider";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { CalendarDays, MapPin } from "lucide-react";

const VolunteerDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/volunteer-posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <svg
          className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center  dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          Post not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col  dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Post Thumbnail */}
          <figure className="h-72 sm:h-96 md:h-[28rem] overflow-hidden rounded-t-3xl">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>

          {/* Post Content */}
          <div className="p-8 sm:p-12 lg:p-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-blue-700 dark:text-blue-400">
              {post.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed tracking-wide">
              {post.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-gray-700 dark:text-gray-300 font-semibold text-lg sm:text-xl">
              <p className="flex items-center">
                <span className="font-bold text-gray-900 dark:text-gray-100 w-32">
                  Category:
                </span>
                <span className="ml-3">{post.category}</span>
              </p>
              <p className="flex items-center">
                <span className="font-bold text-gray-900 dark:text-gray-100 w-32">
                  Volunteers:
                </span>
                <span className="ml-3">{post.volunteersNeeded} needed</span>
              </p>
              <p className="flex items-center">
                <span className="font-bold text-gray-900 dark:text-gray-100 w-32">
                  Location:
                </span>
                <span className="ml-3 flex items-center gap-1">
                  <MapPin size={20} className="text-red-600" />
                  {post.location}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-bold text-gray-900 dark:text-gray-100 w-32">
                  Deadline:
                </span>
                <span className="ml-3 flex items-center gap-1">
                  <CalendarDays size={20} className="text-emerald-600" />
                  {new Date(post.deadline).toLocaleDateString()}
                </span>
              </p>
              <div className="sm:col-span-2">
                <p className="flex items-center">
                  <span className="font-bold text-gray-900 dark:text-gray-100 w-32">
                    Organizer:
                  </span>
                  <span className="ml-3">
                    {post.organizerName} ({post.organizerEmail})
                  </span>
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-12 flex justify-center sm:justify-start">
              {post.volunteersNeeded > 0 ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-10 py-4 bg-blue-700 dark:bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-300"
                >
                  Be a Volunteer
                </button>
              ) : (
                <p className="text-red-600 dark:text-red-400 text-xl font-semibold">
                  No volunteers needed currently.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Volunteer Modal */}
        {openModal && (
          <BeVolunteerModal
            post={post}
            user={user}
            closeModal={() => setOpenModal(false)}
          />
        )}
      </main>
      
    </div>
  );
};

export default VolunteerDetails;
