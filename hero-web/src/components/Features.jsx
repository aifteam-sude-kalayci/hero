import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Modern Teknolojiler",
    description: "En güncel teknolojileri kullanarak performanslı ve güvenli çözümler geliştiriyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: "#667eea"
  },
  {
    id: 2,
    title: "Responsive Tasarım",
    description: "Tüm cihazlarda mükemmel görünüm sağlayan responsive tasarımlar oluşturuyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: "#feca57"
  },
  {
    id: 3,
    title: "SEO Optimizasyonu",
    description: "Arama motorlarında üst sıralarda yer almanız için SEO uyumlu çözümler sunuyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    color: "#ff6b6b"
  },
  {
    id: 4,
    title: "7/24 Destek",
    description: "Projeleriniz tamamlandıktan sonra da yanınızdayız. 7/24 teknik destek hizmeti.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: "#48dbfb"
  },
  {
    id: 5,
    title: "Hızlı Teslimat",
    description: "Projelerinizi zamanında ve kaliteli bir şekilde teslim ediyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    color: "#0abde3"
  },
  {
    id: 6,
    title: "Güvenli Altyapı",
    description: "SSL sertifikaları ve güvenlik protokolleri ile verilerinizi koruyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: "#10ac84"
  }
];

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);

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
    .fromTo(featuresRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="features" ref={sectionRef}>
      <div className="container">
        <div className="features-header">
          <h2 ref={titleRef} className="section-title">
            Neden Bizi
            <span className="highlight"> Seçmelisiniz?</span>
          </h2>
          <p className="section-subtitle">
            HERO olarak, müşterilerimize en iyi hizmeti sunmak için sürekli kendimizi geliştiriyoruz. 
            İşte bizi farklı kılan özelliklerimiz.
          </p>
        </div>

        <div ref={featuresRef} className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card" style={{ "--accent-color": feature.color }}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              
              <div className="feature-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="features-stats">
          <div className="stat-item">
            <div className="stat-number">%99.9</div>
            <div className="stat-label">Uptime Garantisi</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24s</div>
            <div className="stat-label">Ortalama Yükleme Süresi</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">%100</div>
            <div className="stat-label">Müşteri Memnuniyeti</div>
          </div>
        </div>
      </div>
    </section>
  );
}
