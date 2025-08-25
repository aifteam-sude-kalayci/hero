import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Web Tasarım & Geliştirme",
    description: "Modern, responsive ve kullanıcı dostu web siteleri tasarlıyoruz. SEO uyumlu ve hızlı yükleme süreleri ile işinizi dijital dünyada öne çıkarıyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    features: ["Responsive Tasarım", "SEO Optimizasyonu", "Hızlı Yükleme", "Modern Teknolojiler"],
    color: "#667eea"
  },
  {
    id: 2,
    title: "Sosyal Medya Yönetimi",
    description: "Sosyal medya hesaplarınızı profesyonel bir şekilde yönetiyoruz. İçerik üretimi, topluluk yönetimi ve reklam kampanyaları ile markanızı büyütüyoruz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    features: ["İçerik Üretimi", "Topluluk Yönetimi", "Reklam Kampanyaları", "Analitik Raporlama"],
    color: "#feca57"
  },
  {
    id: 3,
    title: "Grafik Tasarım",
    description: "Markanızın kimliğini yansıtan profesyonel grafik tasarım hizmetleri sunuyoruz. Logo, kurumsal kimlik ve pazarlama materyalleri ile fark yaratın.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    features: ["Logo Tasarımı", "Kurumsal Kimlik", "Pazarlama Materyalleri", "Dijital İllüstrasyon"],
    color: "#ff6b6b"
  },
  {
    id: 4,
    title: "Mobil Uygulama Geliştirme",
    description: "iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz. Kullanıcı deneyimi odaklı modern uygulamalar.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    features: ["iOS Uygulamaları", "Android Uygulamaları", "Cross-Platform", "UI/UX Tasarım"],
    color: "#48dbfb"
  },
  {
    id: 5,
    title: "SAP Çözümleri",
    description: "İşletmenizin ihtiyaçlarına özel SAP çözümleri geliştiriyoruz. ERP sistemleri, iş süreçleri otomasyonu ve veri yönetimi ile verimliliğinizi artırın.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    features: ["ERP Sistemleri", "İş Süreçleri", "Veri Yönetimi", "Entegrasyon"],
    color: "#0abde3"
  },
  {
    id: 6,
    title: "QR Menü & Rezervasyon",
    description: "Restoranlar için modern QR menü sistemleri ve online rezervasyon platformları geliştiriyoruz. Müşteri deneyimini artırın, operasyonel verimliliği sağlayın.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    ),
    features: ["QR Menü Sistemi", "Online Rezervasyon", "Masa Yönetimi", "Müşteri Takibi"],
    color: "#10ac84"
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);

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
    .fromTo(servicesRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <h2 ref={titleRef} className="section-title">
            Hizmetlerimiz
            <span className="highlight"> Çözümlerimiz</span>
          </h2>
          <p className="section-subtitle">
            Dijital dünyada başarılı olmak için ihtiyacınız olan tüm hizmetleri sunuyoruz. 
            Modern teknolojiler ve uzman ekibimizle projelerinizi hayata geçiriyoruz.
          </p>
        </div>

        <div ref={servicesRef} className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card" style={{ "--accent-color": service.color }}>
              <div className="service-icon">
                {service.icon}
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <div key={index} className="feature-tag">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="service-actions">
                <Link to={`/hizmetler#${service.id}`} className="service-link">
                  Detayları Gör
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Projenizi Hayata Geçirelim</h3>
            <p>Hangi hizmete ihtiyacınız olduğunu biliyor musunuz? Bizimle iletişime geçin, size en uygun çözümü sunalım.</p>
          </div>
          <div className="cta-actions">
            <Link to="/iletisim" className="btn btn-primary">
              Ücretsiz Danışmanlık
            </Link>
            <Link to="/hizmetler" className="btn btn-outline">
              Tüm Hizmetlerimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
