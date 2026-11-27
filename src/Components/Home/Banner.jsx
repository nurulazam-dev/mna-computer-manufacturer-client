import { useEffect, useState } from "react";
import { heroSlidesData } from "../../assets/data/AllData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = heroSlidesData?.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const activeSlide = heroSlidesData[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      aria-label="Featured banners"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[420px] sm:h-[500px] lg:h-[600px]">
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.title}
          className="absolute inset-0 h-full w-full object-cover animate-[bannerFade_0.7s_ease-in-out]"
        />

        <div className="absolute bottom-24 left-12 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-3 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-1 hover:bg-green-500"
          >
            Explore Products
            <FontAwesomeIcon
              icon={faArrowRight}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-sky-600/20 transition duration-300 hover:-translate-y-1 hover:bg-sky-600"
          >
            Contact Us
            <FontAwesomeIcon
              icon={faPhone}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-sm transition hover:bg-blue-600 sm:left-6 sm:h-12 sm:w-12"
        >
          &#10094;
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-sm transition hover:bg-blue-600 sm:right-6 sm:h-12 sm:w-12"
        >
          &#10095;
        </button>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {heroSlidesData?.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-9 bg-cyan-400"
                  : "w-2.5 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-20 hidden text-sm font-medium text-white sm:block">
          <span className="text-cyan-400">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-white/50">/</span>
          <span className="text-white/70">
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes bannerFade {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Banner;
