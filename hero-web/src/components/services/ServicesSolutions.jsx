import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSolutions.css';

// Import PNG images from maskot pozları
import avansTaleplerimImg from '../../assets/maskot pozları/avans-taleplerim.png';
import avanslarimImg from '../../assets/maskot pozları/avanslarim.png';
import avansTipleriImg from '../../assets/maskot pozları/avans-tipleri.png';
import calisanDagilimiImg from '../../assets/maskot pozları/calisan-dagilimi.png';
import departmanlarImg from '../../assets/maskot pozları/departmanlar.png';
import etkinlikTakvimiImg from '../../assets/maskot pozları/etkinlik-takvimi.png';
import girisCikisBilgilerimImg from '../../assets/maskot pozları/giris-cikis-bilgilerim.png';
import gorevlerImg from '../../assets/maskot pozları/gorevler.png';
import heroAiImg from '../../assets/maskot pozları/hero-ai.png';
import izinBilgilerimImg from '../../assets/maskot pozları/izin-bilgilerim.png';
import izinTanimlariImg from '../../assets/maskot pozları/izin-tanimlari.png';
import kdvOranlariImg from '../../assets/maskot pozları/KDV-oranlari.png';
import masrafFormlariOnaylariImg from '../../assets/maskot pozları/masraf-formu-onaylari.png';
import masrafFormlarimImg from '../../assets/maskot pozları/masraf-formlarim.png';
import masrafKategorileriImg from '../../assets/maskot pozları/masraf-kategorileri.png';
import masraflarimImg from '../../assets/maskot pozları/masraflarim.png';
import odemeSekilleriImg from '../../assets/maskot pozları/odeme-sekilleri.png';
import onayYonetimiImg from '../../assets/maskot pozları/onay-yonetimi.png';
import paraBirimleriImg from '../../assets/maskot pozları/para-birimleri.png';
import personellerImg from '../../assets/maskot pozları/personeller.png';
import resmiTatillerImg from '../../assets/maskot pozları/resmi-tatiller.png';
import sirketlerImg from '../../assets/maskot pozları/sirketler.png';
import superAdminlerImg from '../../assets/maskot pozları/super-adminler.png';
import yaklasanDogumGunleriImg from '../../assets/maskot pozları/yaklasan-dogum-gunleri.png';
import yaklasanIzinlerImg from '../../assets/maskot pozları/yaklasan-izinler.png';
import zimmetKategorileriImg from '../../assets/maskot pozları/zimmet-kategorileri.png';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSolutions() {
  const solutionsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const solutions = [
    {
      id: 1,
      title: "AI Destekli İK Asistanı",
      description: "Yapay zeka destekli İK asistanımız ile tüm süreçlerinizi otomatikleştirin. Akıllı öneriler ve hızlı çözümler ile verimliliğinizi artırın.",
      image: heroAiImg,
      category: "ai"
    },
    {
      id: 2,
      title: "Personel Yönetimi",
      description: "Çalışanlarınızın tüm bilgilerini merkezi bir sistemde yönetin. Personel kayıtları, sözleşme takibi ve performans değerlendirmeleri ile insan kaynakları süreçlerinizi dijitalleştirin.",
      image: personellerImg,
      category: "personnel"
    },
    {
      id: 3,
      title: "Departman Organizasyonu",
      description: "Şirket yapınızı organize edin. Departmanlar, pozisyonlar ve organizasyon şeması ile hiyerarşik yapınızı net bir şekilde görüntüleyin ve yönetin.",
      image: departmanlarImg,
      category: "departments"
    },
    {
      id: 4,
      title: "İzin & Tatil Yönetimi",
      description: "Çalışan izinlerini ve tatil planlarını kolayca yönetin. İzin talepleri, onay süreçleri ve tatil takvimi ile iş akışınızı optimize edin.",
      image: izinTanimlariImg,
      category: "leave"
    },
    {
      id: 5,
      title: "Masraf Yönetimi",
      description: "Çalışan masraflarını dijital ortamda yönetin. Masraf formları, onay süreçleri ve raporlama ile şeffaf ve verimli bir masraf sistemi kurun.",
      image: masrafKategorileriImg,
      category: "expenses"
    },
    {
      id: 6,
      title: "Avans Sistemi",
      description: "Çalışan avans taleplerini dijital ortamda yönetin. Avans tipleri, onay süreçleri ve geri ödeme takibi ile finansal süreçlerinizi kolaylaştırın.",
      image: avansTaleplerimImg,
      category: "advance"
    },
    {
      id: 7,
      title: "Zimmet Takibi",
      description: "Şirket ekipmanlarının zimmet takibini dijital ortamda yapın. Ekipman atama, iade süreçleri ve envanter yönetimi ile kaynaklarınızı verimli kullanın.",
      image: zimmetKategorileriImg,
      category: "inventory"
    },
    {
      id: 8,
      title: "Etkinlik & Takvim",
      description: "Şirket etkinliklerini ve önemli tarihleri takip edin. Doğum günleri, resmi tatiller ve şirket etkinlikleri ile çalışan bağlılığını artırın.",
      image: etkinlikTakvimiImg,
      category: "events"
    },
    {
      id: 9,
      title: "Görev Yönetimi",
      description: "Çalışan görevlerini ve projelerini sistematik olarak yönetin. Görev atama, takip ve raporlama ile iş süreçlerinizi optimize edin.",
      image: gorevlerImg,
      category: "tasks"
    },
    {
      id: 10,
      title: "Giriş-Çıkış Takibi",
      description: "Çalışan giriş-çıkış saatlerini dijital ortamda takip edin. Mesai hesaplamaları ve vardiya yönetimi ile iş süreçlerinizi verimli hale getirin.",
      image: girisCikisBilgilerimImg,
      category: "attendance"
    },
    {
      id: 11,
      title: "Onay Yönetimi",
      description: "Tüm onay süreçlerini dijital ortamda yönetin. İzin, masraf ve avans onaylarını hızlı ve şeffaf bir şekilde gerçekleştirin.",
      image: onayYonetimiImg,
      category: "approval"
    },
    {
      id: 12,
      title: "Şirket Yönetimi",
      description: "Çoklu şirket yapılarını tek platformda yönetin. Şirket bazlı ayarlar ve yetkilendirmeler ile organizasyonel yapınızı optimize edin.",
      image: sirketlerImg,
      category: "company"
    },
    {
      id: 13,
      title: "Süper Admin Paneli",
      description: "Sistem yöneticileri için gelişmiş yönetim paneli. Kullanıcı yetkilendirmeleri, sistem ayarları ve güvenlik yönetimi.",
      image: superAdminlerImg,
      category: "admin"
    },
    {
      id: 14,
      title: "Avans Tipleri",
      description: "Farklı avans türlerini tanımlayın ve yönetin. Maaş avansı, seyahat avansı ve diğer avans türleri için esnek yapılandırma.",
      image: avansTipleriImg,
      category: "advance-types"
    },
    {
      id: 15,
      title: "Avans Geçmişi",
      description: "Çalışan avans geçmişini detaylı olarak görüntüleyin. Avans talepleri, onaylar ve geri ödemeler için kapsamlı raporlama.",
      image: avanslarimImg,
      category: "advance-history"
    },
    {
      id: 16,
      title: "İzin Bilgileri",
      description: "Çalışan izin bilgilerini merkezi olarak yönetin. İzin bakiye takibi, kullanılan izinler ve planlanan izinler için detaylı görünüm.",
      image: izinBilgilerimImg,
      category: "leave-info"
    },
    {
      id: 17,
      title: "Yaklaşan İzinler",
      description: "Yaklaşan izin taleplerini önceden görün ve planlayın. İzin çakışmalarını önleyin ve iş süreçlerinizi optimize edin.",
      image: yaklasanIzinlerImg,
      category: "upcoming-leave"
    },
    {
      id: 18,
      title: "Masraf Formları",
      description: "Çalışan masraf formlarını dijital ortamda oluşturun ve yönetin. Masraf kategorileri, belge ekleme ve onay süreçleri.",
      image: masrafFormlarimImg,
      category: "expense-forms"
    },
    {
      id: 19,
      title: "Masraf Onayları",
      description: "Masraf formu onay süreçlerini dijital ortamda yönetin. Onay zincirleri, otomatik bildirimler ve şeffaf süreç takibi.",
      image: masrafFormlariOnaylariImg,
      category: "expense-approvals"
    },
    {
      id: 20,
      title: "Masraf Geçmişi",
      description: "Çalışan masraf geçmişini detaylı olarak görüntüleyin. Masraf kategorileri, tutarlar ve onay durumları için kapsamlı raporlama.",
      image: masraflarimImg,
      category: "expense-history"
    },
    {
      id: 21,
      title: "Para Birimleri",
      description: "Çoklu para birimi desteği ile uluslararası işlemlerinizi yönetin. Döviz kurları ve para birimi dönüşümleri.",
      image: paraBirimleriImg,
      category: "currencies"
    },
    {
      id: 22,
      title: "Ödeme Şekilleri",
      description: "Farklı ödeme yöntemlerini tanımlayın ve yönetin. Banka transferi, nakit ve diğer ödeme seçenekleri için esnek yapılandırma.",
      image: odemeSekilleriImg,
      category: "payment-methods"
    },
    {
      id: 23,
      title: "KDV Oranları",
      description: "KDV oranlarını ve vergi hesaplamalarını otomatik olarak yönetin. Farklı ürün ve hizmet kategorileri için vergi ayarları.",
      image: kdvOranlariImg,
      category: "tax-rates"
    },
    {
      id: 24,
      title: "Resmi Tatiller",
      description: "Resmi tatil takvimini yönetin ve çalışan izin planlamalarını optimize edin. Ülke bazlı tatil takvimi ve özel günler.",
      image: resmiTatillerImg,
      category: "holidays"
    },
    {
      id: 25,
      title: "Yaklaşan Doğum Günleri",
      description: "Çalışan doğum günlerini takip edin ve otomatik hatırlatmalar alın. Doğum günü kutlamaları ve çalışan bağlılığını artırın.",
      image: yaklasanDogumGunleriImg,
      category: "birthdays"
    },
    {
      id: 26,
      title: "Çalışan Dağılımı",
      description: "Şirket çalışanlarının departman ve pozisyon bazlı dağılımını görsel olarak analiz edin. Organizasyonel yapı raporları.",
      image: calisanDagilimiImg,
      category: "employee-distribution"
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
          <h2>İnsan Kaynakları Çözümlerimiz</h2>
        </div>
        
        <div className="solutions-grid">
          {currentSolutions.map((solution) => (
            <div key={solution.id} className="solution-card">
              <div className="solution-image">
                <img src={solution.image} alt={solution.title} />
                <div className="solution-overlay">
                  <div className="solution-icon">
                    {solution.category === 'ai' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 2v4"/>
                        <path d="M12 18v4"/>
                        <path d="M4.93 4.93l2.83 2.83"/>
                        <path d="M16.24 16.24l2.83 2.83"/>
                        <path d="M2 12h4"/>
                        <path d="M18 12h4"/>
                        <path d="M4.93 19.07l2.83-2.83"/>
                        <path d="M16.24 7.76l2.83-2.83"/>
                      </svg>
                    )}
                    {solution.category === 'personnel' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    )}
                    {solution.category === 'departments' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" y1="9" x2="15" y2="9"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                        <line x1="12" y1="9" x2="12" y2="15"/>
                      </svg>
                    )}
                    {solution.category === 'leave' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    )}
                    {solution.category === 'expenses' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    )}
                    {solution.category === 'advance' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    )}
                    {solution.category === 'inventory' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                    )}
                      {solution.category === 'events' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M8 2v4"/>
                         <path d="M16 2v4"/>
                         <rect x="3" y="4" width="18" height="18" rx="2"/>
                         <path d="M3 10h18"/>
                       </svg>
                     )}
                     {solution.category === 'tasks' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M9 11l3 3L22 4"/>
                         <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                       </svg>
                     )}
                     {solution.category === 'attendance' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <circle cx="12" cy="12" r="10"/>
                         <polyline points="12,6 12,12 16,14"/>
                       </svg>
                     )}
                     {solution.category === 'approval' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M9 12l2 2 4-4"/>
                         <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                         <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                         <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
                         <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
                       </svg>
                     )}
                     {solution.category === 'company' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                         <polyline points="9,22 9,12 15,12 15,22"/>
                       </svg>
                     )}
                     {solution.category === 'admin' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                         <path d="M2 17l10 5 10-5"/>
                         <path d="M2 12l10 5 10-5"/>
                       </svg>
                     )}
                     {solution.category === 'advance-types' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                         <circle cx="12" cy="12" r="3"/>
                       </svg>
                     )}
                     {solution.category === 'advance-history' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                         <path d="M9 12h6"/>
                       </svg>
                     )}
                     {solution.category === 'leave-info' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                         <line x1="16" y1="2" x2="16" y2="6"/>
                         <line x1="8" y1="2" x2="8" y2="6"/>
                         <line x1="3" y1="10" x2="21" y2="10"/>
                         <path d="M8 14h.01"/>
                         <path d="M12 14h.01"/>
                         <path d="M16 14h.01"/>
                         <path d="M8 18h.01"/>
                         <path d="M12 18h.01"/>
                         <path d="M16 18h.01"/>
                       </svg>
                     )}
                     {solution.category === 'upcoming-leave' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                         <line x1="16" y1="2" x2="16" y2="6"/>
                         <line x1="8" y1="2" x2="8" y2="6"/>
                         <line x1="3" y1="10" x2="21" y2="10"/>
                         <path d="M8 14l3 3 5-5"/>
                       </svg>
                     )}
                     {solution.category === 'expense-forms' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                         <polyline points="14,2 14,8 20,8"/>
                         <line x1="16" y1="13" x2="8" y2="13"/>
                         <line x1="16" y1="17" x2="8" y2="17"/>
                         <polyline points="10,9 9,9 8,9"/>
                       </svg>
                     )}
                     {solution.category === 'expense-approvals' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M9 12l2 2 4-4"/>
                         <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                         <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                       </svg>
                     )}
                     {solution.category === 'expense-history' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <line x1="12" y1="1" x2="12" y2="23"/>
                         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                         <path d="M9 12h6"/>
                       </svg>
                     )}
                     {solution.category === 'currencies' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <circle cx="12" cy="12" r="10"/>
                         <path d="M12 2v20"/>
                         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                       </svg>
                     )}
                     {solution.category === 'payment-methods' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                         <line x1="1" y1="10" x2="23" y2="10"/>
                       </svg>
                     )}
                     {solution.category === 'tax-rates' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                         <path d="M9 12h6"/>
                         <path d="M12 9v6"/>
                       </svg>
                     )}
                     {solution.category === 'holidays' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M8 2v4"/>
                         <path d="M16 2v4"/>
                         <rect x="3" y="4" width="18" height="18" rx="2"/>
                         <path d="M3 10h18"/>
                         <path d="M8 14h.01"/>
                         <path d="M12 14h.01"/>
                         <path d="M16 14h.01"/>
                       </svg>
                     )}
                     {solution.category === 'birthdays' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                       </svg>
                     )}
                     {solution.category === 'employee-distribution' && (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M3 3v18h18"/>
                         <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                         <circle cx="12" cy="12" r="3"/>
                       </svg>
                     )}
                  </div>
                </div>
              </div>
              <div className="solution-content">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <Link to={`/hizmetler/${solution.id}`} className="solution-btn">
                  Detayları Gör
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                </Link>
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
