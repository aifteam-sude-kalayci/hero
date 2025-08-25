import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutHero.css';

export default function AboutHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(heroRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <section className="about-hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hakkımızda
            <span className="highlight"> HERO</span>
          </h1>
          <p className="hero-subtitle">
            Dijital dünyada işletmelerin başarısı için çalışan, yenilikçi ve
            güvenilir bir ekibiz. 5 yılı aşkın deneyimimizle, müşterilerimizin
            dijital varlıklarını güçlendiriyoruz.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Mutlu Müşteri</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Tamamlanan Proje</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Yıllık Deneyim</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">%98</div>
              <div className="stat-label">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
