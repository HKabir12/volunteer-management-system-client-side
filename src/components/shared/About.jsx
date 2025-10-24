import React from "react";

const About = () => {
  return (
    <section className=" py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold  mb-8 text-center">
          About{" "}
          <span className="text-yellow-500">Volunteer Management System</span>
        </h2>

        {/* Description */}
        <p className=" text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto">
          Our Volunteer Management System connects passionate individuals with
          meaningful opportunities to make a difference. Whether you’re an
          organization seeking support or a volunteer ready to contribute, our
          platform makes it easy to post, manage, and find volunteering events.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              description:
                "Empower communities by connecting volunteers with opportunities that matter most.",
              iconBg: "bg-yellow-100",
            },
            {
              title: "Our Vision",
              description:
                "A world where every willing hand finds a cause that benefits society and enriches lives.",
              iconBg: "bg-yellow-100",
            },
            {
              title: "Our Values",
              description:
                "Collaboration, inclusivity, and dedication to making the world a better place through service.",
              iconBg: "bg-yellow-100",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center mb-4 mx-auto`}
              >
                {/* Placeholder for icon if needed */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
