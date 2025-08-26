import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import SplitType from "split-type";
import logo from "../../assets/logo/logo.svg";
import "./Header.css";

const Header = () => {
  useEffect(() => {
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach((link) => {
      const split = new SplitType(link, { types: 'chars' });
      split.chars.forEach((char) => {
        char.setAttribute('data-letter', char.textContent);
      });
    });
  }, []);

  return (
    <>
      <header>
        <div className="header-inner">
          <NavLink to="/" className="logo">
            <img src={logo} alt="HERO Logo" />
          </NavLink>
          <ul className="nav-links">
            <li>
              <NavLink to="/">Anasayfa</NavLink>
            </li>
            <li>
              <NavLink to="/hakkimizda">Hakkımızda</NavLink>
            </li>
            <li>
              <NavLink to="/hizmetler">Hizmetlerimiz</NavLink>
            </li>
            <li>
              <NavLink to="/iletisim">İletişim</NavLink>
            </li>
          </ul>
          <div className="header-actions">
            <NavLink to="/kayit-ol" className="btn btn-primary">
              Kayıt Ol
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
