import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: 1, name: "Tabletop Weighing Scale", image: "https://res.cloudinary.com/dcajb02df/image/upload/v1756096258/crane_epbjyf.jpg", details: "Digital tabletop scale, high accuracy, up to 30kg.", link: "/digital-scale" },
  { id: 2, name: "Personal Weighing Scale", image: "https://res.cloudinary.com/dcajb02df/image/upload/v1756096348/table_top_hcsgug.jpg", details: "Glass body personal scale, measures up to 180kg.", link: "/personal-scale" },
  { id: 3, name: "Kitchen Scale", image: "https://res.cloudinary.com/dcajb02df/image/upload/v1756096266/Billing_Machine_bhpjrj.jpg", details: "Compact kitchen scale, up to 10kg capacity.", link: "/kitchen-scale" },
  { id: 4, name: "Tabletop Weighing Scale", image: "https://res.cloudinary.com/dcajb02df/image/upload/v1756096354/vela_counter_pulstu.jpg", details: "Digital tabletop scale, high accuracy, up to 30kg.", link: "/tabletop-scale" },
  { id: 5, name: "Personal Weighing Scale", image: "https://res.cloudinary.com/dcajb02df/image/upload/v1756096348/table_top_hcsgug.jpg", details: "Glass body personal scale, measures up to 180kg.", link: "/personal-scale" },
  { id: 6, name: "Kitchen Scale", image: "https://cdn.pixabay.com/photo/2024/09/22/23/40/butterfly-9067326_640.png", details: "Compact kitchen scale, up to 10kg capacity.", link: "/kitchen-scale" },
  { id: 7, name: "Tabletop Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/12/16/16/28/drinking-cups-7660117_640.jpg", details: "Digital tabletop scale, high accuracy, up to 30kg.", link: "/tabletop-scale" },
  { id: 8, name: "Personal Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/11/17/09/49/fog-7597710_640.jpg", details: "Glass body personal scale, measures up to 180kg.", link: "/personal-scale" },
  { id: 9, name: "Kitchen Scale", image: "https://cdn.pixabay.com/photo/2024/09/22/23/40/butterfly-9067326_640.png", details: "Compact kitchen scale, up to 10kg capacity.", link: "/kitchen-scale" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((p) => (p === 0 ? products.length - slidesPerView : p - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((p) => (p >= products.length - slidesPerView ? 0 : p + 1));
  };

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 400"
        >
          <path fill="#eef2ff" d="M0,160 C480,320 960,0 1440,160 L1440,400 L0,400 Z" />
          <circle cx="200" cy="100" r="40" fill="#c7d2fe" opacity="0.6" />
          <circle cx="1200" cy="220" r="60" fill="#a5b4fc" opacity="0.5" />
          <circle cx="700" cy="50" r="25" fill="#6366f1" opacity="0.4" />
          <circle cx="900" cy="70" r="19" fill="#6366f1" opacity="0.2" />
          

        </svg>
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-indigo-900 tracking-wide uppercase">
            Accurate Weighing Solutions for Every Need
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our wide range of weighing scales designed for kitchens,
            personal use, and professional industries — ensuring precision and reliability.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center">
          <ChevronLeft
            className="w-12 h-12 cursor-pointer text-gray-500 hover:text-indigo-600 transition hidden md:block"
            onClick={prevSlide}
          />
          <div
            className="flex overflow-hidden w-full mx-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80 bg-white">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="
    absolute inset-0 
    bg-gradient-to-t from-black/70 via-black/40 to-transparent 
    opacity-100 md:opacity-0 md:group-hover:opacity-100 
    flex flex-col justify-end p-5 
    transition duration-500 rounded-2xl
  ">
  <h3 className="text-lg sm:text-xl font-bold text-white">{product.name}</h3>
  <p className="text-sm text-gray-200 mt-1">{product.details}</p>
</div>

                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <ChevronRight
            className="w-12 h-12 cursor-pointer text-gray-500 hover:text-indigo-600 transition hidden md:block"
            onClick={nextSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
