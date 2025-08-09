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
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="max-w-6xl mx-auto rounded-xl overflow-hidden h-[400px] md:h-[500px] mt-4"
      aria-label="Homepage promotional banner slider"
    >
      {slides.map(({ image, title, desc, btn }, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Overlay */}
            <div className="bg-black/60 w-full h-full flex items-center justify-center px-6 rounded-xl ">
              <div className="text-white max-w-xl text-center space-y-5">
                <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                  {title}
                </h2>
                <p className="text-lg md:text-xl drop-shadow-md">{desc}</p>
                <button className="btn btn-primary btn-md shadow-lg hover:scale-105 transition-transform">
                  {btn}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
