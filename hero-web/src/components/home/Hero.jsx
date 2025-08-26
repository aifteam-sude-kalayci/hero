import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              Dijital Dünyada
              <span className="highlight"> Öne Çıkın</span>
            </h1>
            
            <p ref={subtitleRef} className="hero-subtitle">
              Modern web tasarımı, sosyal medya yönetimi ve yazılım çözümleriyle 
              işinizi büyütün. Profesyonel ekibimizle hayalinizdeki dijital 
              varlığı oluşturalım.
            </p>
            
            <div ref={ctaRef} className="hero-cta">
              <Link to="/hizmetler" className="btn btn-primary">
                Hizmetlerimizi Keşfedin
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/iletisim" className="btn btn-secondary">
                Ücretsiz Danışmanlık
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Aşağı Kaydırın</span>
      </div>
    </section>
  );
}
