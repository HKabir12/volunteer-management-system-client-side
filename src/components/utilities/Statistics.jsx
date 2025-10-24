import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedStat = ({ value, label, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(value / (duration * 60)); // assuming 60fps
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 1000 / 60); // 60 fps

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
      <h3 className="text-3xl font-extrabold text-yellow-500 mb-2">{count}</h3>
      <p className=" text-sm">{label}</p>
    </div>
  );
};

const Statistics = () => {
  const [stats, setStats] = useState({
    totalTasks: 1245,
    totalVolunteers: 320,
    totalEvents: 58,
    healthcareVolunteers: 120,
    educationVolunteers: 80,
    socialServiceVolunteers: 120,
  });

  const statItems = [
    { label: "Total Tasks Completed", value: stats.totalTasks },
    { label: "Total Volunteers", value: stats.totalVolunteers },
    { label: "Total Events", value: stats.totalEvents },
    { label: "Healthcare Volunteers", value: stats.healthcareVolunteers },
    { label: "Education Volunteers", value: stats.educationVolunteers },
    { label: "Social Service Volunteers", value: stats.socialServiceVolunteers },
  ];

  return (
    <section className=" py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
          Our Impact So Far
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <AnimatedStat value={item.value} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
