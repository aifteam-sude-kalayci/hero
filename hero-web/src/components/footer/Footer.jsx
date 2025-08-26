import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo/logo.svg";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Link to="/">
                <img src={logo} alt="HERO Logo" />
              </Link>
            </div>
            <p className="footer-description">
              Dijital dünyada işletmelerin başarısı için çalışıyoruz. 
              Modern teknolojiler ve uzman ekibimizle projelerinizi hayata geçiriyoruz.
            </p>
            <div className="social-links">
  {/* Twitter */}
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.5 0c-2.63 0-4.77 2.14-4.77 4.77 0 .37.04.72.12 1.06A12.9 12.9 0 0 1 3.15.84a4.77 4.77 0 0 0-.64 2.4c0 1.65.84 3.1 2.12 3.95a4.5 4.5 0 0 1-2.16-.6v.06c0 2.3 1.63 4.22 3.78 4.65a4.7 4.7 0 0 1-2.15.08 4.78 4.78 0 0 0 4.45 3.3A9.07 9.07 0 0 1 1 19.54 12.79 12.79 0 0 0 7.29 21c8.8 0 13.62-7.28 13.62-13.6 0-.21 0-.42-.01-.63A9.6 9.6 0 0 0 23 3z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.92.001c-1.507 0-1.8.717-1.8 1.767v2.318h3.6l-.468 3.622h-3.132V24h6.137C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.405a4.92 4.92 0 0 1 1.774 1.153 4.92 4.92 0 0 1 1.153 1.774c.165.457.349 1.257.405 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.405 2.427a4.92 4.92 0 0 1-1.153 1.774 4.92 4.92 0 0 1-1.774 1.153c-.457.165-1.257.349-2.427.405-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.405a4.92 4.92 0 0 1-1.774-1.153 4.92 4.92 0 0 1-1.153-1.774c-.165-.457-.349-1.257-.405-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.405-2.427a4.92 4.92 0 0 1 1.153-1.774 4.92 4.92 0 0 1 1.774-1.153c.457-.165 1.257-.349 2.427-.405C8.416 2.175 8.796 2.163 12 2.163zm0 3.675a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm6.406-1.683a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88zM12 7.838a4.162 4.162 0 1 1 0 8.324 4.162 4.162 0 0 1 0-8.324z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452z"/>
    </svg>
  </a>
</div>

          </div>

          <div className="footer-section">
            <h4>Hizmetlerimiz</h4>
            <ul className="footer-links">
              <li><Link to="/hizmetler">Web Tasarım</Link></li>
              <li><Link to="/hizmetler">Sosyal Medya Yönetimi</Link></li>
              <li><Link to="/hizmetler">Grafik Tasarım</Link></li>
              <li><Link to="/hizmetler">Mobil Uygulama</Link></li>
              <li><Link to="/hizmetler">SAP Çözümleri</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Şirket</h4>
            <ul className="footer-links">
              <li><Link to="/hakkimizda">Hakkımızda</Link></li>
              <li><Link to="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>İletişim</h4>
            <div className="contact-info">
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Türkiye
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +90 (212) 000 0000
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@hero.com.tr
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} HERO. Tüm hakları saklıdır.</p>
            <div className="footer-bottom-links">
              <Link to="/gizlilik">Gizlilik Politikası</Link>
              <Link to="/kullanim-kosullari">Kullanım Koşulları</Link>
              <Link to="/cerez-politikasi">Çerez Politikası</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
