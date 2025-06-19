import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    image: 'https://i.ibb.co/YTYTFgBB/Volunteer1.png',
    title: 'Make a Difference',
    desc: 'Join our volunteer team and change lives today.',
    btn: 'Join Now',
  },
  {
    image: 'https://i.ibb.co/sWdTWqB/volunteer2.jpg',
    title: 'Be a Community Hero',
    desc: 'Your time and skill can bring smiles to many.',
    btn: 'Learn More',
  },
  {
    image: 'https://i.ibb.co/XW8GBrf/volunteer3.jpg',
    title: 'Support Local Causes',
    desc: 'Stand with us in making the world a better place.',
    btn: 'Explore',
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
            <div className="bg-black/60 w-full h-full flex items-center justify-center">
              <div className="text-white text-center space-y-4 px-4">
                <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                <p>{slide.desc}</p>
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
