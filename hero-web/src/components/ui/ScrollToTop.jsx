import { useState, useEffect } from 'react';
import './ScrollToTop.css';
import heroAiGif from '../../assets/maskot pozları/gifs/hero-ai.gif';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll pozisyonunu takip et
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // En üste scroll yap
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="En üste çık"
        >
          <img 
            src={heroAiGif} 
            alt="Hero AI" 
            className="hero-ai-gif"
          />
        </button>
      )}
    </>
  );
}
