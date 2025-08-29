import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutStory.css';
import izinTanimlariImg from '../../assets/maskot pozları/izin-tanimlari.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const storyRef = useRef(null);

  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="about-story" ref={storyRef}>
      <div className="container">
        <div className="story-content">
          <div className="story-text">
            <h2 className="section-title">Hikayemiz</h2>
            <p>
              Hero HRM'in hikayesi, modern iş dünyasının karmaşık insan kaynakları süreçlerini 
              basitleştirme vizyonuyla başladı. Geleneksel IK yönetiminin zaman alıcı ve 
              verimsiz süreçlerini gözlemleyerek, teknoloji ile insan faktörünü birleştiren 
              yenilikçi bir çözüm geliştirmeye karar verdik.
            </p>
            <p>
              Bugün Hero HRM, yüzlerce şirketin güvendiği bir platform haline geldi. 
              Yapay zeka destekli özelliklerimiz ve kullanıcı dostu arayüzümüzle, 
              insan kaynakları yönetimini hem çalışanlar hem de yöneticiler için 
              daha keyifli ve verimli hale getiriyoruz.
            </p>
            
          </div>
          <div className="story-image">
            <img 
              src={izinTanimlariImg} 
              alt="İzin Tanımları" 
              className="story-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
