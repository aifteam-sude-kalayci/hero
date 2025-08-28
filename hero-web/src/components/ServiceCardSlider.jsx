import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServiceCardSlider.css';

export default function ServiceCardSlider({ services, currentServiceId }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  
  // Mevcut hizmeti hariç tut
  const filteredServices = services.filter(service => service.id !== currentServiceId);
  const totalSlides = Math.ceil(filteredServices.length / 4);

  // Otomatik geçiş
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

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

  // Mevcut slide için hizmetleri al
  const getCurrentSlideServices = () => {
    const startIndex = currentSlide * 1;
    return filteredServices.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="service-card-slider">
      <div className="">
        <div className="slider-header">
          <h2>Diğer Hizmetler</h2>
        </div>

        <div 
          className="slider-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="slider-track">
            {getCurrentSlideServices().map((service) => (
              <div key={service.id} className="service-card">
                <div className="card-image">
                  {service.gif ? (
                    <img src={service.gif} alt={`${service.title} Demo`} />
                  ) : (
                    <img src={service.image} alt={service.title} />
                  )}
                </div>
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <Link to={`/hizmet/${service.id}`} className="card-link">
                    Detayları Gör
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
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

          {/* Dots Indicator */}
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
        </div>
      </div>
    </section>
  );
}
