import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use 'react-router-dom' instead of 'react-router'
import LayoutToggle from "../hooks/LayoutToggle";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [isTable, setIsTable] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:3000/volunteer-posts/upcoming",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, []);

  //console.log(posts)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-primary">
          Volunteer Needs Now
        </h2>
        <LayoutToggle isTable={isTable} setIsTable={setIsTable} />
      </div>

      {isTable ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
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
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{new Date(post.deadline).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/volunteer-post/${post._id}`}>
                      <button className="btn btn-xs btn-primary">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="card shadow-xl border">
              <figure>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{post.title}</h2>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {post.category}
                </p>
                <p>
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/volunteer-post/${post._id}`}>
                    <button className="btn btn-sm btn-primary">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/all-volunteers">
          <button className="btn btn-outline btn-primary">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
