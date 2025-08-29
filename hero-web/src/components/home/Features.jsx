import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Kolay Kullanım",
    description: "Kullanıcı dostu arayüzümüz ile İK süreçlerinizi kolayca yönetebilirsiniz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11H1a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
        <path d="M23 11h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
        <path d="M13 1a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1z"/>
        <path d="M13 23a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"/>
      </svg>
    ),
    color: "#667eea"
  },
  {
    id: 2,
    title: "Mobil Uyumlu",
    description: "Tüm cihazlardan erişebileceğiniz responsive tasarım ile her yerden yönetim.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    color: "#feca57"
  },
  {
    id: 3,
    title: "Güvenli Veri",
    description: "SSL sertifikaları ve şifreleme ile çalışan verilerinizi güvenle koruyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: "#ff6b6b"
  },
  {
    id: 4,
    title: "7/24 Destek",
    description: "Teknik destek ekibimiz her zaman yanınızda. Sorularınız için 7/24 hizmet.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: "#48dbfb"
  },
  {
    id: 5,
    title: "Hızlı Entegrasyon",
    description: "Mevcut sistemlerinizle kolayca entegre olan modüler yapımız.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: "#0abde3"
  },
  {
    id: 6,
    title: "Detaylı Raporlama",
    description: "İK süreçlerinizi analiz eden kapsamlı raporlama ve analitik araçları.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
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
            Platformumuzun
            <span className="highlight"> Avantajları</span>
          </h2>
          <p className="section-subtitle">
            İnsan kaynakları süreçlerinizi dijitalleştirirken size en iyi deneyimi sunmak için 
            geliştirdiğimiz özelliklerimiz.
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
      </div>
    </section>
  );
}
