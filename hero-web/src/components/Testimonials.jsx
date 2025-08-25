import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    position: "CEO, TechStart",
    company: "TechStart",
    content: "HERO ile çalışmak gerçekten harika bir deneyimdi. Web sitemizi sıfırdan tasarladılar ve sonuç muhteşem. Müşteri hizmetleri de çok profesyonel.",
    rating: 5,
    avatar: "AY"
  },
  {
    id: 2,
    name: "Ayşe Demir",
    position: "Pazarlama Müdürü",
    company: "RestoranPlus",
    content: "QR menü sistemimizi HERO'ya yaptırdık. Hem kullanıcı dostu hem de çok pratik. Müşterilerimiz çok memnun, biz de çok memnunuz.",
    rating: 5,
    avatar: "AD"
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    position: "Kurucu",
    company: "DigitalAgency",
    content: "Sosyal medya yönetimi hizmeti aldık. Takipçi sayımız ve etkileşim oranlarımız inanılmaz arttı. Kesinlikle tavsiye ederim.",
    rating: 5,
    avatar: "MK"
  },
  {
    id: 4,
    name: "Fatma Özkan",
    position: "İşletme Sahibi",
    company: "Boutique Hotel",
    content: "Rezervasyon sistemimizi HERO'ya yaptırdık. Artık online rezervasyonlarımız çok daha kolay. Teknik destek de her zaman yanımızda.",
    rating: 5,
    avatar: "FÖ"
  },
  {
    id: 5,
    name: "Can Arslan",
    position: "Yazılım Geliştirici",
    company: "StartupXYZ",
    content: "Mobil uygulamamızı HERO ile geliştirdik. Hem iOS hem Android'de mükemmel çalışıyor. Kod kalitesi ve performans gerçekten üst seviye.",
    rating: 5,
    avatar: "CA"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    .fromTo(testimonialsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header">
          <h2 ref={titleRef} className="section-title">
            Müşterilerimiz
            <span className="highlight"> Ne Diyor?</span>
          </h2>
          <p className="section-subtitle">
            Başarılı projelerimiz ve mutlu müşterilerimiz. İşte HERO ile çalışan 
            müşterilerimizin deneyimleri ve yorumları.
          </p>
        </div>

        <div ref={testimonialsRef} className="testimonials-content">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>
              
              <p className="testimonial-text">
                {testimonials[currentIndex].content}
              </p>
              
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[currentIndex].avatar}
              </div>
              <div className="author-info">
                <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                <p className="author-position">{testimonials[currentIndex].position}</p>
                <p className="author-company">{testimonials[currentIndex].company}</p>
              </div>
            </div>
          </div>

          <div className="testimonials-navigation">
            <button className="nav-btn prev-btn" onClick={prevTestimonial}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                />
              ))}
            </div>
            
            <button className="nav-btn next-btn" onClick={nextTestimonial}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Mutlu Müşteri</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Ortalama Puan</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">%100</div>
            <div className="stat-label">Memnuniyet Oranı</div>
          </div>
        </div>
      </div>
    </section>
  );
}
