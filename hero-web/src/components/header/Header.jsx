import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SplitType from "split-type";
import logo from "../../assets/logo/logo.svg";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach((link) => {
      const split = new SplitType(link, { types: "chars" });
      split.chars.forEach((char) => {
        char.setAttribute("data-letter", char.textContent);
      });
    });

    // Scroll event listener for header background
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="logo">
          <img src={logo} alt="HERO Logo" />
        </NavLink>

        {/* Hamburger Menü Butonu (Sadece Mobilde Görünür) */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          )}
        </button>

        {/* Menü Linkleri */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {/* Mobile Logo */}
          <div className="mobile-logo">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              <img src={logo} alt="HERO Logo" />
            </NavLink>
          </div>
          
          <ul>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>Anasayfa</NavLink>
            </li>
            <li>
              <NavLink to="/hakkimizda" onClick={() => setMenuOpen(false)}>Hakkımızda</NavLink>
            </li>
            <li>
              <NavLink to="/hizmetler" onClick={() => setMenuOpen(false)}>Hizmetlerimiz</NavLink>
            </li>
            <li>
              <NavLink to="/iletisim" onClick={() => setMenuOpen(false)}>İletişim</NavLink>
            </li>
            <li className="mobile-only">
              <NavLink to="/kayit-ol" onClick={() => setMenuOpen(false)}>Kayıt Ol</NavLink>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <NavLink to="/kayit-ol" className="btn btn-primary">
            Kayıt Ol
          </NavLink>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
