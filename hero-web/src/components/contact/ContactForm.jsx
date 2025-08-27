import React, { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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
    } else if (digitsOnly.length <= 10) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 8)}-${digitsOnly.slice(8, 10)}`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Special handling for name field - only letters and spaces
    if (name === 'name') {
      processedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
    }
    
    // Special handling for phone field - format phone number
    if (name === 'phone') {
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
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Lütfen form hatalarını düzeltin', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      
    } catch (error) {
      showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-section">
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

      <div className="container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Bizimle İletişime Geçin</h2>
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
                  className={errors.name ? 'error' : ''}
                  placeholder="Adınız ve soyadınız"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-posta *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="ornek@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Telefon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="(555) 123-45-67"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Şirket</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Şirket adınız"
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
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
