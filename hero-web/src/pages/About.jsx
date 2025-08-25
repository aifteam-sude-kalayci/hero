import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(heroRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Story section animation
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    storyTl.fromTo(storyRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    );

    // Values section animation
    const valuesTl = gsap.timeline({
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    valuesTl.fromTo(valuesRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hakkımızda
              <span className="highlight"> HERO</span>
            </h1>
            <p className="hero-subtitle">
              Dijital dünyada işletmelerin başarısı için çalışan, yenilikçi ve
              güvenilir bir ekibiz. 5 yılı aşkın deneyimimizle, müşterilerimizin
              dijital varlıklarını güçlendiriyoruz.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Mutlu Müşteri</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Tamamlanan Proje</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Yıllık Deneyim</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">%98</div>
                <div className="stat-label">Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story" ref={storyRef}>
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Hikayemiz</h2>
              <p>
                2019 yılında, dijital dünyada işletmelerin karşılaştığı zorlukları
                anlayarak HERO'yu kurduk. Amacımız, modern teknolojileri kullanarak
                müşterilerimizin dijital varlıklarını güçlendirmek ve onları
                rekabette öne çıkarmaktı.
              </p>
              <p>
                Bugün, 5 yılı aşkın deneyimimizle, web tasarımından sosyal medya
                yönetimine, yazılım geliştirmeden dijital pazarlamaya kadar geniş
                bir hizmet yelpazesi sunuyoruz. Her projede müşteri memnuniyetini
                ön planda tutarak, kaliteli ve sürdürülebilir çözümler üretiyoruz.
              </p>
              <p>
                Ekibimiz, sürekli kendini geliştiren, yenilikçi fikirler üreten
                ve en güncel teknolojileri takip eden profesyonellerden oluşuyor.
                Müşterilerimizin başarısı, bizim başarımızdır.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>HERO Ekibi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values" ref={valuesRef}>
        <div className="container">
          <h2 className="section-title text-center">Değerlerimiz</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3>Kalite</h3>
              <p>En yüksek kalite standartlarında hizmet sunuyor, her projede mükemmellik hedefliyoruz.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Yenilikçilik</h3>
              <p>Sürekli gelişen teknolojileri takip ediyor, yaratıcı çözümler üretiyoruz.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>İşbirliği</h3>
              <p>Müşterilerimizle yakın işbirliği kuruyor, onların vizyonunu hayata geçiriyoruz.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3>Zamanında Teslimat</h3>
              <p>Projelerimizi zamanında ve kaliteli bir şekilde teslim ediyoruz.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Güvenilirlik</h3>
              <p>Müşterilerimizin güvenini kazanmak için şeffaf ve dürüst çalışıyoruz.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3>7/24 Destek</h3>
              <p>Projeleriniz tamamlandıktan sonra da yanınızdayız. 7/24 teknik destek hizmeti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Projenizi Hayata Geçirelim</h2>
            <p>
              HERO ekibi olarak, dijital dünyada başarılı olmanız için buradayız.
              Hemen iletişime geçin, size en uygun çözümü sunalım.
            </p>
            <div className="cta-buttons">
              <Link to="/iletisim" className="btn btn-primary">
                İletişime Geçin
              </Link>
              <Link to="/hizmetler" className="btn btn-outline">
                Hizmetlerimizi İnceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


