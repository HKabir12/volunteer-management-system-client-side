import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    image: 'https://i.ibb.co/twrMvxqh/img1.webp',
    title: 'Inspire Young Minds',
    desc: 'Volunteer to teach and inspire the next generation.',
    btn: 'Start Teaching',
  },
  {
    image: 'https://i.ibb.co/VWSKTtCB/clean.jpg',
    title: 'Clean Our Communities',
    desc: 'Join local cleanup events and make your area shine.',
    btn: 'Get Involved',
  },
  {
    image: 'https://i.ibb.co/k21grDB7/img3.jpg',
    title: 'Care for Animals',
    desc: 'Help protect and care for stray and injured animals.',
    btn: 'Volunteer Today',
  },
];

const BannerSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="max-w-6xl mx-auto h-[400px] rounded-xl"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="max-w-6xl mx-auto h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/60 w-full h-full flex items-center justify-center rounded-xl">
              <div className="text-white text-center space-y-4 px-4">
                <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                <p className="text-lg">{slide.desc}</p>
                <button className="btn btn-primary">{slide.btn}</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
