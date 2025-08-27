import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Register.css';

gsap.registerPlugin(ScrollTrigger);

export default function Register() {
  const registerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Page animation
    gsap.fromTo(registerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: registerRef.current,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added here
    console.log('Form submitted');
  };

  return (
    <section className="register-section" ref={registerRef}>
      {/* Floating Bubbles */}
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      
      <div className="container">
        <div className="register-content">
          <div className="register-header">
            <h1>Kayıt Olun</h1>
            <p>İnsan Kaynakları platformumuza katılın ve tüm İK süreçlerinizi dijitalleştirin</p>
          </div>
          
          <div className="register-form-container">
            <form className="register-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="companyName">Şirket Adı</label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  required 
                  placeholder="Şirketinizin adını girin"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Ad</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    required 
                    placeholder="Adınızı girin"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Soyad</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    required 
                    placeholder="Soyadınızı girin"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  placeholder="Telefon numaranızı girin"
                />
              </div>
              
              
              <div className="form-group">
                <label htmlFor="password">Şifre</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  placeholder="Şifrenizi oluşturun"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Şifre Tekrar</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  required 
                  placeholder="Şifrenizi tekrar girin"
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="terms" required />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    <a href="/kullanim-kosullari" target="_blank">Kullanım Koşulları</a> ve{' '}
                    <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a>'nı kabul ediyorum
                  </span>
                </label>
              </div>
              
              
              <button type="submit" className="btn btn-primary register-btn">
                Kayıt Ol
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>                     
          </div>
        </div>
      </div>
    </section>
  );
}
