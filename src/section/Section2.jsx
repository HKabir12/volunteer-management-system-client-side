import { motion } from "framer-motion";

const Section2 = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-20 my-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-blue-50 rounded-xl p-8 shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-800">
          Upcoming Volunteer Events
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <img
              src="https://i.ibb.co/FL8Bqkhf/imgp1.jpg"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-4">Tree Plantation Drive</h3>
            <p className="text-gray-600">July 15, 2025 - Dhaka</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <img
              src="https://i.ibb.co/6RcyPCrc/blood-donation.jpg"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-4">Blood Donation Camp</h3>
            <p className="text-gray-600">August 2, 2025 - Chattogram</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <img
              src="https://i.ibb.co/k2PcdtKs/istockphoto-1077156290-612x612.jpg"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-4">Community Clean-up</h3>
            <p className="text-gray-600">August 10, 2025 - Rajshahi</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Section2;
