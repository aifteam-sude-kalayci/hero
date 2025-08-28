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
              Hero HRM'e
              <span className="highlight"> Hoşgeldiniz</span>
            </h2>
            
            <div ref={contentRef} className="about-description">
              <p>
                Hero HRM, modern işletmelerin insan kaynakları süreçlerini dijitalleştiren ve 
                optimize eden kapsamlı bir platformdur. Yapay zeka destekli çözümlerimizle 
                şirketinizin İK operasyonlarını daha verimli, şeffaf ve kullanıcı dostu hale getiriyoruz.
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
              <img src={heroAiGif} alt="AI Destekli İK Asistanı" className="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
