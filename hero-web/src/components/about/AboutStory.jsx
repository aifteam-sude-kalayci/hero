import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const storyRef = useRef(null);

  useEffect(() => {
    // Story section animation
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    storyTl.fromTo(storyRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="about-story" ref={storyRef}>
      <div className="container">
        <div className="story-content">
          <div className="story-text">
            <h2 className="section-title">Hikayemiz</h2>
            <p>
              2020 yılında kurulan HERO, dijital dönüşümün önemini kavrayarak
              işletmelerin dijital varlıklarını güçlendirmek amacıyla yola çıktı.
              Küçük bir ekiple başladığımız yolculuğumuzda, bugün 500'den fazla
              mutlu müşteriye hizmet veriyoruz.
            </p>
            <p>
              Teknoloji ve yaratıcılığı bir araya getirerek, her projeye özel
              çözümler üretiyoruz. Müşterilerimizin başarısı bizim başarımızdır
              anlayışıyla, her adımda yanlarında oluyoruz.
            </p>
            <div className="story-stats">
              <div className="story-stat">
                <div className="stat-number">2020</div>
                <div className="stat-label">Kuruluş Yılı</div>
              </div>
              <div className="story-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Uzman Ekip</div>
              </div>
              <div className="story-stat">
                <div className="stat-number">25+</div>
                <div className="stat-label">Sektör</div>
              </div>
            </div>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p>Şirket Görseli</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
