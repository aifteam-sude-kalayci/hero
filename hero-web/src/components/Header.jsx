import React, { useEffect } from "react";
import SplitType from "split-type";
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
          <a href="/" className="logo">
            HERO
          </a>
          <ul className="nav-links">
            <li>
              <a href="#">Anasayfa</a>
            </li>
            <li>
              <a href="#">Hakkımızda</a>
            </li>
            <li>
              <a href="#">Hizmetlerimiz</a>
            </li>
            <li>
              <a href="#">İletişim</a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
