import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About{" "}
          <span className="text-primary">Volunteer Management System</span>
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          Our Volunteer Management System is designed to connect passionate
          individuals with meaningful opportunities to make a difference.
          Whether you’re an organization looking for support or a volunteer
          ready to contribute your time and skills, our platform makes it easy
          to post, manage, and find volunteering events.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              Empower communities by connecting volunteers with opportunities
              that matter most.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              A world where every willing hand finds a cause that benefits
              society and enriches lives.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm">
              Collaboration, inclusivity, and dedication to making the world a
              better place through service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
