import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: 1, name: "Tabletop Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/12/16/16/28/drinking-cups-7660117_640.jpg", details: "Digital tabletop scale, high accuracy, up to 30kg.", link: "/digital-scale" },
  { id: 2, name: "Personal Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/11/17/09/49/fog-7597710_640.jpg", details: "Glass body personal scale, measures up to 180kg.", link: "/personal-scale" },
  { id: 3, name: "Kitchen Scale", image: "https://cdn.pixabay.com/photo/2024/09/22/23/40/butterfly-9067326_640.png", details: "Compact kitchen scale, up to 10kg capacity.", link: "/kitchen-scale" },
  { id: 4, name: "Tabletop Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/12/16/16/28/drinking-cups-7660117_640.jpg", details: "Digital tabletop scale, high accuracy, up to 30kg.", link: "/tabletop-scale" },
  { id: 5, name: "Personal Weighing Scale", image: "https://cdn.pixabay.com/photo/2022/11/17/09/49/fog-7597710_640.jpg", details: "Glass body personal scale, measures up to 180kg.", link: "/personal-scale" },
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

  //  slides
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3); // lg:w-1/3
      else if (window.innerWidth >= 640) setSlidesPerView(2); // sm:w-1/2
      else setSlidesPerView(1); // mobile full width
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - slidesPerView : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= products.length - slidesPerView ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 ">
        <div className="text-center font-mono font-sherif 
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                text-black tracking-wide uppercase 
                ">
  Accurate Weighing Solutions for Every Need
</div>

      <div className="flex items-center">
        {/* Left Arrow */}
        <ChevronLeft
          className="w-12 h-12 cursor-pointer text-gray-600 hover:text-black hidden md:block"
          onClick={prevSlide}
        />

        {/* Carousel */}
        <div
          className="flex overflow-hidden w-full mx-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3"
              >
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Hover  effect */}
                    <div className="absolute inset-0 bg-white/10 bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition duration-300 p-3 text-center">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-sm mt-2">{product.details}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <ChevronRight
          className="w-12 h-12 cursor-pointer text-gray-600 hover:text-black hidden md:block"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
};

export default Carousel;
