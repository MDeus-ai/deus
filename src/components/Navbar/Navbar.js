import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronRight } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollThreshold, setScrollThreshold] = useState(0);

  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    // Add more pages here as needed
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY - scrollThreshold > 60) {
        setIsVisible(false);
        setScrollThreshold(currentScrollY);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
        setIsVisible(true);
        setScrollThreshold(currentScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollThreshold]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') {
      return false; // Never highlight the home page
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>MD</span>
          <span className="logo-dot">.ai</span>
        </Link>

        <div className="desktop-nav">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>

        <div className={`navbar-offcanvas ${isMenuOpen ? 'active' : ''}`}>
          <div className="offcanvas-header">
            <Link to="/" className="offcanvas-logo" onClick={() => setIsMenuOpen(false)}>
              <span>MD</span>
              <span className="logo-dot">.ai</span>
            </Link>
            <button 
              className="offcanvas-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <div className="offcanvas-content">
            <div className="navbar-links">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={isActive(link.to) ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ChevronRight className="link-icon" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
