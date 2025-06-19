import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";

import BeVolunteerModal from "./BeVolunteerModal";
import { AuthContext } from "../provider/AuthProvider";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const VolunteerDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/volunteer-posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto p-6">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-3xl font-bold mt-4">{post.title}</h2>
        <p className="text-lg my-2">{post.description}</p>
        <p>
          <strong>Category:</strong> {post.category}
        </p>
        <p>
          <strong>Location:</strong> {post.location}
        </p>
        <p>
          <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(post.deadline).toLocaleDateString()}
        </p>
        <p>
          <strong>Organizer:</strong> {post.organizerName} (
          {post.organizerEmail})
        </p>

        {post.volunteersNeeded > 0 ? (
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-primary mt-4"
          >
            Be a Volunteer
          </button>
        ) : (
          <p className="text-red-500 mt-4 text-lg font-medium">
            No volunteers needed currently.
          </p>
        )}

        {openModal && (
          <BeVolunteerModal
            post={post}
            user={user}
            closeModal={() => setOpenModal(false)}
          />
        )}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default VolunteerDetails;
