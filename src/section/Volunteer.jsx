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
    <motion.section
      className="py-6 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Top Volunteers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {volunteers.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
          >
            <img
              src={v.photo}
              alt={v.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-yellow-400 shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
              {v.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{v.location}</p>
            <div className="mt-3 px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold shadow-sm">
              Tasks Completed: {v.tasksCompleted}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Volunteer;
