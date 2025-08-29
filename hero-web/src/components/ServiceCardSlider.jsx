import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServiceCardSlider.css';

export default function ServiceCardSlider({ services, currentServiceId }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const sliderRef = useRef(null);
  
  // Mevcut hizmeti hariç tut
  const filteredServices = services.filter(service => service.id !== currentServiceId);
  
  // Responsive card count
  const getCardsPerSlide = () => {
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  
  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());
  const totalSlides = Math.ceil(filteredServices.length / cardsPerSlide);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newCardsPerSlide = getCardsPerSlide();
      setCardsPerSlide(newCardsPerSlide);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Otomatik geçiş
  useEffect(() => {
    if (isAutoPlaying && !isMobile) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides, isMobile]);

  // Mouse hover durumunda otomatik geçişi durdur
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mevcut slide için hizmetleri al
  const getCurrentSlideServices = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return filteredServices.slice(startIndex, startIndex + cardsPerSlide);
  };

  // Handle card click to prevent slider navigation when clicking on cards
  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section className="service-card-slider">
      <div className="slider-container">
        <div className="slider-header">
          <h2>Diğer Hizmetler</h2>
          <p>Keşfetmek istediğiniz diğer hizmetlerimizi inceleyin</p>
        </div>

        <div 
          className="slider-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={sliderRef}
        >
          <div className="slider-track">
            {getCurrentSlideServices().map((service) => (
              <Link 
                key={service.id} 
                to={`/hizmetler/${service.id}`} 
                className="service-card-link"
                onClick={handleCardClick}
              >
                <div className="service-card">
                  <div className="card-image">
                    {service.gif ? (
                      <img src={service.gif} alt={`${service.title} Demo`} />
                    ) : (
                      <img src={service.image} alt={service.title} />
                    )}
                  </div>
                  <div className="card-content">
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                    <div className="card-link">
                      Detayları Gör
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons - Hidden on mobile */}
          {!isMobile && (
            <>
              <button 
                className="slider-nav prev" 
                onClick={prevSlide}
                aria-label="Önceki slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              
              <button 
                className="slider-nav next" 
                onClick={nextSlide}
                aria-label="Sonraki slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
            </>
          )}

          {/* Mobile Navigation Dots */}
          {isMobile && (
            <div className="mobile-nav">
              <button 
                className="mobile-nav-btn prev" 
                onClick={prevSlide}
                aria-label="Önceki slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              
              <div className="mobile-dots">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    className={`mobile-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="mobile-nav-btn next" 
                onClick={nextSlide}
                aria-label="Sonraki slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
            </div>
          )}

          {/* Desktop Dots Indicator */}
          {!isMobile && (
            <div className="slider-dots">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
