import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = form.volunteersNeeded.value;

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
        Swal.fire({
          icon: "success",
          title: "Volunteer Post Added!",
          text: "Your post was successfully added.",
          confirmButtonColor: "#3085d6",
        });
        form.reset();
        setDeadline(new Date());
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong. Try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error adding post:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add post. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Add Volunteer Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Thumbnail */}
          <div>
            <label className="label font-semibold">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="label font-semibold">Post Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Write a detailed description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="label font-semibold">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option disabled selected>
                Choose Category
              </option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Social Service</option>
              <option>Animal Welfare</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="City, Area"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Volunteers Needed */}
          <div>
            <label className="label font-semibold">Volunteers Needed</label>
            <input
              type="number"
              name="volunteersNeeded"
              min={1}
              className="input input-bordered w-full"
              placeholder="Number"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="label font-semibold">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy-MM-dd"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Organizer Info */}
          <input
            type="text"
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Submit Post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddVolunteer;
