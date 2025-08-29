import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

// Gifs klasöründen görseli import ediyorum
import heroAiGif from '../../assets/maskot pozları/gifs/hero-ai.gif';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

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
    .fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 ref={titleRef} className="section-title">
              HERO HRM'e
              <span className="highlight"> Hoşgeldiniz</span>
            </h2>
            
            <div ref={contentRef} className="about-description">
              <p>
                Hero HRM, modern işletmelerin insan kaynakları süreçlerini dijitalleştiren ve 
                optimize eden kapsamlı bir platformdur. Yapay zeka destekli çözümlerimizle 
                şirketinizin IK operasyonlarını daha verimli, şeffaf ve kullanıcı dostu hale getiriyoruz.
              </p>
              
              <p>
                Personel yönetimi, izin takibi, masraf raporları, avans talepleri ve daha fazlası 
                için tek bir platformda tüm ihtiyaçlarınızı karşılıyoruz. Hero HRM ile 
                insan kaynakları yönetimi artık çok daha kolay ve etkili.
              </p>
            </div>
          </div>

          <div className="about-image">
            <div className="image-wrapper">
              {/* Circular animated text */}
              <div className="circular-text-container">
                <svg className="circular-text" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4facfe" />
                      <stop offset="100%" stopColor="#00f2fe" />
                    </linearGradient>
                    <path id="circle-path" d="M 200,200 m -180,0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0" />
                  </defs>
                  <text className="circular-text-content">
                    <textPath href="#circle-path" startOffset="0%">
                     • HERO HRM AI • HERO HRM AI • HERO HRM AI • 
                    </textPath>
                  </text>
                </svg>
              </div>
              
              <img src={heroAiGif} alt="AI Destekli IK Asistanı" className="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
