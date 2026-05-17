import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
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
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[9999] p-3 rounded-full cursor-pointer shadow-lg bg-secondary text-white hover:bg-main transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
