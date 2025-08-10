import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


import { X, Loader2, Pencil, Trash2, Ban } from "lucide-react";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [cancelingRequestId, setCancelingRequestId] = useState(null);
  
  // State for the custom confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({
    title: "",
    message: "",
    action: () => {},
  });

  const fetchMyPosts = () => {
    if (user?.email) {
      setLoadingPosts(true);
      fetch(`https://volunteer-management-xi.vercel.app/my-posts?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setMyPosts(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setMyPosts([]);
        })
        .finally(() => setLoadingPosts(false));
    }
  };

  const fetchMyRequests = () => {
    if (user?.email) {
      setLoadingRequests(true);
      fetch(`https://volunteer-management-xi.vercel.app/my-requests?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setMyRequests(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setMyRequests([]);
        })
        .finally(() => setLoadingRequests(false));
    }
  };

  useEffect(() => {
    fetchMyPosts();
    fetchMyRequests();
  }, [user?.email]);

  const handleDeletePost = (id) => {
    setConfirmModalData({
      title: "Confirm Deletion",
      message: "Are you sure you want to permanently delete this post?",
      action: async () => {
        setDeletingPostId(id);
        try {
          const res = await fetch(`https://volunteer-management-xi.vercel.app/volunteer-posts/${id}`, {
            method: "DELETE",
            credentials: "include",
          });
          const data = await res.json();
          if (data.deletedCount > 0) {
            setMyPosts((prev) => prev.filter((p) => p._id !== id));
          } else {
            console.error("Failed to delete post: Post not found.");
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        } finally {
          setDeletingPostId(null);
          setShowConfirmModal(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handleCancelRequest = (id) => {
    setConfirmModalData({
      title: "Cancel Request",
      message: "Are you sure you want to cancel your volunteer request?",
      action: async () => {
        setCancelingRequestId(id);
        try {
          const res = await fetch(`https://volunteer-management-xi.vercel.app/volunteer-requests/${id}`, {
            method: "DELETE",
            credentials: "include",
          });
          const data = await res.json();
          if (data.deletedCount > 0) {
            setMyRequests((prev) => prev.filter((r) => r._id !== id));
          } else {
            console.error("Failed to cancel request: Request not found.");
          }
        } catch (error) {
          console.error("Error canceling request:", error);
        } finally {
          setCancelingRequestId(null);
          setShowConfirmModal(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  // Custom confirmation modal component
  const ConfirmationModal = ({ title, message, action, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={action}
            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <X size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* My Posts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
            My Volunteer Need Posts
          </h2>
          {loadingPosts ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
          ) : myPosts.length === 0 ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-400">
              You haven't created any posts yet.
            </p>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Title</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Category</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Deadline</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPosts.map((post) => (
                      <tr key={post._id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <td className="p-4">{post.title}</td>
                        <td className="p-4">{post.category}</td>
                        <td className="p-4">{new Date(post.deadline).toLocaleDateString()}</td>
                        <td className="p-4 space-x-2 flex items-center">
                          <Link
                            to={`/update-post/${post._id}`}
                            className="p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            title="Update Post"
                          >
                            <Pencil size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors disabled:opacity-50"
                            disabled={deletingPostId === post._id}
                            title="Delete Post"
                          >
                            {deletingPostId === post._id ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* My Volunteer Requests Section */}
        <section>
          <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
            My Volunteer Request Posts
          </h2>
          {loadingRequests ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
          ) : myRequests.length === 0 ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-400">
              You have not requested to be a volunteer for any post yet.
            </p>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Post Title</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Organizer</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Status</th>
                      <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myRequests.map((req) => (
                      <tr key={req._id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <td className="p-4">{req.title}</td>
                        <td className="p-4">{req.organizerName}</td>
                        <td className="p-4 capitalize">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            req.status === 'requested' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            req.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleCancelRequest(req._id)}
                            className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors disabled:opacity-50"
                            disabled={cancelingRequestId === req._id}
                            title="Cancel Request"
                          >
                            {cancelingRequestId === req._id ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              <Ban size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          title={confirmModalData.title}
          message={confirmModalData.message}
          action={confirmModalData.action}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default ManageMyPosts;
