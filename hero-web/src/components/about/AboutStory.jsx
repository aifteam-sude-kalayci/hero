import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutStory.css';

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
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum facilis obcaecati.
              Quo modi illo dolore, voluptatum delectus accusantium. Laborum voluptatum temporibus similique,
               a commodi molestiae nulla molestias aliquam ducimus!
            </p>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum facilis obcaecati.
            Quo modi illo dolore, voluptatum delectus accusantium. Laborum voluptatum temporibus similique,
            </p>
            
          </div>
          <div className="story-image">
            <img 
              src="/src/assets/maskot pozları/izin-tanimlari.png" 
              alt="İzin Tanımları" 
              className="story-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
