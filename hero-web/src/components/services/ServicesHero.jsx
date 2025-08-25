import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ServicesHero.css';

export default function ServicesHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="services-hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Hizmetlerimiz</h1>
          <p className="hero-subtitle">
            Web tasarım, mobil yazılım, sosyal medya ve daha fazlası ile işinizi dijital dünyada güçlendirin.
          </p>
        </div>
      </div>
    </section>
  );
}
