import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { useNavigate } from "react-router";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for form fields
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Healthcare");
  const [location, setLocation] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState(1);
  const [deadline, setDeadline] = useState(new Date());

  // State for feedback messages
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newPost = {
      thumbnail,
      title,
      description,
      category,
      location,
      volunteersNeeded,
      deadline,
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };

    try {
      const res = await fetch("https://volunteer-management-xi.vercel.app/volunteer-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();
      if (data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Volunteer post added successfully!",
          confirmButtonColor: "#3085d6",
        });

        // Clear form fields here (your state setters)
        setThumbnail("");
        setTitle("");
        setDescription("");
        setCategory("Healthcare");
        setLocation("");
        setVolunteersNeeded(1);
        setDeadline(new Date());

        // Navigate after user clicks OK in the alert
        navigate(`/volunteer-post/${data.insertedId}`);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error adding post:", error);
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to add post. Please check your connection.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-600 dark:text-blue-400">
            Add a New Volunteer Post
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Fill out the form below to create a new volunteer opportunity. Your
            post will be visible to potential volunteers.
          </p>

          {/* Feedback Message */}
          {feedback.message && (
            <div
              className={`p-4 rounded-lg mb-6 text-center font-medium ${
                feedback.type === "success"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            {/* Thumbnail URL */}
            <div className="md:col-span-1">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-semibold mb-2"
              >
                Thumbnail URL
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                required
                aria-label="Thumbnail image URL"
              />
            </div>

            {/* Title */}
            <div className="md:col-span-1">
              <label
                htmlFor="title"
                className="block text-sm font-semibold mb-2"
              >
                Post Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                aria-label="Volunteer post title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Write a detailed description"
                rows="5"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                aria-label="Description of volunteer post"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-1">
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                aria-label="Category"
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Social Service">Social Service</option>
                <option value="Animal Welfare">Animal Welfare</option>
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-1">
              <label
                htmlFor="location"
                className="block text-sm font-semibold mb-2"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City, Area"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                aria-label="Location"
              />
            </div>

            {/* Volunteers Needed */}
            <div className="md:col-span-1">
              <label
                htmlFor="volunteersNeeded"
                className="block text-sm font-semibold mb-2"
              >
                Volunteers Needed
              </label>
              <input
                id="volunteersNeeded"
                name="volunteersNeeded"
                type="number"
                min={1}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                placeholder="Number"
                value={volunteersNeeded}
                onChange={(e) => setVolunteersNeeded(Number(e.target.value))}
                required
                aria-label="Number of volunteers needed"
              />
            </div>

            {/* Deadline */}
            <div className="md:col-span-1">
              <label
                htmlFor="deadline"
                className="block text-sm font-semibold mb-2"
              >
                Deadline
              </label>
              <DatePicker
                id="deadline"
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                required
                aria-label="Deadline date"
              />
            </div>

            {/* Organizer Info */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold mb-2">
                Organizer Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                readOnly
                aria-label="Organizer name"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-semibold mb-2">
                Organizer Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                readOnly
                aria-label="Organizer email"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                aria-label="Submit volunteer post"
              >
                {loading ? "Adding Post..." : "Submit Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddVolunteer;
