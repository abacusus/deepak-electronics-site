import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getproducts");
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching carousel products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Auto-sliding logic
  useEffect(() => {
    if (products.length > slidesPerView) {
      startTimer();
    }
    return () => stopTimer();
  }, [products, slidesPerView]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const prevSlide = () => {
    stopTimer();
    setCurrentIndex((p) => (p === 0 ? products.length - slidesPerView : p - 1));
    startTimer();
  };

  const nextSlide = () => {
    setCurrentIndex((p) => (p >= products.length - slidesPerView ? 0 : p + 1));
  };

  const handleTouchStart = (e) => {
    stopTimer();
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    startTimer();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12 overflow-hidden">
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
              className={`flex transition-transform duration-500 ease-in-out`}
              style={{ transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)` }}
            >
              {products.map((product) => (
                <div key={product.productId} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3">
                  <Link to={`/products/${product.productId}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80 bg-white border border-slate-100">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                        opacity-100 md:opacity-0 md:group-hover:opacity-100 
                        flex flex-col justify-end p-5 
                        transition duration-500 rounded-2xl
                      ">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest w-fit mb-2">
                            {product.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">{product.name}</h3>
                          <p className="text-indigo-300 font-black text-lg mt-1">₹{Number(product.price).toLocaleString('en-IN')}</p>
                          <p className="text-xs text-gray-300 mt-1 line-clamp-2">{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
