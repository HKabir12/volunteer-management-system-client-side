import React from "react";
import { Shield, Leaf, HeartHandshake } from "lucide-react";

// === Feature Data ===
const featuresData = [
  {
    title: "Safe havens for support",
    description:
      "Children in poverty often lack access to spaces like playgrounds or recreation centers. They’re more likely to be exposed to the dangers of violence, gangs and drugs at an early age. Your support allows them to take refuge in one of our 67+ community centers — safe, clean and uplifting spaces where children can learn and grow away from outside stressors.",
    image: "https://placehold.co/400x300/fcd34d/333?text=Safe+Haven",
    Icon: Shield,
  },
  {
    title: "Good that grows",
    description:
      "When you sponsor a child, you change their future — helping them see beyond daily struggles. Your support empowers children to create a better life for themselves, their families, and their communities, starting a powerful multiplier effect that improves lives worldwide.",
    image: "https://placehold.co/400x300/fcd34d/333?text=Sponsorship",
    Icon: Leaf,
  },
  {
    title: "Customized programs",
    description:
      "Your sponsorship includes health, social, and educational programs tailored to each community. This proven, long-term approach helps children and youth tackle challenges that might otherwise hold them back — empowering them to become healthy, educated, and productive adults.",
    image: "https://placehold.co/400x300/fcd34d/333?text=Programs",
    Icon: HeartHandshake,
  },
];

// === Individual Card ===
const FeatureCard = ({ title, description, image, Icon }) => (
  <div className=" rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col text-center">
    {/* Image */}
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover rounded-t-2xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/400x300/333/fff?text=No+Image";
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl border-4 border-transparent pointer-events-none"
        style={{
          boxShadow: "0 0 0 4px #ffedd5 inset, 0 6px 12px rgba(0,0,0,0.1)",
        }}
      />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col items-center flex-grow">
      <div className="p-3 bg-amber-50 rounded-full text-amber-500 mb-4">
        <Icon size={26} strokeWidth={1.6} />
      </div>
      <h3 className="text-lg font-semibold  mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-left">
        {description}
      </p>
    </div>
  </div>
);

// === Main Section ===
const WhyDifferent = () => {
  return (
    <section className="mt-16 pt-12 border-t ">
      {/* Title & Intro */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold  mb-4">
          What makes <span className="text-amber-500">Gainlove</span> different?
        </h2>
        <p className="text-base  leading-relaxed">
          We’re a top-rated humanitarian organization focused on ending
          generational poverty through a proven approach. For over 80 years,
          we’ve developed a high-impact methodology that empowers children and
          youth to break free from poverty — giving them access to education,
          healthcare, and safe community spaces.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {featuresData.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyDifferent;
