import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ContactHero.css';

export default function ContactHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="contact-hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">İletişim</h1>
          <p className="hero-subtitle">
            Projelerinizi hayata geçirmek için bizimle iletişime geçin
          </p>
        </div>
      </div>
    </section>
  );
}
