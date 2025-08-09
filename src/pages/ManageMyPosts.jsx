import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Corrected import
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  // Fetch My Posts
  useEffect(() => {
    if (user?.email) {
      fetch(`https://volunteer-management-xi.vercel.app/my-posts?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMyPosts(data);
          } else {
            console.error("Unexpected posts response:", data);
            setMyPosts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [user?.email]);

  // Fetch My Volunteer Requests
  useEffect(() => {
    if (user?.email) {
      fetch(`https://volunteer-management-xi.vercel.app/my-requests?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMyRequests(data);
          } else {
            console.error("Unexpected requests response:", data);
            setMyRequests([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        });
    }
  }, [user?.email]);

  // Delete Post
  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-management-xi.vercel.app/volunteer-posts/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Post has been deleted.", "success");
              setMyPosts((prev) => prev.filter((p) => p._id !== id));
            }
          });
      }
    });
  };

  // Cancel Volunteer Request
  const handleCancelRequest = (id) => {
    Swal.fire({
      title: "Cancel your request?",
      text: "This cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-management-xi.vercel.app/volunteer-requests/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Cancelled!",
                "Your request has been cancelled.",
                "success"
              );
              setMyRequests((prev) => prev.filter((r) => r._id !== id));
            } else {
              Swal.fire(
                "Failed",
                "Request not found or already deleted.",
                "error"
              );
            }
          });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* My Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-4">My Volunteer Need Posts</h2>
          {myPosts.length === 0 ? (
            <p>No posts found. Add a volunteer need post.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>{new Date(post.deadline).toLocaleDateString()}</td>
                      <td className="space-x-2">
                        <Link
                          to={`/update-post/${post._id}`}
                          className="btn btn-sm btn-info"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* My Volunteer Requests */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            My Volunteer Request Posts
          </h2>
          {myRequests.length === 0 ? (
            <p>You have not requested to be a volunteer in any post yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Post Title</th>
                    <th>Organizer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.title}</td>
                      <td>{req.organizerName}</td>
                      <td>{req.status}</td>
                      <td>
                        <button
                          onClick={() => handleCancelRequest(req._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ManageMyPosts;
