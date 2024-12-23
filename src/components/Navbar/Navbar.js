import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollThreshold, setScrollThreshold] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 70);

      if (currentScrollY > lastScrollY && currentScrollY - scrollThreshold > 80) {
        setIsVisible(false);
        setScrollThreshold(currentScrollY);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
        setIsVisible(true);
        setScrollThreshold(currentScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollThreshold]);

  useEffect(() => {
    let timeoutId;
    if (isMenuOpen) {
      setIsMenuVisible(true);
      setIsFading(false);
      // Dispatch event to hide scroll prompt
      window.dispatchEvent(new CustomEvent('menuStateChange', { detail: true }));
    } else {
      setIsFading(true);
      // Dispatch event to show scroll prompt if at top
      window.dispatchEvent(new CustomEvent('menuStateChange', { detail: false }));
      timeoutId = setTimeout(() => {
        setIsMenuVisible(false);
        setIsFading(false);
      }, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/' || path === '/about') {
      return location.pathname === path;
    }
    if (path === '/projects') {
      return location.pathname === '/projects' || location.pathname.startsWith('/projects/');
    }
    return false;
  };

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
    // Menu state change is handled in the useEffect above
  };

  const handleCloseMenu = () => {
    handleMenuToggle(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out 
          ${isScrolled ? 'bg-black/70' : 'bg-neutral-950/80'} 
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          backdrop-blur-md px-5 py-3 md:px-6`}
        style={{ fontFamily: 'Roboto Slab, serif' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="text-white text-xl md:text-2xl font-bold hover:text-pink-300 transition-colors duration-300"
          >
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`relative text-lg font-medium transition-colors duration-300
                  ${isActive(link.to) ? 'text-pink-300' : 'text-neutral-300 hover:text-pink-300'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300
                  hover:after:w-full ${isActive(link.to) ? 'after:w-full' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white text-2xl hover:text-pink-300 transition-colors duration-300"
            onClick={() => handleMenuToggle(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Overlay with enhanced fade effect */}
      {isMenuVisible && (
        <div 
          className={`fixed inset-0 bg-black/30 z-50 transition-all duration-300
            ${isMenuOpen && !isFading ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleCloseMenu}
        >
          <div 
            className={`absolute inset-0 transition-opacity duration-300 delay-150
              ${isMenuOpen && !isFading ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}`} 
          />
        </div>
      )}

      {/* Enhanced offcanvas with improved animations */}
      {isMenuVisible && (
        <div 
          className={`fixed top-0 right-0 w-full md:w-[400px] h-full z-50 
            transform will-change-transform transition-all duration-300
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-[1px] before:h-full 
            before:bg-white/10 before:transition-opacity before:duration-300
            ${isMenuOpen && !isFading ? 'translate-x-0 opacity-100 before:opacity-100' : 'translate-x-full opacity-0 before:opacity-0'}`}
          style={{ 
            fontFamily: 'Roboto Slab, serif',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: '1000px',
            WebkitPerspective: '1000px',
          }}
        >
          {/* Enhanced background blur effect */}
          <div 
            className={`absolute inset-0 transition-opacity duration-300 delay-75
              bg-white/10 dark:bg-neutral-950/30
              ${isMenuOpen && !isFading ? 'opacity-100 backdrop-blur-xl' : 'opacity-0'}`} 
          />

          {/* Content container with improved layout */}
          <div className="relative h-full flex flex-col">
            <div className="flex items-center justify-between p-3 md:p-6 border-b border-white/10">
              <Link 
                to="/" 
                className="text-white text-2xl md:text-3xl font-bold hover:text-pink-300 transition-colors duration-300"
                onClick={handleCloseMenu}
              >
                <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center text-white hover:text-pink-300 
                  hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
                onClick={handleCloseMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-10 md:p-8">
                <div className="space-y-9">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className={`group flex items-center text-2xl md:text-3xl font-medium transition-colors duration-300
                        ${isActive(link.to) ? 'text-pink-300' : 'text-white hover:text-pink-300'}`}
                      onClick={handleCloseMenu}
                    >
                      <span className="relative">
                        {link.label}
                        <span 
                          className={`absolute -left-2 -right-2 h-0.5 bg-pink-400 bottom-0 transform origin-left
                            transition-transform duration-300 ease-out scale-x-0
                            ${isActive(link.to) ? 'scale-x-100' : 'group-hover:scale-x-100'}`} 
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright notice */}
            <div className="p-2 text-center text-sm text-neutral-400 border-t border-white/10">
              &copy; {new Date().getFullYear()} Muhumuza Deus. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;