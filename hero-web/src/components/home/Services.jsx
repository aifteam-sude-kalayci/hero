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
    id: 2,
    title: "Personel Yönetimi",
    description: "Çalışanlarınızın tüm bilgilerini merkezi bir sistemde yönetin. Personel kayıtları, sözleşme takibi ve performans değerlendirmeleri ile insan kaynakları süreçlerinizi dijitalleştirin.",
    image: personellerImg,
    features: ["Personel Kayıtları", "Sözleşme Takibi", "Performans Değerlendirme", "Çalışan Profilleri"],
    color: "#667eea"
  },
  {
    id: 3,
    title: "Departman Organizasyonu",
    description: "Şirket yapınızı organize edin. Departmanlar, pozisyonlar ve organizasyon şeması ile hiyerarşik yapınızı net bir şekilde görüntüleyin ve yönetin.",
    image: departmanlarImg,
    features: ["Organizasyon Şeması", "Departman Yönetimi", "Pozisyon Tanımları", "Hiyerarşi Takibi"],
    color: "#feca57"
  },
  {
    id: 4,
    title: "İzin & Tatil Yönetimi",
    description: "Çalışan izinlerini ve tatil planlarını kolayca yönetin. İzin talepleri, onay süreçleri ve tatil takvimi ile iş akışınızı optimize edin.",
    image: izinTanimlariImg,
    features: ["İzin Talepleri", "Onay Süreçleri", "Tatil Takvimi", "İzin Bakiye Takibi"],
    color: "#ff6b6b"
  },
  {
    id: 5,
    title: "Masraf Yönetimi",
    description: "Çalışan masraflarını dijital ortamda yönetin. Masraf formları, onay süreçleri ve raporlama ile şeffaf ve verimli bir masraf sistemi kurun.",
    image: masrafKategorileriImg,
    features: ["Masraf Formları", "Kategori Yönetimi", "Onay Süreçleri", "Raporlama"],
    color: "#48dbfb"
  },
  {
    id: 6,
    title: "Avans Sistemi",
    description: "Çalışan avans taleplerini dijital ortamda yönetin. Avans tipleri, onay süreçleri ve geri ödeme takibi ile finansal süreçlerinizi kolaylaştırın.",
    image: avansTipleriImg,
    features: ["Avans Talepleri", "Tip Yönetimi", "Onay Süreçleri", "Geri Ödeme Takibi"],
    color: "#0abde3"
  },
  {
    id: 8,
    title: "Etkinlik & Takvim",
    description: "Şirket etkinliklerini ve önemli tarihleri takip edin. Doğum günleri, resmi tatiller ve şirket etkinlikleri ile çalışan bağlılığını artırın.",
    image: etkinlikTakvimiImg,
    features: ["Etkinlik Takvimi", "Doğum Günü Hatırlatmaları", "Resmi Tatiller", "Şirket Etkinlikleri"],
    color: "#10ac84"
  }
];

// Circle class for canvas animation
class Circle {
  constructor(pos, rad, color) {
    this.pos = pos || null;
    this.radius = rad || null;
    this.color = color || null;
    this.active = 0;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
    ctx.fill();
  }
}

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);
  const canvasRef = useRef(null);
  const ctaRef = useRef(null);

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

  // Canvas animation effect
  useEffect(() => {
    if (!canvasRef.current || !ctaRef.current) return;

    let width, height, canvas, ctx, points, target, animateHeader = true;
    let animationId;

    const initHeader = () => {
      width = ctaRef.current.offsetWidth;
      height = ctaRef.current.offsetHeight;
      target = { x: width / 2, y: height / 2 };

      canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // create points
      points = [];
      for (let x = 0; x < width; x = x + width / 20) {
        for (let y = 0; y < height; y = y + height / 20) {
          const px = x + Math.random() * width / 20;
          const py = y + Math.random() * height / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (let i = 0; i < points.length; i++) {
        const closest = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (let i in points) {
        const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        points[i].circle = c;
      }
    };

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const drawLines = (p) => {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
        ctx.stroke();
      }
    };

    const shiftPoint = (p) => {
      gsap.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: "power2.inOut",
        onComplete: () => {
          shiftPoint(p);
        }
      });
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw(ctx);
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const mouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };

    const scrollCheck = () => {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    };

    const resize = () => {
      width = ctaRef.current.offsetWidth;
      height = ctaRef.current.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Initialize
    initHeader();
    animate();
    for (let i in points) {
      shiftPoint(points[i]);
    }

    // Add event listeners
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
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
            <Link key={service.id} to={`/hizmetler/${service.id}`} className="service-card-link">
              <div className="service-card" style={{ "--accent-color": service.color }}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                
                <div className="service-contents">
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
                  <div className="service-link">
                    Detayları Gör
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="services-cta" ref={ctaRef}>
          <canvas ref={canvasRef} className="cta-canvas"></canvas>
          <div className="cta-content">
            <h3>İnsan Kaynakları Süreçlerinizi Dijitalleştirin</h3>
            <p>Modern bir işletme için gerekli olan tüm İK çözümlerini sunuyoruz. Hala Kayıt olmadınız mı?</p>
          </div>
          <div className="cta-actions">
            <Link to="/kayit-ol" className="btn btn-primary">
              Kayıt Olun
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
