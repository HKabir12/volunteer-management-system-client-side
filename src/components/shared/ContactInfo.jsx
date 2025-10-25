"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback("");

    if (!formData.name || !formData.email || !formData.message) {
      setFeedback("⚠️ Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback("✅ Thank you! We’ve received your message and will reply soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  // Contact info component
  const ContactInfo = ({ Icon, title, text }) => (
    <div className="flex items-start gap-4 p-4  rounded-2xl shadow-md hover:shadow-lg transition">
      <div className="p-3  rounded-full text-amber-600 flex-shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm ">{text}</p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen  py-16 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold  mb-4">
            Contact Our Volunteer Team
          </h1>
          <p className="text-lg  max-w-2xl mx-auto">
            Have questions about volunteering, donations, or events? Get in touch with our support team — we’re here to help.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2  p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold -800 mb-6">
              Send Us a Message
            </h2>

            {feedback && (
              <div
                className={`p-3 mb-6 rounded-lg text-sm font-medium ${
                  feedback.startsWith("✅")
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {feedback}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border  rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="jane@example.org"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border  rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Inquiry about volunteering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium tmb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border  rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-none"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-md hover:shadow-xl transition w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4">
              Contact Details
            </h2>
            <div className="space-y-4">
              <ContactInfo Icon={Phone} title="Call Us" text="+1 (555) 123-4567" />
              <ContactInfo Icon={Mail} title="Email" text="volunteer@globalcare.org" />
              <ContactInfo
                Icon={MapPin}
                title="Head Office"
                text="123 Global Street, City, Country"
              />
            </div>

            {/* Google Map */}
            <div className="mt-8">
              <iframe
                title="Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.7546610128814!2d90.3854!3d23.8358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c9b9c9d57b7f%3A0x1a1b3bcd2a4a9!2sDhaka!5e0!3m2!1sen!2sbd!4v1706714800000"
                className="w-full h-60 rounded-xl shadow-md"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
