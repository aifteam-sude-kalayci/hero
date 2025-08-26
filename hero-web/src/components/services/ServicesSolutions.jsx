import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSolutions.css';

// Import images
import webTkImage from '../../assets/slider/web-tk.jpg';
import sapImage from '../../assets/slider/sap.jpg';
import rezervasyonImage from '../../assets/slider/rezervasyon.jpg';
import qrImage from '../../assets/slider/qr.jpg';
import mobilImage from '../../assets/slider/mobil.jpg';
import grafikImage from '../../assets/slider/grafik.jpg';
import sosyalMedyaImage from '../../assets/slider/sosyal-medya.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSolutions() {
  const solutionsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const solutions = [
    {
      id: 1,
      title: "Yazılım Çözümleri",
      description: "İşinizi yazılımla güçlendirin",
      image: webTkImage,
      category: "software"
    },
    {
      id: 2,
      title: "SAP Çözümleri",
      description: "SAP ile süreçlerinizi hızlandırın",
      image: sapImage,
      category: "sap"
    },
    {
      id: 3,
      title: "Rezervasyon Çözümleri",
      description: "Rezervasyonları kolaylaştır, memnuniyeti artır",
      image: rezervasyonImage,
      category: "reservation"
    },
    {
      id: 4,
      title: "QR Menü Çözümleri",
      description: "Menülerinizi dijitalleştirin",
      image: qrImage,
      category: "qr"
    },
    {
      id: 5,
      title: "Web Tasarım Çözümleri",
      description: "Markanıza dijital kimlik kazandırın",
      image: webTkImage,
      category: "web"
    },
    {
      id: 6,
      title: "Mobil Uygulama Çözümleri",
      description: "Mobil dünyada yerinizi alın",
      image: mobilImage,
      category: "mobile"
    },
    {
      id: 7,
      title: "Grafik Tasarım Çözümleri",
      description: "Görsellerle markanızı güçlendirin",
      image: grafikImage,
      category: "graphic"
    },
    {
      id: 8,
      title: "Sosyal Medya Çözümleri",
      description: "Sosyal medyada fark yaratın",
      image: sosyalMedyaImage,
      category: "social"
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(solutions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSolutions = solutions.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of solutions section
    if (solutionsRef.current) {
      solutionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  useEffect(() => {
    // Solutions animation
    gsap.fromTo(solutionsRef.current.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out", 
        stagger: 0.1,
        scrollTrigger: {
          trigger: solutionsRef.current,
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentPage]); // Re-run animation when page changes

  return (
    <section className="solutions-section" ref={solutionsRef}>
      <div className="container">
        <div className="section-header">
          <h2>Hizmetlerimiz</h2>
          <p>İşinizi büyütmek için ihtiyacınız olan tüm dijital çözümler</p>
        </div>
        
        <div className="solutions-grid">
          {currentSolutions.map((solution) => (
            <div key={solution.id} className="solution-card">
              <div className="solution-image">
                <img src={solution.image} alt={solution.title} />
                <div className="solution-overlay">
                  <div className="solution-icon">
                    {solution.category === 'software' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    )}
                    {solution.category === 'sap' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    )}
                    {solution.category === 'reservation' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    )}
                    {solution.category === 'qr' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        <line x1="10" y1="3" x2="10" y2="7"/>
                        <line x1="10" y1="17" x2="10" y2="21"/>
                        <line x1="3" y1="10" x2="7" y2="10"/>
                        <line x1="17" y1="10" x2="21" y2="10"/>
                      </svg>
                    )}
                    {solution.category === 'web' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    )}
                    {solution.category === 'mobile' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                    )}
                    {solution.category === 'graphic' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    )}
                    {solution.category === 'social' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="solution-content">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <button className="solution-btn">
                  Detayları Gör
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
              Önceki
            </button>
            
            <div className="pagination-numbers">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`pagination-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-btn next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sonraki
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
