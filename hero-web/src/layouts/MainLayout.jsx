import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
