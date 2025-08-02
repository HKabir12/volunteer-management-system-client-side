import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      const res = await fetch("http://localhost:3000/volunteer-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Volunteer Post Added Successfully!");
        form.reset();
        setDeadline(new Date());
      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to add post.");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Add Volunteer Need Post
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="label">
              <span className="label-text">Thumbnail URL</span>
            </label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Post Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
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

          <div>
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">No. of Volunteers Needed</span>
            </label>
            <input
              type="number"
              name="volunteersNeeded"
              placeholder="No. of Volunteers Needed"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy-MM-dd"
              className="input input-bordered w-full"
            />
          </div>

          <input
            type="text"
            value={user?.displayName}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
          <input
            type="email"
            value={user?.email}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />

          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Add Post
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddVolunteer;
