import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

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
      image: '/src/assets/iphone.jpg',
      title: 'Mobil Uygulama',
      subtitle: 'Modern ve kullanıcı dostu mobil deneyim'
    },
    {
      type: 'MacBookPro',
      image: '/src/assets/web.jpg',
      title: 'Web Tasarım',
      subtitle: 'Responsive ve modern web tasarım hizmetleri'
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
    gsap.fromTo('.device-frame',
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)", delay: 0.5 }
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

  // Auto slider effect with enhanced GSAP animations
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentDevice + 1) % totalSlides;
      
      // Use the same enhanced animation function
      animateDeviceTransition(nextIndex);
    }, 5000); // Change device every 5 seconds for better user experience

    return () => clearInterval(interval);
  }, [currentDevice, totalSlides]);

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
                                                   <div 
                className="device-slider" 
                ref={sliderRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
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
