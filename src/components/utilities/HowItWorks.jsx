import { FaSearch, FaHandsHelping, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks= () => {
  const steps = [
    {
      icon: <FaSearch size={28} className="text-yellow-500" />,
      title: "Browse Volunteer Posts",
      desc: "Explore upcoming volunteer opportunities that match your interests and skills.",
    },
    {
      icon: <FaHandsHelping size={28} className="text-yellow-500" />,
      title: "Join an Event",
      desc: "Sign up for events and contribute your time to causes that matter.",
    },
    {
      icon: <FaChartLine size={28} className="text-yellow-500" />,
      title: "Track Your Impact",
      desc: "See how your contributions help the community and inspire others.",
    },
  ];

  return (
    <section className=" py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
