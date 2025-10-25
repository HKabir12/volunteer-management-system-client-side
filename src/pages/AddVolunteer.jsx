import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    thumbnail: "",
    title: "",
    description: "",
    category: "Healthcare",
    location: "",
    volunteersNeeded: 1,
    deadline: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDateChange = (date) => setForm({ ...form, deadline: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newPost = { ...form, organizerName: user?.displayName, organizerEmail: user?.email };

    try {
      const res = await fetch("https://volunteer-management-xi.vercel.app/volunteer-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

        // Reset form
        setForm({
          thumbnail: "",
          title: "",
          description: "",
          category: "Healthcare",
          location: "",
          volunteersNeeded: 1,
          deadline: new Date(),
        });

        navigate(`/volunteer-post/${data.insertedId}`);
      } else throw new Error("Insertion failed");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add post. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col    transition-colors duration-300">
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 ">
            Add a New Volunteer Post
          </h2>
          <p className="text-center dark:text-white mb-8 max-w-2xl mx-auto">
            Fill out the form below to create a new volunteer opportunity.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { label: "Thumbnail URL", name: "thumbnail", type: "url", placeholder: "https://example.com/image.jpg" },
              { label: "Title", name: "title", type: "text", placeholder: "Enter title" },
              { label: "Location", name: "location", type: "text", placeholder: "City, Area" },
              { label: "Volunteers Needed", name: "volunteersNeeded", type: "number", placeholder: "1", min: 1 },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-2">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  min={field.min}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2  duration-300"
                  required
                />
              </div>
            ))}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Write a detailed description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2  duration-300"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2  duration-300"
                required
              >
                <option>Healthcare</option>
                <option>Education</option>
                <option>Social Service</option>
                <option>Animal Welfare</option>
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold mb-2">Deadline</label>
              <DatePicker
                selected={form.deadline}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="w-full px-4 py-3 rounded-lg border-2  duration-300"
                required
              />
            </div>

            {/* Organizer Info */}
            {[
              { label: "Organizer Name", value: user?.displayName },
              { label: "Organizer Email", value: user?.email },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-semibold mb-2">{field.label}</label>
                <input
                  value={field.value || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border-2 cursor-not-allowed"
                />
              </div>
            ))}

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600  font-semibold rounded-full shadow-lg  transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
