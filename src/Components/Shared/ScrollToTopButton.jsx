import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="bg-green-600 hover:bg-green-500 text-white p-2.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none flex items-center justify-center border border-green-500/50 animate-bounce backdrop-blur-sm"
        >
          <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
