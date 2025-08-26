import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

// Maskot pozlarından görselleri import ediyorum
import personellerImg from '../../assets/maskot pozları/personeller.png';
import departmanlarImg from '../../assets/maskot pozları/departmanlar.png';
import izinTanimlariImg from '../../assets/maskot pozları/izin-tanimlari.png';
import masrafKategorileriImg from '../../assets/maskot pozları/masraf-kategorileri.png';
import avansTipleriImg from '../../assets/maskot pozları/avans-tipleri.png';
import etkinlikTakvimiImg from '../../assets/maskot pozları/etkinlik-takvimi.png';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Personel Yönetimi",
    description: "Çalışanlarınızın tüm bilgilerini merkezi bir sistemde yönetin. Personel kayıtları, sözleşme takibi ve performans değerlendirmeleri ile insan kaynakları süreçlerinizi dijitalleştirin.",
    image: personellerImg,
    features: ["Personel Kayıtları", "Sözleşme Takibi", "Performans Değerlendirme", "Çalışan Profilleri"],
    color: "#667eea"
  },
  {
    id: 2,
    title: "Departman Organizasyonu",
    description: "Şirket yapınızı organize edin. Departmanlar, pozisyonlar ve organizasyon şeması ile hiyerarşik yapınızı net bir şekilde görüntüleyin ve yönetin.",
    image: departmanlarImg,
    features: ["Organizasyon Şeması", "Departman Yönetimi", "Pozisyon Tanımları", "Hiyerarşi Takibi"],
    color: "#feca57"
  },
  {
    id: 3,
    title: "İzin & Tatil Yönetimi",
    description: "Çalışan izinlerini ve tatil planlarını kolayca yönetin. İzin talepleri, onay süreçleri ve tatil takvimi ile iş akışınızı optimize edin.",
    image: izinTanimlariImg,
    features: ["İzin Talepleri", "Onay Süreçleri", "Tatil Takvimi", "İzin Bakiye Takibi"],
    color: "#ff6b6b"
  },
  {
    id: 4,
    title: "Masraf Yönetimi",
    description: "Çalışan masraflarını dijital ortamda yönetin. Masraf formları, onay süreçleri ve raporlama ile şeffaf ve verimli bir masraf sistemi kurun.",
    image: masrafKategorileriImg,
    features: ["Masraf Formları", "Kategori Yönetimi", "Onay Süreçleri", "Raporlama"],
    color: "#48dbfb"
  },
  {
    id: 5,
    title: "Avans Sistemi",
    description: "Çalışan avans taleplerini dijital ortamda yönetin. Avans tipleri, onay süreçleri ve geri ödeme takibi ile finansal süreçlerinizi kolaylaştırın.",
    image: avansTipleriImg,
    features: ["Avans Talepleri", "Tip Yönetimi", "Onay Süreçleri", "Geri Ödeme Takibi"],
    color: "#0abde3"
  },
  {
    id: 6,
    title: "Etkinlik & Takvim",
    description: "Şirket etkinliklerini ve önemli tarihleri takip edin. Doğum günleri, resmi tatiller ve şirket etkinlikleri ile çalışan bağlılığını artırın.",
    image: etkinlikTakvimiImg,
    features: ["Etkinlik Takvimi", "Doğum Günü Hatırlatmaları", "Resmi Tatiller", "Şirket Etkinlikleri"],
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
            İnsan Kaynakları
            <span className="highlight"> Çözümlerimiz</span>
          </h2>
          <p className="section-subtitle">
            Modern işletmelerin ihtiyaç duyduğu tüm insan kaynakları süreçlerini dijitalleştiriyoruz. 
            Personel yönetiminden masraf takibine kadar her şey tek platformda.
          </p>
        </div>

        <div ref={servicesRef} className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card" style={{ "--accent-color": service.color }}>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
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
            <h3>İnsan Kaynakları Süreçlerinizi Dijitalleştirin</h3>
            <p>Modern bir işletme için gerekli olan tüm İK çözümlerini sunuyoruz. Hangi modüle ihtiyacınız olduğunu biliyor musunuz?</p>
          </div>
          <div className="cta-actions">
            <Link to="/iletisim" className="btn btn-primary">
              Ücretsiz Demo
            </Link>
            <Link to="/hizmetler" className="btn btn-outline">
              Tüm Modüller
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
