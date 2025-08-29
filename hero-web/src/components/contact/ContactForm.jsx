import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactForm.css';


gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Page animation
    gsap.fromTo(contactRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%"
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current.children,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        ease: "power2.out", 
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
    
    // Input validation and formatting
    if (name === 'name') {
      // Only allow letters, spaces, and Turkish characters
      processedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
    } else if (name === 'phone') {
      // Format phone number: +90 555 123 45 67
      let phoneValue = value.replace(/\D/g, ''); // Remove all non-digits
      
      if (phoneValue.length > 0) {
        if (phoneValue.startsWith('90')) {
          phoneValue = phoneValue.substring(2);
        }
        if (phoneValue.length > 0) {
          if (phoneValue.length <= 3) {
            processedValue = `+90 ${phoneValue}`;
          } else if (phoneValue.length <= 6) {
            processedValue = `+90 ${phoneValue.substring(0, 3)} ${phoneValue.substring(3)}`;
          } else if (phoneValue.length <= 8) {
            processedValue = `+90 ${phoneValue.substring(0, 3)} ${phoneValue.substring(3, 6)} ${phoneValue.substring(6)}`;
          } else {
            processedValue = `+90 ${phoneValue.substring(0, 3)} ${phoneValue.substring(3, 6)} ${phoneValue.substring(6, 8)} ${phoneValue.substring(8, 10)}`;
          }
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  // Validate form
  const validateForm = () => {
    // Validate name
    if (!formData.name.trim()) {
      setError('Ad soyad gereklidir');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError('Ad soyad en az 2 karakter olmalıdır');
      return false;
    }
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.name.trim())) {
      setError('Ad soyad sadece harf içermelidir');
      return false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      setError('E-posta gereklidir');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Geçerli bir e-posta adresi giriniz');
      return false;
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      setError('Telefon numarası gereklidir');
      return false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Geçerli bir telefon numarası giriniz');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);

    } catch (err) {
      console.error('Contact form error:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      
      // Scroll to top for error messages too
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section" ref={contactRef}>
      {/* Meteor Shower */}
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      
      {/* Floating Bubbles */}
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      
      <div className="container">
        
        <div className="contact-content">
           
            {/* Alert Messages Container */}
            <div className="alert-container">
              {/* Success Message */}
              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}
            </div>
          <div className="contact-header">
            <h1>Bizimle İletişime Geçin</h1>
          </div>
          
          <div className="contact-form-container">            
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    placeholder="Adınız ve soyadınız"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="E-posta adresinizi girin"
                    disabled={isLoading}
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
                    required 
                    placeholder="+90 555 123 45 67"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Şirket</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Şirket adınız (opsiyonel)"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mesaj</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  disabled={isLoading}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary contact-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Mesaj Gönder
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  );
}
