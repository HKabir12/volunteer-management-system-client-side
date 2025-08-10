import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext } from "react";
import { X, Loader2, Save } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const UpdatePage = () => {
  const navigate = useNavigate();
  const post = useLoaderData();
  const { user } = useContext(AuthContext);
  
  const [deadline, setDeadline] = useState(() => {
    const d = new Date(post?.deadline);
    return isNaN(d.getTime()) ? null : d;
  });

  // State for the custom confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };
  
  const confirmUpdate = async (form) => {
    setIsUpdating(true);
    try {
      const updatedPost = {
        thumbnail: form.thumbnail.value,
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        location: form.location.value,
        volunteersNeeded: parseInt(form.volunteersNeeded.value),
        deadline: deadline.toISOString(),
        organizerName: user.displayName,
        organizerEmail: user.email,
      };
  
      const res = await fetch(
        `http://localhost:3000/volunteer-posts/${post._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );
  
      const data = await res.json();
      if (data.modifiedCount > 0) {
        navigate("/manage-posts");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsUpdating(false);
      setShowConfirmModal(false);
    }
  };

  // Custom confirmation modal component
  const ConfirmationModal = ({ action, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Update</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to update this post?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={action}
            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={isUpdating}
          >
            {isUpdating ? <Loader2 className="animate-spin" size={20} /> : "Update"}
          </button>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <X size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10">
          Update Your Volunteer Post
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
        >
          <div className="md:col-span-2">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL</label>
            <input
              id="thumbnail"
              name="thumbnail"
              defaultValue={post.thumbnail}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title</label>
            <input
              id="title"
              name="title"
              defaultValue={post.title}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              id="category"
              name="category"
              defaultValue={post.category}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            >
              <option disabled>Choose Category</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Social Service</option>
              <option>Animal Welfare</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={post.description}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input
              id="location"
              name="location"
              defaultValue={post.location}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Volunteers Needed</label>
            <input
              id="volunteersNeeded"
              name="volunteersNeeded"
              defaultValue={post.volunteersNeeded}
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deadline</label>
            <DatePicker
              id="deadline"
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select deadline"
              required
            />
          </div>

          <div>
            <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organizer Name</label>
            <input
              id="organizerName"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              defaultValue={user.displayName}
              readOnly
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="organizerEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organizer Email</label>
            <input
              id="organizerEmail"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              defaultValue={user.email}
              readOnly
            />
          </div>

          <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg">
            <Save size={20} /> Update Post
          </button>
        </form>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          action={() => confirmUpdate(document.querySelector('form'))}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default UpdatePage;
