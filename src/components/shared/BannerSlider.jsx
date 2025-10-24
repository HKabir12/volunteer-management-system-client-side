import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://i.ibb.co/twrMvxqh/img1.webp",
    title: "Inspire Young Minds",
    desc: "Volunteer to teach and inspire the next generation.",
    btn: "Start Teaching",
  },
  {
    image: "https://i.ibb.co/VWSKTtCB/clean.jpg",
    title: "Clean Our Communities",
    desc: "Join local cleanup events and make your area shine.",
    btn: "Get Involved",
  },
  {
    image: "https://i.ibb.co/k21grDB7/img3.jpg",
    title: "Care for Animals",
    desc: "Help protect and care for stray and injured animals.",
    btn: "Volunteer Today",
  },
];

const BannerSlider = () => {
  return (
    <section className="relative w-full pt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="max-w-6xl mx-auto rounded-xl overflow-hidden h-[400px] md:h-[500px]"
        aria-label="Homepage promotional banner slider"
      >
        {slides.map(({ image, title, desc, btn }, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-center bg-cover flex items-center justify-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center space-y-5 max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-xl animate-fadeIn">
                  {title}
                </h2>
                <p className="text-lg md:text-xl text-white drop-shadow-lg animate-fadeIn delay-100">
                  {desc}
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform transition-all hover:scale-105 animate-fadeIn delay-200">
                  {btn}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
