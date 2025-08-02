import Swal from "sweetalert2";

const BeVolunteerModal = ({ post, user, closeModal }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const suggestion = form.suggestion.value;

    const { _id, ...postWithoutId } = post;

    const volunteerRequest = {
      ...postWithoutId,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion,
      status: "requested",
    };

    try {
      const res = await fetch("http://localhost:3000/volunteer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify(volunteerRequest),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          toast: true,
          position: "top-right",
          icon: "success",
          title: "Request submitted successfully!",
          showConfirmButton: false,
          timer: 2500,
        });
        closeModal();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-2xl w-[95%] max-w-2xl relative shadow-xl">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-red-600 text-xl font-bold hover:text-red-800"
        >
          ✖
        </button>
        <h3 className="text-2xl font-semibold text-center mb-6 text-primary">
          Be a Volunteer
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="input input-bordered w-full"
            value={post.thumbnail}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={post.title}
            readOnly
          />
          <textarea
            className="textarea textarea-bordered md:col-span-2"
            value={post.description}
            readOnly
          />

          <input
            className="input input-bordered w-full"
            value={post.category}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={post.location}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={post.volunteersNeeded}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={new Date(post.deadline).toLocaleDateString()}
            readOnly
          />

          <input
            className="input input-bordered w-full"
            value={post.organizerName}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={post.organizerEmail}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={user.displayName}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={user.email}
            readOnly
          />

          <textarea
            name="suggestion"
            className="textarea textarea-bordered md:col-span-2"
            placeholder="Your suggestion (optional)"
          />

          <button className="btn btn-primary md:col-span-2 w-full">
            Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeVolunteerModal;
