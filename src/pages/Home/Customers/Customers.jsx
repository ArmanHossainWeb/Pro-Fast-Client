import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Customers.css"; // 👈 Add custom styles here

const Customers = () => {
  const customerData = [
    {
      id: 1,
      name: "Awlad Hossin",
      title: "Senior Product Designer",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Fitness Coach",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 3,
      name: "David Lee",
      title: "Chiropractor",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 4,
      name: "Maria Gomez",
      title: "Yoga Instructor",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=21",
    },
    {
      id: 5,
      name: "James Carter",
      title: "Software Engineer",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 6,
      name: "Emily Smith",
      title: "Occupational Therapist",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=31",
    },
    {
      id: 7,
      name: "Michael Brown",
      title: "UX Designer",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=17",
    },
    {
      id: 8,
      name: "Jessica White",
      title: "Nurse Practitioner",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=26",
    },
    {
      id: 9,
      name: "Liam Davis",
      title: "Marketing Executive",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 10,
      name: "Chloe Wilson",
      title: "Student",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back.",
      image: "https://i.pravatar.cc/150?img=39",
    },
  ];

  return (
    <section className="bg-gray-100 py-20 pb-40 px-4 md:px-10">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          What our customers are saying
        </h1>
        <p className="text-gray-600">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true}
        centeredSlidesBounds={true}
        grabCursor={true}
        speed={600}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        loop={true}
        className="relative"
        breakpoints={{
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {customerData.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
            className="swiper-slide-scale flex justify-center"
          >
            <div className="bg-white max-w-sm rounded-2xl p-6 shadow-lg text-center transition-all duration-300">
              <div className="text-5xl text-lime-500 mb-2">❝</div>
              <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                {testimonial.feedback}
              </p>
              <div className="flex items-center gap-4 justify-center mt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-sm text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button className="prev-btn bg-white border p-3 rounded-full shadow-md hover:bg-gray-200">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <button className="next-btn bg-lime-400 border p-3 rounded-full shadow-md hover:bg-lime-500">
          <FaArrowRight className="text-white" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="custom-pagination mt-6 flex justify-center gap-2" />
    </section>
  );
};

export default Customers;
