import Swal from "sweetalert2";
import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

const BeVolunteerModal = ({ post, user, closeModal }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { _id, ...postWithoutId } = post;

    const volunteerRequest = {
      ...postWithoutId,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested",
    };

    try {
      const res = await fetch("https://volunteer-management-xi.vercel.app/volunteer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerRequest),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Request Submitted",
          text: "Your volunteer request has been sent successfully!",
          confirmButtonColor: "#3085d6",
        });
        closeModal();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Failed to submit request. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("Error submitting volunteer request:", err);
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection and try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-extrabold text-center mb-6 text-blue-600 dark:text-blue-400">
          Be a Volunteer
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Review the post details and submit your request to volunteer.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* Post details - read-only inputs */}
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={post.title}
            readOnly
            aria-label="Post title"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={post.category}
            readOnly
            aria-label="Post category"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={post.location}
            readOnly
            aria-label="Post location"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={new Date(post.deadline).toLocaleDateString()}
            readOnly
            aria-label="Post deadline"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={`Organizer: ${post.organizerName}`}
            readOnly
            aria-label="Organizer name"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={`Organizer Email: ${post.organizerEmail}`}
            readOnly
            aria-label="Organizer email"
          />
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={`Your Name: ${user?.displayName}`}
            readOnly
            aria-label="Your name"
          />
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            value={`Your Email: ${user?.email}`}
            readOnly
            aria-label="Your email"
          />

          {/* Suggestion textarea */}
          <div className="md:col-span-2">
            <textarea
              name="suggestion"
              placeholder="Add an optional message or suggestion..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              aria-label="Volunteer suggestion"
            />
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading}
              aria-label="Request to be a volunteer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeVolunteerModal;
