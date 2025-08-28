import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

// Import assets
import iphoneImg from '../../assets/iphone.jpg';
import webImg from '../../assets/web.jpg';
import heroAiGif from '../../assets/maskot pozları/gifs/hero-ai.gif';
import girisCikisGif from '../../assets/maskot pozları/gifs/giris-cikis.gif';
import izinSagGif from '../../assets/maskot pozları/gifs/izin-sag.gif';
import izinGif from '../../assets/maskot pozları/gifs/izin.gif';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentDevice, setCurrentDevice] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const devices = [
    {
      type: 'iPhoneX',
      image: iphoneImg,
      title: 'Mobil İK Yönetimi',
      subtitle: 'Personel süreçlerinizi mobil cihazlardan yönetin',
      leftGif: heroAiGif,
      rightGif: girisCikisGif
    },
    {
      type: 'MacBookPro',
      image: webImg,
      title: 'Web İK Platformu',
      subtitle: 'Kapsamlı insan kaynakları yönetim sistemi',
      leftGif: izinSagGif,
      rightGif: izinGif
    }
  ];

  // Check if mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const totalSlides = 2; // 2 slides total

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Reset to first slide when switching between mobile/desktop
      if (mobile !== isMobile) {
        setCurrentDevice(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const nextDevice = () => {
    const nextIndex = (currentDevice + 1) % totalSlides;
    animateDeviceTransition(nextIndex);
  };

  const prevDevice = () => {
    const prevIndex = (currentDevice - 1 + totalSlides) % totalSlides;
    animateDeviceTransition(prevIndex);
  };

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextDevice();
    }
    if (isRightSwipe) {
      prevDevice();
    }
  };

  const animateDeviceTransition = (newIndex) => {
    // Animate out current devices with staggered timing
    const currentDevices = document.querySelectorAll('.device-frame');
    
    // Add animation class to right gif and force reflow
    const rightGif = document.querySelector('.right-gif .floating-gif');
    if (rightGif) {
      // Reset to initial position immediately
      rightGif.style.cssText = 'animation: none !important; transform: translate(200px, -200px) scale(0.6) !important; opacity: 0 !important;';
      
      // Force reflow
      rightGif.offsetHeight;
      
      // Add animation class
      rightGif.classList.add('slider-change');
      
      // Remove class and inline styles after animation completes
      setTimeout(() => {
        rightGif.classList.remove('slider-change');
        rightGif.style.cssText = '';
      }, 1200);
    }

    // Add animation class to left gif and force reflow
    const leftGif = document.querySelector('.left-gif .floating-gif');
    if (leftGif) {
      // Reset to initial position immediately
      leftGif.style.cssText = 'animation: none !important; transform: translate(-200px, -200px) scale(0.6) !important; opacity: 0 !important;';
      
      // Force reflow
      leftGif.offsetHeight;
      
      // Add animation class
      leftGif.classList.add('slider-change');
      
      // Remove class and inline styles after animation completes
      setTimeout(() => {
        leftGif.classList.remove('slider-change');
        leftGif.style.cssText = '';
      }, 1000);
    }
    
    gsap.to(currentDevices, {
      y: -80,
      opacity: 0,
      scale: 0.7,
      rotation: newIndex === 1 ? -15 : 15, // Add rotation for smooth transition
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.1,
      onComplete: () => {
        setCurrentDevice(newIndex);
        
        // Small delay for state update
        setTimeout(() => {
          const newDevices = document.querySelectorAll('.device-frame');
          
          // Animate in new devices with enhanced effects
          gsap.fromTo(newDevices, 
            {
              y: 80,
              opacity: 0,
              scale: 0.7,
              rotation: newIndex === 1 ? 15 : -15
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "back.out(1.7)",
              stagger: 0.15
            }
          );
        }, 50);
      }
    });



    // Enhanced device info animation
    const deviceInfo = document.querySelector('.device-info');
    if (deviceInfo) {
      gsap.to(deviceInfo, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(deviceInfo, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: 0.3
          });
        }
      });
    }
  };

  useEffect(() => {
    // Device slider animation
    const deviceFrames = document.querySelectorAll('.device-frame');
    if (deviceFrames.length > 0) {
      gsap.fromTo(deviceFrames,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)", delay: 0.5 }
      );
    }

    // Indicators animation
    const indicators = document.querySelectorAll('.indicator');
    if (indicators.length > 0) {
      gsap.fromTo(indicators,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 1, stagger: 0.1 }
      );
    }



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

  // Auto slider effect disabled - phone shows first and stays
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentDevice + 1) % totalSlides;
  //     
  //     // Use the same enhanced animation function
  //     animateDeviceTransition(nextIndex);
  //   }, 5000); // Change device every 5 seconds for better user experience

  //   return () => clearInterval(interval);
  // }, [currentDevice, totalSlides]);

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
            {/* Animated Slider Title */}
            <div className="slider-title-container">
              <h2 className="slider-title">
                <span className="title-word title-word-1">{devices[currentDevice].title}</span>
              </h2>
              <p className="slider-subtitle">{devices[currentDevice].subtitle}</p>
            </div>
            
                         <div 
                 className="device-slider" 
                 ref={sliderRef}
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}
               >
                 {/* Navigation Buttons */}
                 <button 
                   className="slider-nav-btn slider-nav-prev" 
                   onClick={prevDevice}
                   aria-label="Previous slide"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M15 18l-6-6 6-6"/>
                   </svg>
                 </button>
                 
                 <button 
                   className="slider-nav-btn slider-nav-next" 
                   onClick={nextDevice}
                   aria-label="Next slide"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M9 18l6-6-6-6"/>
                   </svg>
                 </button>
                {/* Left side GIF - For both phone and web */}
                <div className="side-gif left-gif">
                  <img 
                    src={devices[currentDevice].leftGif} 
                    alt="Left GIF"
                    className="floating-gif"
                  />
                </div>

                <div className="device-container">
                  {currentDevice === 0 ? (
                    <>
                      {/* First slider: Phone */}
                      <div className="device-frame iphonex phone-device">
                        <div className="device-screen">
                          <img 
                            src={devices[0].image} 
                            alt={devices[0].title}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Second slider: MacBook */}
                      <div className="device-frame macbookpro laptop-device">
                        <div className="device-screen">
                          <img 
                            src={devices[1].image} 
                            alt={devices[1].title}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right side GIF - For both phone and web */}
                <div className="side-gif right-gif">
                  <img 
                    src={devices[currentDevice].rightGif} 
                    alt="Right GIF"
                    className="floating-gif"
                  />
                </div>
              </div>
            
              <div className="device-indicators">
               {Array.from({ length: totalSlides }, (_, index) => (
                 <button
                   key={index}
                   className={`indicator ${index === currentDevice ? 'active' : ''}`}
                   onClick={() => animateDeviceTransition(index)}
                 />
               ))}
             </div>
          </div>
        </div>
      </div>      
    </section>
  );
}
