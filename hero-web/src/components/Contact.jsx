import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

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
    .fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section className="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-header">
          <h2 ref={titleRef} className="section-title">
            Bizimle
            <span className="highlight"> İletişime Geçin</span>
          </h2>
          <p className="section-subtitle">
            Projeniz hakkında konuşmak ister misiniz? Size en uygun çözümü sunmak için 
            buradayız. Ücretsiz danışmanlık için hemen iletişime geçin.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="info-content">
                <h4>Adres</h4>
                <p>İstanbul, Türkiye<br />Merkez Mahallesi, Teknoloji Caddesi No:123</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="info-content">
                <h4>Telefon</h4>
                <p>+90 (212) 555 0123<br />+90 (532) 555 0123</p>
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
                <h4>E-posta</h4>
                <p>info@hero.com.tr<br />destek@hero.com.tr</p>
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
                <h4>Çalışma Saatleri</h4>
                <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 09:00 - 14:00</p>
              </div>
            </div>
          </div>

          <div ref={formRef} className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Hizmet Türü</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Hizmet seçiniz</option>
                    <option value="web-design">Web Tasarım</option>
                    <option value="social-media">Sosyal Medya Yönetimi</option>
                    <option value="graphic-design">Grafik Tasarım</option>
                    <option value="mobile-app">Mobil Uygulama</option>
                    <option value="sap">SAP Çözümleri</option>
                    <option value="qr-menu">QR Menü & Rezervasyon</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mesajınız *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Projeniz hakkında detaylı bilgi veriniz..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <span>Mesaj Gönder</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
