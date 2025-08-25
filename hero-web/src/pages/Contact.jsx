import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqData = [
    {
      question: "Hangi hizmetleri sunuyorsunuz?",
      answer: "Web tasarım, mobil uygulama geliştirme, sosyal medya yönetimi, grafik tasarım ve dijital pazarlama gibi geniş bir yelpazede hizmetler sunuyoruz."
    },
    {
      question: "Fiyatlandırma modeliniz nedir?",
      answer: "Projelerin kapsamına ve gereksinimlerine göre özel fiyatlandırma yapıyoruz. Detaylı bilgi için bizimle iletişime geçebilirsiniz."
    },
    {
      question: "Proje süreci nasıl işliyor?",
      answer: "İlk görüşme, teklif sunumu, tasarım ve geliştirme, test ve yayınlama adımlarını içeren şeffaf bir süreç izliyoruz."
    },
    {
      question: "Destek hizmeti sunuyor musunuz?",
      answer: "Evet, projeler tamamlandıktan sonra da teknik destek ve bakım hizmetleri sunuyoruz."
    },
    {
      question: "Referanslarınızı görebilir miyim?",
      answer: "Elbette, portföy sayfamızda tamamladığımız projeleri ve müşteri yorumlarını inceleyebilirsiniz."
    },
    {
      question: "Ekibiniz ne kadar deneyimli?",
      answer: "Ekibimiz, alanında uzman ve 5 yılı aşkın deneyime sahip profesyonellerden oluşmaktadır."
    }
  ];

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(heroRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Contact info and form animation
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactInfoRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    contactTl.fromTo(contactInfoRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    // Map animation
    const mapTl = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    mapTl.fromTo(mapRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form data:', formData);
      alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Bize Ulaşın
              <span className="highlight"> HERO</span>
            </h1>
            <p className="hero-subtitle">
              Dijital projeleriniz için bizimle iletişime geçin. Size özel çözümler sunalım.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Destek</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Memnuniyet</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Hızlı</div>
                <div className="stat-label">Yanıt</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info and Form Section - Two Column Layout */}
      <section className="contact-main-section" ref={contactInfoRef}>
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column - Contact Information */}
            <div className="contact-info-column">
              <h2 className="section-title">İletişim Bilgileri</h2>
              <div className="contact-info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Adresimiz</h3>
                    <p>İstanbul, Türkiye</p>
                    <a href="https://maps.app.goo.gl/your-location" target="_blank" rel="noopener noreferrer" className="info-link">
                      Yol Tarifi Al
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Telefon</h3>
                    <p>+90 (212) 555 0123</p>
                    <a href="tel:+902125550123" className="info-link">
                      Hemen Ara
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>E-posta</h3>
                    <p>info@hero.com.tr</p>
                    <a href="mailto:info@hero.com.tr" className="info-link">
                      E-posta Gönder
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Çalışma Saatleri</h3>
                    <p>Pzt - Cum: 09:00 - 18:00</p>
                    <p className="info-note">Hafta sonu kapalıyız</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="contact-form-column">
              <div className="form-header">
                <h2 className="section-title">Bizimle İletişime Geçin</h2>
                <p>
                  Projeniz hakkında konuşmak veya bir teklif almak için aşağıdaki formu doldurun.
                  En kısa sürede size geri dönüş yapacağız.
                </p>
              </div>
              <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Adınız Soyadınız</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Adınız Soyadınız"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-posta Adresiniz</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Telefon Numaranız</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+90 (XXX) XXX XX XX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Şirket Adınız (Opsiyonel)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Şirket Adınız"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="service">İlgilendiğiniz Hizmet</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Lütfen bir hizmet seçin</option>
                    <option value="web-tasarim">Web Tasarım</option>
                    <option value="sosyal-medya">Sosyal Medya Yönetimi</option>
                    <option value="grafik-tasarim">Grafik Tasarım</option>
                    <option value="mobil-uygulama">Mobil Uygulama Geliştirme</option>
                    <option value="sap-cozumleri">SAP Çözümleri</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Mesajınızı buraya yazın..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Mesajı Gönder
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section" ref={mapRef}>
        <div className="container">
          <h2 className="section-title text-center">Konumumuz</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <h3>Bizi Ziyaret Edin</h3>
              <p>
                İstanbul'daki ofisimizde sizi ağırlamaktan mutluluk duyarız.
                Randevu almak için bizimle iletişime geçin.
              </p>
              <div className="map-actions">
                <a href="https://maps.app.goo.gl/your-location" target="_blank" rel="noopener noreferrer" className="map-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                    <circle cx="10" cy="10" r="3"/>
                  </svg>
                  Yol Tarifi Al
                </a>
                <a href="tel:+902125550123" className="map-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Hemen Ara
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Collapsible */}
      <section className="contact-faq-section">
        <div className="container">
          <h2 className="section-title text-center">Sıkça Sorulan Sorular</h2>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-header">
                  <h3>{faq.question}</h3>
                  <div className="faq-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


