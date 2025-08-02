import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext } from "react";

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

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
      Swal.fire("Success!", "Post updated successfully!", "success").then(
        () => {
          navigate("/manage-posts");
        }
      );
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Your Volunteer Post
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="thumbnail"
            defaultValue={post.thumbnail}
            className="input input-bordered w-full"
            required
          />
          <input
            name="title"
            defaultValue={post.title}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            defaultValue={post.description}
            className="textarea textarea-bordered md:col-span-2"
            required
          />

          <select
            name="category"
            defaultValue={post.category}
            className="select select-bordered w-full"
            required
          >
            <option disabled>Choose Category</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Social Service</option>
            <option>Animal Welfare</option>
          </select>

          <input
            name="location"
            defaultValue={post.location}
            className="input input-bordered w-full"
            required
          />
          <input
            name="volunteersNeeded"
            defaultValue={post.volunteersNeeded}
            type="number"
            className="input input-bordered w-full"
            required
          />

          {/* React Date Picker */}
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
            placeholderText="Deadline"
          />

          <input
            className="input input-bordered w-full"
            defaultValue={user.displayName}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            defaultValue={user.email}
            readOnly
          />

          <button className="btn btn-primary md:col-span-2">Update Post</button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdatePage;
