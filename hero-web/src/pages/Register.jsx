import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Register.css';
import formImg from '../assets/maskot pozları/masraf-formlarim.png';

gsap.registerPlugin(ScrollTrigger);

export default function Register() {
  const registerRef = useRef(null);
  const formRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
    
    // Input validation and formatting
    if (name === 'firstName' || name === 'lastName') {
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
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Validate password match
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && processedValue !== formData.password) {
        setPasswordError('Şifreler eşleşmiyor');
      } else if (name === 'password' && processedValue !== formData.confirmPassword && formData.confirmPassword) {
        setPasswordError('Şifreler eşleşmiyor');
      } else {
        setPasswordError('');
      }
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.companyName.trim()) {
      setError('Şirket adı gereklidir');
      return false;
    }
    
    // Validate first name
    if (!formData.firstName.trim()) {
      setError('Ad gereklidir');
      return false;
    }
    if (formData.firstName.trim().length < 2) {
      setError('Ad en az 2 karakter olmalıdır');
      return false;
    }
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.firstName.trim())) {
      setError('Ad sadece harf içermelidir');
      return false;
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      setError('Soyad gereklidir');
      return false;
    }
    if (formData.lastName.trim().length < 2) {
      setError('Soyad en az 2 karakter olmalıdır');
      return false;
    }
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.lastName.trim())) {
      setError('Soyad sadece harf içermelidir');
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
    
    // Validate password
    if (!formData.password) {
      setError('Şifre gereklidir');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return false;
    }
    
    if (!formData.termsAccepted) {
      setError('Kullanım koşullarını kabul etmelisiniz');
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
      // Prepare data for API (excluding confirmPassword)
      const apiData = {
        companyName: formData.companyName.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        termsAccepted: formData.termsAccepted
      };

      console.log('Sending registration data to HeroHRM API:', apiData);
      
      // Real API call to HeroHRM
      const response = await fetch('https://herohrm.xyz/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      setSuccess('Kayıt işlemi başarıyla tamamlandı! Giriş yapabilirsiniz.');
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset form
      setFormData({
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);

      // Optional: Redirect to login page after 2 seconds
      setTimeout(() => {
        // window.location.href = '/login';
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      
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
    
    <section className="register-section" ref={registerRef}>
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
        
        <div className="register-content">
           
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
          <div className="register-header">
            <h1>Kayıt Olun</h1>
          </div>
          
          <div className="register-form-container">
            <div className="form-image-overlay">
              <img 
                 src={formImg} 
                alt="Masraf Formlarım" 
                className="form-corner-img"
              />
            </div>
            
            <form className="register-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="companyName">Şirket Adı</label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required 
                  placeholder="Şirketinizin adını girin"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Ad</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    placeholder="Adınızı girin"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Soyad</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                    placeholder="Soyadınızı girin"
                    disabled={isLoading}
                  />
                </div>
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
                <label htmlFor="password">Şifre</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                  placeholder="Şifrenizi oluşturun"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Şifre Tekrar</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required 
                  placeholder="Şifrenizi tekrar girin"
                  disabled={isLoading}
                />
                {passwordError && (
                  <span className="error-text">{passwordError}</span>
                )}
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="termsAccepted" 
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required 
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    <a href="/kullanim-kosullari" target="_blank">Kullanım Koşulları</a> ve{' '}
                    <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a>'nı kabul ediyorum
                  </span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary register-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Kayıt Olunuyor...
                  </>
                ) : (
                  <>
                    Kayıt Ol
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
