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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold ">
          Volunteer Needs Now
        </h2>
        <LayoutToggle isTable={isTable} setIsTable={setIsTable} />
      </div>

      {/* Table View */}
      {isTable ? (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y  table-auto">
            <thead className="">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium ">
                  #
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium  uppercase">
                  Thumbnail
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium  uppercase">
                  Title
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium  uppercase">
                  Category
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium  uppercase">
                  Deadline
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium  uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {posts.map((post, index) => (
                <tr
                  key={post._id}
                  className=" transition-colors"
                >
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-3 py-2">{post.title}</td>
                  <td className="px-3 py-2">{post.category}</td>
                  <td className="px-3 py-2">
                    {new Date(post.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className=" rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-sm  mt-1">
                  <span className="font-medium">Category:</span> {post.category}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <div className="mt-3 flex justify-end">
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
      <div className="text-center mt-8">
        <Link to="/all-volunteers">
          <button className="btn btn-outline btn-primary btn-sm sm:btn-md">
            See All
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VolunteerNeedsNow;
