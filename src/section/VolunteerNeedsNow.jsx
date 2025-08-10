import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutToggle from "../hooks/LayoutToggle";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [isTable, setIsTable] = useState(false);

  useEffect(() => {
    fetch("https://volunteer-management-xi.vercel.app/volunteer-posts/upcoming", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Fetch error:", error.message));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Volunteer Needs Now
        </h2>
        <LayoutToggle isTable={isTable} setIsTable={setIsTable} />
      </div>

      {/* Table View */}
      {isTable ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-14 h-10 sm:w-16 sm:h-12 object-cover rounded"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{new Date(post.deadline).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/volunteer-post/${post._id}`}>
                      <button className="btn btn-xs sm:btn-sm btn-primary">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="card shadow-md border rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
            >
              <figure>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-32 sm:h-36 w-full object-cover"
                />
              </figure>
              <div className="card-body p-3 sm:p-4">
                <h2 className="card-title text-sm sm:text-base font-semibold line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm">
                  <span className="font-medium">Category:</span> {post.category}
                </p>
                <p className="text-xs sm:text-sm">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end mt-2">
                  <Link to={`/volunteer-post/${post._id}`}>
                    <button className="btn btn-xs sm:btn-sm btn-primary">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See All Button */}
      <div className="text-center mt-5">
        <Link to="/all-volunteers">
          <button className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
