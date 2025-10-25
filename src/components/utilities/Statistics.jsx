import React, { useEffect, useState } from "react";
import { Gift, Users, LayoutGrid, Wallet } from "lucide-react";

// === Stats Data ===
const statsData = [
  {
    value: 4.89,
    suffix: "M",
    description: "Staff and volunteers across 16 countries",
    Icon: Gift,
  },
  {
    value: 68,
    suffix: "K",
    description: "Of our staff in these countries are local",
    Icon: Users,
  },
  {
    value: 82,
    suffix: "%",
    description: "Funds invested in impact programs (2025)",
    Icon: LayoutGrid,
  },
  {
    value: 136,
    suffix: "M",
    description: "Total raised for global initiatives (2025)",
    Icon: Wallet,
  },
];

// === Count-Up Animation Hook ===
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

// === Individual Stat Card ===
const StatCard = ({ value, suffix, description, Icon }) => {
  const count = useCountUp(value);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-amber-50 rounded-full text-amber-500">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-800">
          {count.toFixed(count >= 10 ? 0 : 1)}
          {suffix}
        </h3>
      </div>
      <p className="text-sm text-gray-500 leading-snug">{description}</p>
    </div>
  );
};

// === Main Statistics Section ===
export default function Statistics() {
  return (
    <section className=" py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-2/5">
          <h2 className="text-4xl sm:text-5xl font-extrabold  leading-tight mb-8 border-l-4 border-amber-500 pl-4">
            Volunteer Positions Available
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statsData.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>

        {/* Right Content (Map or Placeholder) */}
        <div className="flex-1 flex items-center justify-center lg:pt-32">
          <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-amber-400 to-green-400 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-semibold">
            🌍 Volunteer Map Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}
