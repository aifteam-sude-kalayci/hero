import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Clients.css';
import grafikImg from '../assets/slider/grafik.jpg';
import sapImg from '../assets/slider/sap.jpg';
import webtkImg from '../assets/slider/web-tk.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const clientsRef = useRef(null);

  useEffect(() => {
    // Clients section animation
    const clientsTl = gsap.timeline({
      scrollTrigger: {
        trigger: clientsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    clientsTl.fromTo(clientsRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Grafik Tasarım Çözümleri",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,",
      image: grafikImg,
      alt: "Trust & Co."
    },
    {
      id: 2,
      title: "SAP Çözümleri",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,",
      image: sapImg,
      alt: "Tonic"
    },
    {
      id: 3,
      title: "Web Tasarım Çözümleri",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,",
      image: webtkImg,
      alt: "Shower Gel"
    }
  ];

  return (
    <section className="clients-section" ref={clientsRef}>
      <div className="section-header">
        <h2>Hizmetlerimiz</h2>
        <p className="section-subtitle">Müşterilerimiz için geliştirdiğimiz yenilikçi yazılım çözümleri</p>
      </div>
      <div className="clients-grid">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="card-inner" style={{ "--clr": "#fff" }}>
              <div className="box">
                <div className="imgBox">
                  <img src={service.image} alt={service.alt} />
                </div>
                <div className="icon">
                  <a href="#" className="iconBox">
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
