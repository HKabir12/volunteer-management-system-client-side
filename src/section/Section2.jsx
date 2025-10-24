import { motion } from "framer-motion";

const events = [
  {
    title: "Tree Plantation Drive",
    date: "July 15, 2025",
    location: "Dhaka",
    image: "https://i.ibb.co/FL8Bqkhf/imgp1.jpg",
  },
  {
    title: "Blood Donation Camp",
    date: "August 2, 2025",
    location: "Chattogram",
    image: "https://i.ibb.co/6RcyPCrc/blood-donation.jpg",
  },
  {
    title: "Community Clean-up",
    date: "August 10, 2025",
    location: "Rajshahi",
    image: "https://i.ibb.co/k2PcdtKs/istockphoto-1077156290-612x612.jpg",
  },
];

const Section2 = () => {
  return (
    <section className="py-6 ">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Upcoming Volunteer Events
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {event.date} - {event.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
