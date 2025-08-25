import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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
    }
  ];

  // Toast notification function
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    if (!name.trim()) {
      return 'Ad soyad alanı zorunludur';
    }
    if (!nameRegex.test(name)) {
      return 'Ad soyad sadece harf içerebilir';
    }
    if (name.trim().length < 2) {
      return 'Ad soyad en az 2 karakter olmalıdır';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'E-posta alanı zorunludur';
    }
    if (!emailRegex.test(email)) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\(\)\+\-]+$/;
    if (!phone.trim()) {
      return 'Telefon alanı zorunludur';
    }
    if (!phoneRegex.test(phone)) {
      return 'Geçerli bir telefon numarası giriniz';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return 'Telefon numarası en az 10 haneli olmalıdır';
    }
    return '';
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format based on length
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else if (digitsOnly.length <= 8) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6, 8)} ${digitsOnly.slice(8, 10)}`;
    }
  };

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Contact section animation
    gsap.fromTo(contactRef.current.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out", 
        stagger: 0.1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Special handling for different field types
    if (name === 'name') {
      // Only allow letters and spaces for name
      processedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
    } else if (name === 'phone') {
      // Format phone number
      processedValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Lütfen tüm zorunlu alanları doğru şekilde doldurun.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form data:', formData);
      showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === 'success' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              )}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button 
              className="toast-close" 
              onClick={() => setToast({ show: false, message: '', type: '' })}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="contact-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">İletişim</h1>
            <p className="hero-subtitle">
              Projeleriniz için bizimle iletişime geçin. Size özel çözümler sunalım.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" ref={contactRef}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>İletişim Bilgileri</h2>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Adres</h3>
                    <p>İstanbul, Türkiye</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Telefon</h3>
                    <p>+90 (212) 555 0123</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>E-posta</h3>
                    <p>info@hero.com.tr</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Çalışma Saatleri</h3>
                    <p>Pzt - Cum: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Mesaj Gönderin</h2>
              <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Adınız Soyadınız *"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-posta Adresiniz *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon Numaranız *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      placeholder="Şirket Adınız (Opsiyonel)"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Hizmet Seçin</option>
                    <option value="web-tasarim">Web Tasarım</option>
                    <option value="mobil-uygulama">Mobil Uygulama</option>
                    <option value="sosyal-medya">Sosyal Medya</option>
                    <option value="grafik-tasarim">Grafik Tasarım</option>
                    <option value="sap-cozumleri">SAP Çözümleri</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Mesajınız..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}


