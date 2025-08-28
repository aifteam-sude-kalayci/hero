import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCardSlider from '../components/ServiceCardSlider';
import './ServiceDetail.css';

// Import PNG images from maskot pozları
import avansTaleplerimImg from '../assets/maskot pozları/avans-taleplerim.png';
import avanslarimImg from '../assets/maskot pozları/avanslarim.png';
import avansTipleriImg from '../assets/maskot pozları/avans-tipleri.png';
import calisanDagilimiImg from '../assets/maskot pozları/calisan-dagilimi.png';
import departmanlarImg from '../assets/maskot pozları/departmanlar.png';
import etkinlikTakvimiImg from '../assets/maskot pozları/etkinlik-takvimi.png';
import girisCikisBilgilerimImg from '../assets/maskot pozları/giris-cikis-bilgilerim.png';
import gorevlerImg from '../assets/maskot pozları/gorevler.png';
import heroAiImg from '../assets/maskot pozları/hero-ai.png';
import izinBilgilerimImg from '../assets/maskot pozları/izin-bilgilerim.png';
import izinTanimlariImg from '../assets/maskot pozları/izin-tanimlari.png';
import kdvOranlariImg from '../assets/maskot pozları/KDV-oranlari.png';
import masrafFormlariOnaylariImg from '../assets/maskot pozları/masraf-formu-onaylari.png';
import masrafFormlarimImg from '../assets/maskot pozları/masraf-formlarim.png';
import masrafKategorileriImg from '../assets/maskot pozları/masraf-kategorileri.png';
import masraflarimImg from '../assets/maskot pozları/masraflarim.png';
import odemeSekilleriImg from '../assets/maskot pozları/odeme-sekilleri.png';
import onayYonetimiImg from '../assets/maskot pozları/onay-yonetimi.png';
import paraBirimleriImg from '../assets/maskot pozları/para-birimleri.png';
import personellerImg from '../assets/maskot pozları/personeller.png';
import resmiTatillerImg from '../assets/maskot pozları/resmi-tatiller.png';
import sirketlerImg from '../assets/maskot pozları/sirketler.png';
import superAdminlerImg from '../assets/maskot pozları/super-adminler.png';
import yaklasanDogumGunleriImg from '../assets/maskot pozları/yaklasan-dogum-gunleri.png';
import yaklasanIzinlerImg from '../assets/maskot pozları/yaklasan-izinler.png';
import zimmetKategorileriImg from '../assets/maskot pozları/zimmet-kategorileri.png';

// Import GIF files
import heroAiGif from '../assets/maskot pozları/gifs/hero-ai.gif';
import girisCikisGif from '../assets/maskot pozları/gifs/giris-cikis.gif';
import izinSagGif from '../assets/maskot pozları/gifs/izin-sag.gif';
import izinGif from '../assets/maskot pozları/gifs/izin.gif';
import masraflarGif from '../assets/maskot pozları/gifs/masraflar.gif';
import zimmetGif from '../assets/maskot pozları/gifs/zimmet.gif';
import avansGif from '../assets/maskot pozları/gifs/avans.gif';

gsap.registerPlugin(ScrollTrigger);

// Function to convert English category names to Turkish
const getTurkishCategory = (category) => {
  const categoryMap = {
    'ai': 'Yapay Zeka',
    'personnel': 'Personel',
    'departments': 'Departmanlar',
    'leave': 'İzin',
    'expenses': 'Masraflar',
    'advance': 'Avans',
    'inventory': 'Zimmet',
    'events': 'Etkinlikler',
    'tasks': 'Görevler',
    'attendance': 'Giriş-Çıkış',
    'approval': 'Onay',
    'company': 'Şirket',
    'admin': 'Yönetici',
    'advance-types': 'Avans Türleri',
    'advance-history': 'Avans Geçmişi',
    'leave-info': 'İzin Bilgileri',
    'upcoming-leave': 'Yaklaşan İzinler',
    'expense-forms': 'Masraf Formları',
    'expense-approvals': 'Masraf Onayları',
    'expense-history': 'Masraf Geçmişi',
    'currencies': 'Para Birimleri',
    'payment-methods': 'Ödeme Yöntemleri',
    'tax-rates': 'Vergi Oranları',
    'holidays': 'Resmi Tatiller',
    'birthdays': 'Doğum Günleri',
    'employee-distribution': 'Çalışan Dağılımı'
  };
  
  return categoryMap[category] || category;
};

// Function to determine if image should be on the left for specific services
const shouldImageBeOnLeft = (serviceId) => {
  // Services that should have images on the left:
  // 6: Avans Sistemi
  // 7: Zimmet Takibi  
  // 16: İzin Bilgileri
  // 18: Masraf Formları
  // 22: Ödeme Şekilleri
  const leftImageServices = [6, 7, 16, 18, 22];
  return leftImageServices.includes(serviceId);
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const detailRef = useRef(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const servicesData = {
    1: {
      id: 1,
      title: "AI Destekli İK Asistanı",
      shortDescription: "Yapay zeka destekli İK asistanımız ile tüm süreçlerinizi otomatikleştirin.",
      longDescription: "Hero AI, insan kaynakları süreçlerinizi devrim niteliğinde değiştiren yapay zeka destekli asistanımızdır. Akıllı öneriler, otomatik süreç yönetimi ve veri analizi ile İK departmanınızın verimliliğini maksimum seviyeye çıkarır. Doğal dil işleme teknolojisi sayesinde çalışan sorularını anında yanıtlar, süreç optimizasyonu önerileri sunar ve karar verme süreçlerinizi destekler.",
      features: [
        "Akıllı süreç otomasyonu",
        "Doğal dil işleme ile soru-cevap",
        "Veri analizi ve raporlama",
        "Otomatik öneriler ve uyarılar",
        "7/24 kesintisiz destek"
      ],
      image: heroAiImg,
      gif: heroAiGif,
      category: "ai",
      color: "#2563eb"
    },
    2: {
      id: 2,
      title: "Personel Yönetimi",
      shortDescription: "Çalışanlarınızın tüm bilgilerini merkezi bir sistemde yönetin.",
      longDescription: "Kapsamlı personel yönetim sistemi ile çalışanlarınızın tüm bilgilerini tek platformda toplayın. Personel kayıtları, sözleşme takibi, performans değerlendirmeleri ve kariyer planlaması ile insan kaynakları süreçlerinizi dijitalleştirin. Güvenli veri saklama ve erişim kontrolleri ile çalışan gizliliğini koruyun.",
      features: [
        "Merkezi personel veritabanı",
        "Sözleşme ve belge yönetimi",
        "Performans değerlendirme sistemi",
        "Kariyer planlama araçları",
        "Güvenli veri saklama"
      ],
      image: personellerImg,
      gif: null,
      category: "personnel",
      color: "#1d4ed8"
    },
    3: {
      id: 3,
      title: "Departman Organizasyonu",
      shortDescription: "Şirket yapınızı organize edin ve yönetin.",
      longDescription: "Kapsamlı departman yönetim sistemi ile şirket organizasyon yapınızı dijital ortamda oluşturun ve yönetin. Departmanlar, pozisyonlar, hiyerarşi ve organizasyon şeması ile şirket yapınızı net bir şekilde görüntüleyin. Çalışan atamaları, yetki dağılımları ve raporlama ile organizasyonel verimliliğinizi artırın.",
      features: [
        "Organizasyon şeması oluşturma",
        "Departman ve pozisyon yönetimi",
        "Hiyerarşik yapı görüntüleme",
        "Çalışan atama ve transfer",
        "Yetki dağılımı yönetimi"
      ],
      image: departmanlarImg,
      gif: null,
      category: "departments",
      color: "#1e40af"
    },
    4: {
      id: 4,
      title: "İzin & Tatil Yönetimi",
      shortDescription: "Çalışan izinlerini ve tatil planlarını kolayca yönetin.",
      longDescription: "Gelişmiş izin yönetim sistemi ile çalışan izin taleplerini, onay süreçlerini ve tatil planlarını verimli bir şekilde yönetin. Otomatik bakiye hesaplamaları, çakışma kontrolü ve onay zincirleri ile iş akışınızı optimize edin. Mobil uygulama desteği ile çalışanlarınız her yerden izin talebinde bulunabilir.",
      features: [
        "Otomatik izin bakiye hesaplama",
        "Çakışma kontrolü ve uyarılar",
        "Esnek onay zincirleri",
        "Mobil izin talepleri",
        "Tatil takvimi entegrasyonu"
      ],
      image: izinTanimlariImg,
      gif: izinGif,
      category: "leave",
      color: "#1e40af"
    },
    5: {
      id: 5,
      title: "Masraf Yönetimi",
      shortDescription: "Çalışan masraflarını dijital ortamda yönetin.",
      longDescription: "Dijital masraf yönetim sistemi ile çalışan masraflarını şeffaf ve verimli bir şekilde yönetin. Masraf formları, belge yükleme, onay süreçleri ve raporlama ile tüm masraf süreçlerinizi otomatikleştirin. Kategori bazlı masraf takibi ve bütçe kontrolü ile finansal süreçlerinizi optimize edin.",
      features: [
        "Dijital masraf formları",
        "Belge yükleme ve arşivleme",
        "Otomatik onay süreçleri",
        "Kategori bazlı raporlama",
        "Bütçe kontrolü ve uyarılar"
      ],
      image: masrafKategorileriImg,
      gif: masraflarGif,
      category: "expenses",
      color: "#1e3a8a"
    },
    6: {
      id: 6,
      title: "Avans Sistemi",
      shortDescription: "Çalışan avans taleplerini dijital ortamda yönetin.",
      longDescription: "Esnek avans yönetim sistemi ile çalışan avans taleplerini hızlı ve güvenli bir şekilde işleyin. Farklı avans türleri, onay süreçleri ve geri ödeme takibi ile finansal süreçlerinizi kolaylaştırın. Otomatik hesaplamalar ve limit kontrolleri ile risk yönetimini optimize edin.",
      features: [
        "Çoklu avans türü desteği",
        "Otomatik limit kontrolleri",
        "Hızlı onay süreçleri",
        "Geri ödeme takibi",
        "Risk yönetimi araçları"
      ],
      image: avansTaleplerimImg,
      gif: avansGif,
      category: "advance",
      color: "#1e3a8a"
    },
    7: {
      id: 7,
      title: "Zimmet Takibi",
      shortDescription: "Şirket ekipmanlarının zimmet takibini dijital ortamda yapın.",
      longDescription: "Kapsamlı zimmet yönetim sistemi ile şirket ekipmanlarının atama, iade ve takip süreçlerini dijital ortamda yönetin. Barkod/QR kod sistemi ile hızlı zimmet işlemleri, otomatik uyarılar ve envanter raporları ile kaynaklarınızı verimli kullanın. Ekipman geçmişi ve bakım takibi ile varlık yönetimini optimize edin.",
      features: [
        "Barkod/QR kod sistemi",
        "Otomatik zimmet işlemleri",
        "Ekipman geçmişi takibi",
        "Bakım ve servis uyarıları",
        "Envanter raporları"
      ],
      image: zimmetKategorileriImg,
      gif: zimmetGif,
      category: "inventory",
      color: "#1d4ed8"
    },
    8: {
      id: 8,
      title: "Etkinlik & Takvim",
      shortDescription: "Şirket etkinliklerini ve önemli tarihleri takip edin.",
      longDescription: "Kapsamlı etkinlik yönetim sistemi ile şirket etkinliklerini, doğum günlerini, resmi tatilleri ve önemli tarihleri tek platformda yönetin. Otomatik hatırlatmalar, etkinlik takvimi ve katılım yönetimi ile çalışan bağlılığını artırın. Entegre takvim sistemi ile tüm etkinliklerinizi organize edin.",
      features: [
        "Etkinlik oluşturma ve yönetimi",
        "Otomatik hatırlatmalar",
        "Katılım takibi",
        "Entegre takvim sistemi",
        "Doğum günü ve tatil takibi"
      ],
      image: etkinlikTakvimiImg,
      gif: null,
      category: "events",
      color: "#1e40af"
    },
    9: {
      id: 9,
      title: "Görev Yönetimi",
      shortDescription: "Çalışan görevlerini ve projelerini sistematik olarak yönetin.",
      longDescription: "Gelişmiş görev yönetim sistemi ile çalışan görevlerini, projelerini ve iş akışlarını sistematik olarak yönetin. Görev atama, takip, önceliklendirme ve raporlama ile iş süreçlerinizi optimize edin. Proje bazlı çalışma ve ekip yönetimi ile verimliliğinizi artırın.",
      features: [
        "Görev oluşturma ve atama",
        "Proje bazlı çalışma",
        "Öncelik yönetimi",
        "İlerleme takibi",
        "Ekip yönetimi araçları"
      ],
      image: gorevlerImg,
      gif: null,
      category: "tasks",
      color: "#1d4ed8"
    },
    10: {
      id: 10,
      title: "Giriş-Çıkış Takibi",
      shortDescription: "Çalışan giriş-çıkış saatlerini dijital ortamda takip edin.",
      longDescription: "Modern giriş-çıkış takip sistemi ile çalışanlarınızın mesai saatlerini, vardiya planlarını ve devamsızlık durumlarını otomatik olarak takip edin. QR kod, parmak izi veya kart ile giriş seçenekleri ile esnek ve güvenli bir sistem kurun. Mesai hesaplamaları ve raporlama ile iş süreçlerinizi verimli hale getirin.",
      features: [
        "Çoklu giriş yöntemi desteği",
        "Otomatik mesai hesaplama",
        "Vardiya planlama",
        "Devamsızlık takibi",
        "Detaylı raporlama"
      ],
      image: girisCikisBilgilerimImg,
      gif: girisCikisGif,
      category: "attendance",
      color: "#1e40af"
    },
    11: {
      id: 11,
      title: "Onay Yönetimi",
      shortDescription: "Tüm onay süreçlerini dijital ortamda yönetin.",
      longDescription: "Merkezi onay yönetim sistemi ile tüm onay süreçlerinizi dijital ortamda yönetin. İzin, masraf, avans ve diğer taleplerin onay süreçlerini hızlı ve şeffaf bir şekilde gerçekleştirin. Onay zincirleri, otomatik bildirimler ve süreç takibi ile verimliliğinizi artırın.",
      features: [
        "Merkezi onay sistemi",
        "Onay zinciri yönetimi",
        "Otomatik bildirimler",
        "Süreç takibi",
        "Onay geçmişi"
      ],
      image: onayYonetimiImg,
      gif: null,
      category: "approval",
      color: "#1e3a8a"
    },
    12: {
      id: 12,
      title: "Şirket Yönetimi",
      shortDescription: "Çoklu şirket yapılarını tek platformda yönetin.",
      longDescription: "Gelişmiş şirket yönetim sistemi ile çoklu şirket yapılarını tek platformda yönetin. Şirket bazlı ayarlar, yetkilendirmeler ve organizasyonel yapı ile holding ve grup şirketlerinizi verimli bir şekilde yönetin. Merkezi kontrol ve şirket bazlı raporlama ile organizasyonel verimliliğinizi artırın.",
      features: [
        "Çoklu şirket desteği",
        "Şirket bazlı ayarlar",
        "Merkezi yetkilendirme",
        "Holding yönetimi",
        "Şirket bazlı raporlama"
      ],
      image: sirketlerImg,
      gif: null,
      category: "company",
      color: "#1d4ed8"
    },
    13: {
      id: 13,
      title: "Süper Admin Paneli",
      shortDescription: "Sistem yöneticileri için gelişmiş yönetim paneli.",
      longDescription: "Kapsamlı süper admin paneli ile sistem yöneticileri için gelişmiş yönetim araçları sunuyoruz. Kullanıcı yetkilendirmeleri, sistem ayarları, güvenlik yönetimi ve sistem performansı takibi ile platformunuzu güvenli ve verimli bir şekilde yönetin. Detaylı log kayıtları ve sistem raporları ile tam kontrol sağlayın.",
      features: [
        "Kullanıcı yetkilendirme yönetimi",
        "Sistem ayarları",
        "Güvenlik yönetimi",
        "Performans takibi",
        "Log kayıtları ve raporlar"
      ],
      image: superAdminlerImg,
      gif: null,
      category: "admin",
      color: "#1e3a8a"
    },
    14: {
      id: 14,
      title: "Avans Tipleri",
      shortDescription: "Farklı avans türlerini tanımlayın ve yönetin.",
      longDescription: "Esnek avans tipleri yönetim sistemi ile farklı avans türlerini tanımlayın ve yönetin. Maaş avansı, seyahat avansı, eğitim avansı ve diğer avans türleri için özelleştirilebilir yapılandırma seçenekleri sunuyoruz. Limit tanımları, onay süreçleri ve raporlama ile avans süreçlerinizi optimize edin.",
      features: [
        "Özelleştirilebilir avans tipleri",
        "Limit tanımları",
        "Onay süreçleri",
        "Avans kategorileri",
        "Detaylı raporlama"
      ],
      image: avansTipleriImg,
      gif: null,
      category: "advance-types",
      color: "#1e40af"
    },
    15: {
      id: 15,
      title: "Avans Geçmişi",
      shortDescription: "Çalışan avans geçmişini detaylı olarak görüntüleyin.",
      longDescription: "Kapsamlı avans geçmişi yönetim sistemi ile çalışan avans taleplerini, onayları ve geri ödemeleri detaylı olarak takip edin. Avans bakiye takibi, ödeme planları ve geçmiş raporları ile finansal süreçlerinizi şeffaf bir şekilde yönetin. Filtreleme ve arama özellikleri ile hızlı erişim sağlayın.",
      features: [
        "Avans geçmişi takibi",
        "Bakiye yönetimi",
        "Ödeme planları",
        "Filtreleme ve arama",
        "Detaylı raporlar"
      ],
      image: avanslarimImg,
      gif: null,
      category: "advance-history",
      color: "#1e40af"
    },
    16: {
      id: 16,
      title: "İzin Bilgileri",
      shortDescription: "Çalışan izin bilgilerini merkezi olarak yönetin.",
      longDescription: "Merkezi izin bilgileri yönetim sistemi ile çalışan izin bilgilerini kapsamlı bir şekilde yönetin. İzin bakiye takibi, kullanılan izinler, planlanan izinler ve izin geçmişi ile detaylı görünüm sağlayın. İzin türleri, hak kazanma kuralları ve bakiye hesaplamaları ile izin süreçlerinizi optimize edin.",
      features: [
        "İzin bakiye takibi",
        "Kullanılan izinler",
        "Planlanan izinler",
        "İzin türleri yönetimi",
        "Hak kazanma kuralları"
      ],
      image: izinBilgilerimImg,
      gif: null,
      category: "leave-info",
      color: "#1e40af"
    },
    17: {
      id: 17,
      title: "Yaklaşan İzinler",
      shortDescription: "Yaklaşan izin taleplerini önceden görün ve planlayın.",
      longDescription: "Proaktif yaklaşan izinler yönetim sistemi ile yaklaşan izin taleplerini önceden görün ve planlayın. İzin çakışmalarını önleyin, vardiya planlamasını optimize edin ve iş süreçlerinizi kesintisiz hale getirin. Otomatik uyarılar ve bildirimler ile planlama süreçlerinizi kolaylaştırın.",
      features: [
        "Yaklaşan izin görünümü",
        "Çakışma kontrolü",
        "Vardiya planlaması",
        "Otomatik uyarılar",
        "Planlama araçları"
      ],
      image: yaklasanIzinlerImg,
      gif: null,
      category: "upcoming-leave",
      color: "#1e40af"
    },
    18: {
      id: 18,
      title: "Masraf Formları",
      shortDescription: "Çalışan masraf formlarını dijital ortamda oluşturun ve yönetin.",
      longDescription: "Dijital masraf formları yönetim sistemi ile çalışan masraf formlarını kolayca oluşturun ve yönetin. Masraf kategorileri, belge ekleme, onay süreçleri ve form şablonları ile masraf süreçlerinizi standardize edin. Mobil uygulama desteği ile her yerden masraf formu oluşturabilirsiniz.",
      features: [
        "Dijital form oluşturma",
        "Masraf kategorileri",
        "Belge ekleme",
        "Form şablonları",
        "Mobil uygulama desteği"
      ],
      image: masrafFormlarimImg,
      gif: null,
      category: "expense-forms",
      color: "#1e3a8a"
    },
    19: {
      id: 19,
      title: "Masraf Onayları",
      shortDescription: "Masraf formu onay süreçlerini dijital ortamda yönetin.",
      longDescription: "Gelişmiş masraf onayları yönetim sistemi ile masraf formu onay süreçlerini dijital ortamda yönetin. Onay zincirleri, otomatik bildirimler ve şeffaf süreç takibi ile masraf onaylarını hızlı ve verimli bir şekilde gerçekleştirin. Onay geçmişi ve raporlama ile süreç kontrolü sağlayın.",
      features: [
        "Onay zinciri yönetimi",
        "Otomatik bildirimler",
        "Süreç takibi",
        "Onay geçmişi",
        "Şeffaf raporlama"
      ],
      image: masrafFormlariOnaylariImg,
      gif: null,
      category: "expense-approvals",
      color: "#1e3a8a"
    },
    20: {
      id: 20,
      title: "Masraf Geçmişi",
      shortDescription: "Çalışan masraf geçmişini detaylı olarak görüntüleyin.",
      longDescription: "Kapsamlı masraf geçmişi yönetim sistemi ile çalışan masraf geçmişini detaylı olarak görüntüleyin. Masraf kategorileri, tutarlar, onay durumları ve ödeme bilgileri için kapsamlı raporlama sunuyoruz. Filtreleme, arama ve analiz araçları ile masraf verilerinizi analiz edin.",
      features: [
        "Masraf geçmişi takibi",
        "Kategori bazlı raporlama",
        "Onay durumu takibi",
        "Filtreleme ve arama",
        "Analiz araçları"
      ],
      image: masraflarimImg,
      gif: null,
      category: "expense-history",
      color: "#1e3a8a"
    },
    21: {
      id: 21,
      title: "Para Birimleri",
      shortDescription: "Çoklu para birimi desteği ile uluslararası işlemlerinizi yönetin.",
      longDescription: "Gelişmiş para birimi yönetim sistemi ile çoklu para birimi desteği sunuyoruz. Döviz kurları, para birimi dönüşümleri ve uluslararası işlemler için kapsamlı çözümler ile global operasyonlarınızı yönetin. Otomatik kur güncellemeleri ve çoklu para birimi raporlama ile finansal süreçlerinizi optimize edin.",
      features: [
        "Çoklu para birimi desteği",
        "Döviz kuru yönetimi",
        "Otomatik dönüşümler",
        "Kur güncellemeleri",
        "Uluslararası raporlama"
      ],
      image: paraBirimleriImg,
      gif: null,
      category: "currencies",
      color: "#1d4ed8"
    },
    22: {
      id: 22,
      title: "Ödeme Şekilleri",
      shortDescription: "Farklı ödeme yöntemlerini tanımlayın ve yönetin.",
      longDescription: "Esnek ödeme şekilleri yönetim sistemi ile farklı ödeme yöntemlerini tanımlayın ve yönetin. Banka transferi, nakit, kredi kartı ve diğer ödeme seçenekleri için özelleştirilebilir yapılandırma sunuyoruz. Ödeme süreçleri, onay mekanizmaları ve raporlama ile finansal işlemlerinizi optimize edin.",
      features: [
        "Özelleştirilebilir ödeme yöntemleri",
        "Banka entegrasyonu",
        "Ödeme süreçleri",
        "Onay mekanizmaları",
        "Finansal raporlama"
      ],
      image: odemeSekilleriImg,
      gif: null,
      category: "payment-methods",
      color: "#1d4ed8"
    },
    23: {
      id: 23,
      title: "KDV Oranları",
      shortDescription: "KDV oranlarını ve vergi hesaplamalarını otomatik olarak yönetin.",
      longDescription: "Otomatik KDV oranları yönetim sistemi ile KDV oranlarını ve vergi hesaplamalarını otomatik olarak yönetin. Farklı ürün ve hizmet kategorileri için vergi ayarları, otomatik hesaplamalar ve vergi raporları ile mali süreçlerinizi optimize edin. Güncel vergi mevzuatına uygun hesaplamalar ile uyumluluğunuzu sağlayın.",
      features: [
        "Otomatik KDV hesaplama",
        "Kategori bazlı vergi ayarları",
        "Vergi raporları",
        "Mevzuat uyumluluğu",
        "Mali süreç optimizasyonu"
      ],
      image: kdvOranlariImg,
      gif: null,
      category: "tax-rates",
      color: "#1e3a8a"
    },
    24: {
      id: 24,
      title: "Resmi Tatiller",
      shortDescription: "Resmi tatil takvimini yönetin ve çalışan izin planlamalarını optimize edin.",
      longDescription: "Kapsamlı resmi tatiller yönetim sistemi ile resmi tatil takvimini yönetin ve çalışan izin planlamalarını optimize edin. Ülke bazlı tatil takvimi, özel günler ve şirket tatilleri ile planlama süreçlerinizi kolaylaştırın. Otomatik hesaplamalar ve izin bakiye etkileri ile süreçlerinizi optimize edin.",
      features: [
        "Ülke bazlı tatil takvimi",
        "Özel gün yönetimi",
        "Şirket tatilleri",
        "Otomatik hesaplamalar",
        "İzin bakiye etkileri"
      ],
      image: resmiTatillerImg,
      gif: null,
      category: "holidays",
      color: "#1e40af"
    },
    25: {
      id: 25,
      title: "Yaklaşan Doğum Günleri",
      shortDescription: "Çalışan doğum günlerini takip edin ve otomatik hatırlatmalar alın.",
      longDescription: "Sıcak yaklaşan doğum günleri yönetim sistemi ile çalışan doğum günlerini takip edin ve otomatik hatırlatmalar alın. Doğum günü kutlamaları, organizasyon ve çalışan bağlılığını artıran etkinlikler ile şirket kültürünüzü güçlendirin. Özelleştirilebilir bildirimler ve etkinlik planlama araçları ile süreçlerinizi kolaylaştırın.",
      features: [
        "Doğum günü takibi",
        "Otomatik hatırlatmalar",
        "Etkinlik planlama",
        "Özelleştirilebilir bildirimler",
        "Çalışan bağlılığı araçları"
      ],
      image: yaklasanDogumGunleriImg,
      gif: null,
      category: "birthdays",
      color: "#1e40af"
    },
    26: {
      id: 26,
      title: "Çalışan Dağılımı",
      shortDescription: "Şirket çalışanlarının departman ve pozisyon bazlı dağılımını görsel olarak analiz edin.",
      longDescription: "Görsel çalışan dağılımı analiz sistemi ile şirket çalışanlarının departman ve pozisyon bazlı dağılımını görsel olarak analiz edin. Organizasyonel yapı raporları, demografik analizler ve trend görünümleri ile şirket yapınızı optimize edin. İnteraktif grafikler ve detaylı raporlar ile veri odaklı kararlar alın.",
      features: [
        "Görsel dağılım analizi",
        "Organizasyonel raporlar",
        "Demografik analizler",
        "İnteraktif grafikler",
        "Trend görünümleri"
      ],
      image: calisanDagilimiImg,
      gif: null,
      category: "employee-distribution",
      color: "#1d4ed8"
    }
  };

  const currentService = servicesData[serviceId];

  useEffect(() => {
    if (!currentService) {
      // Redirect to services page if service not found
      window.location.href = '/hizmetler';
      return;
    }

    // Page animations
    gsap.fromTo(detailRef.current.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out", 
        stagger: 0.1,
        scrollTrigger: {
          trigger: detailRef.current,
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [serviceId, currentService]);

  // Slider functions
  const otherServices = Object.values(servicesData).filter(service => service.id !== currentService.id);
  const totalSlides = Math.ceil(otherServices.length / 3);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!currentService) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="service-detail-page" ref={detailRef}>
        {/* Hero Section */}
        <section className="service-hero">
            <div className="container">
                <div className={`service-hero-content ${shouldImageBeOnLeft(currentService.id) ? 'image-left' : ''}`}>
                    <div className="service-hero-text">
                        <h1>{currentService.title}</h1>
                        <p className="service-hero-description">{currentService.shortDescription}</p>
                        <Link to="/hizmetler" className="back-to-services">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15,18 9,12 15,6"/>
                            </svg>
                            Tüm Hizmetlere Dön
                        </Link>
                    </div>
                    <div className="service-hero-image">
                    {currentService.gif ? (
                        <img src={currentService.gif} alt={`${currentService.title} Demo`} />
                    ) : (
                        <img src={currentService.image} alt={currentService.title} />
                    )}
                    </div>
                </div>
            </div>
        </section>            


        {/* Service Details */}
        <section className="service-details">
            <div className="container">
                <div className="service">
                    <div className="service-description">
                        <h2>Hizmet Detayları</h2>
                        <div className="description-paragraphs">
                            <p>{currentService.longDescription.split('. ').slice(0, 2).join('. ')}.</p>
                            <p>{currentService.longDescription.split('. ').slice(2).join('. ')}</p>
                        </div>
                        <div className="service-tags">
                            <span className="tag">{getTurkishCategory(currentService.category)}</span>
                            <span className="tag">Yönetim</span>
                            <span className="tag">Otomasyon</span>
                        </div>
                    <div>
                    {/* Service Card Slider */}
                    <ServiceCardSlider 
                        services={Object.values(servicesData)} 
                        currentServiceId={currentService.id}
                    />
                    </div>
                    
                </div>
                <div className="service-features">
                        <h3>Özellikler</h3>
                        <ul>
                            {currentService.features.map((feature, index) => (
                            <li key={index}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"/>
                                </svg>
                                {feature}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
