import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 ref={titleRef} className="section-title">
              Hakkımızda
              <span className="highlight"> HERO</span>
            </h2>
            
            <div ref={contentRef} className="about-description">
              <p>
                HERO olarak, dijital dünyada işletmelerin başarısı için çalışıyoruz. 
                5 yılı aşkın deneyimimizle, modern teknolojileri kullanarak 
                müşterilerimizin dijital varlıklarını güçlendiriyoruz.
              </p>
              
              <p>
                Web tasarımından sosyal medya yönetimine, yazılım geliştirmeden 
                dijital pazarlamaya kadar geniş bir hizmet yelpazesi sunuyoruz. 
                Her projede müşteri memnuniyetini ön planda tutarak, 
                kaliteli ve sürdürülebilir çözümler üretiyoruz.
              </p>
            </div>



            <Link to="/hakkimizda" className="btn btn-outline">
              Daha Fazla Bilgi
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="about-image">
            <div className="image-wrapper">
              <div className="image-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span>HERO Ekibi</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="about-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-number">500+</div>
              <div className="stat-label">Mutlu Müşteri</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Tamamlanan Proje</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-number">5+</div>
              <div className="stat-label">Yıllık Deneyim</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-number">%98</div>
              <div className="stat-label">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
