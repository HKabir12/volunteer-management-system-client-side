import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch("/volunteers.json")
      .then((res) => res.json())
      .then((data) => setVolunteers(data));
  }, []);

  return (
    <motion.div
      className="my-10 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6"> Top Volunteers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl">
        {volunteers.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-4 text-center"
          >
            <img
              src={v.photo}
              alt={v.name}
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">{v.name}</h3>
            <p className="text-sm text-gray-600">{v.location}</p>
            <p className="text-md font-bold mt-2">
              Tasks Completed:{" "}
              <span className="text-primary">{v.tasksCompleted}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Volunteer;
