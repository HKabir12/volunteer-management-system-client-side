import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const AllVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://volunteer-management-chi.vercel.app/volunteer-posts?search=${search}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [search]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          All Volunteer Needs
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by Post Title"
            className="input input-bordered w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm">Category: {post.category}</p>
                <p className="text-sm">
                  Deadline: {new Date(post.deadline).toLocaleDateString()}
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
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllVolunteerPosts;
