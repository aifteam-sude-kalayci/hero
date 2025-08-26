import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const [currentDevice, setCurrentDevice] = useState(0);

  const devices = [
    {
      type: 'iPhoneX',
      image: '/src/assets/slider/mobil.jpg'
    },
    {
      type: 'iPad',
      image: '/src/assets/slider/grafik.jpg'
    },
    {
      type: 'MacBookPro',
      image: '/src/assets/slider/web-tk.jpg'
    }
  ];

  const nextDevice = () => {
    setCurrentDevice((prev) => (prev + 1) % devices.length);
  };

  const prevDevice = () => {
    setCurrentDevice((prev) => (prev - 1 + devices.length) % devices.length);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
         // Hero text animations with stagger
     tl.fromTo(titleRef.current, 
       { y: 100, opacity: 0, scale: 0.8 },
       { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
     )
     .fromTo(ctaRef.current,
       { y: 30, opacity: 0, scale: 0.9 },
       { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
       "-=0.6"
     );

    // Device slider animation
    gsap.fromTo('.device-frame',
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)", delay: 0.5 }
    );

    // Navigation buttons animation
    gsap.fromTo('.device-nav',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.8, stagger: 0.1 }
    );

    // Indicators animation
    gsap.fromTo('.indicator',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 1, stagger: 0.1 }
    );

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto slider effect with GSAP animations
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentDevice + 1) % devices.length;
      
      // Animate out current device
      gsap.to('.device-frame', {
        y: -30,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setCurrentDevice(nextIndex);
          // Animate in new device
          gsap.to('.device-frame', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)"
          });
        }
      });
    }, 4000); // Change device every 4 seconds

    return () => clearInterval(interval);
  }, [currentDevice, devices.length]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <div className="container">

          
          <div className="hero-devices">
            <div className="device-slider">
              <button className="device-nav prev" onClick={prevDevice}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
                             <div className="device-container">
                 {devices[currentDevice] && (
                   <div className={`device-frame ${devices[currentDevice].type.toLowerCase()}`}>
                     <div className="device-screen">
                       <img 
                         src={devices[currentDevice].image} 
                         alt={devices[currentDevice].title}
                       />
                     </div>
                     <div className="device-info">
                       <h3 className="device-title">{devices[currentDevice].title}</h3>
                       <p className="device-subtitle">{devices[currentDevice].subtitle}</p>
                     </div>
                   </div>
                 )}
               </div>
              
              <button className="device-nav next" onClick={nextDevice}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            
            <div className="device-indicators">
              {devices.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentDevice ? 'active' : ''}`}
                  onClick={() => setCurrentDevice(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}
