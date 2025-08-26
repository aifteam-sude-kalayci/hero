import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutValues.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutValues() {
  const valuesRef = useRef(null);

  useEffect(() => {
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

  const values = [
    {
      id: 1,
      title: "Yenilikçilik",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum facilis",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Güvenilirlik",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum facilis",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Kalite",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum facilis",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
      )
    },
    
  ];

  return (
    <section className="about-values" ref={valuesRef}>
      <div className="container">
        <div className="values-header">
          <h2 className="section-title">Değerlerimiz</h2>
          <p className="section-subtitle">
            Çalışma prensiplerimizi oluşturan temel değerlerimiz
          </p>
        </div>
        <div className="values-grid">
          {values.map((value) => (
            <div key={value.id} className="value-card">
              <div className="value-icon">
                {value.icon}
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
