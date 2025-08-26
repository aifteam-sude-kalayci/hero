import React from 'react';
import { Link } from 'react-router-dom';
import './AboutCTA.css';

export default function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Lorem İpsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quod! Vel, 
            nam. Minus perspiciatis eveniet quasi corrupti sapiente alias blanditiis repellendus,
          </p>
          <div className="cta-buttons">
            <Link to="/iletisim" className="cta-btn primary">
              İletişime Geçin
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
            <Link to="/hizmetler" className="cta-btn secondary">
              Hizmetlerimiz
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
