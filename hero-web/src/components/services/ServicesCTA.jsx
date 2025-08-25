import React from 'react';
import './ServicesCTA.css';

export default function ServicesCTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Projenizi Hayata Geçirelim</h2>
          <p>Size özel çözümler için bizimle iletişime geçin</p>
          <button className="cta-btn">
            İletişime Geçin
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
