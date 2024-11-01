import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

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
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.opacity = isMenuOpen ? '0.4' : '1';
      mainContent.style.transition = 'opacity 0.3s ease-out';
    }
    
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
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

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-out 
        ${isScrolled ? 'bg-black/70' : 'bg-neutral-950/80'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        backdrop-blur-md px-5 py-3 md:px-6`}
        style={{ fontFamily: 'Roboto Slab, serif' }}>
        {/* Navbar content remains the same */}
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl md:text-2xl font-bold hover:text-[#BCA37F] transition-colors duration-300">
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`relative text-lg font-medium transition-colors duration-300
                  ${isActive(link.to) ? 'text-[#BCA37F]' : 'text-neutral-300 hover:text-[#BCA37F]'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-0 after:h-0.5 after:bg-[#BCA37F] after:transition-all after:duration-300
                  hover:after:w-full ${isActive(link.to) ? 'after:w-full' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white text-2xl hover:text-[#BCA37F] transition-colors duration-300"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Overlay with slight blur */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ease-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Offcanvas Menu with transparency and stronger blur */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-[400px] h-full z-50 
          transform will-change-transform transition-transform duration-300 ease-out
          bg-white/10 dark:bg-neutral-950/30 backdrop-blur-xl
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          fontFamily: 'Roboto Slab, serif',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)' // Subtle border for depth
        }}
      >
        {/* Header with glass effect */}
        <div className="flex items-center justify-between p-3 md:p-6 border-b border-white/10">
          <Link 
            to="/" 
            className="text-white text-2xl md:text-3xl font-bold hover:text-[#BCA37F] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#BCA37F] 
              hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content with glass effect */}
        <div className="h-[calc(100%-81px)] overflow-y-auto">
          <div className="p-10 md:p-8">
            <div className="space-y-9">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`group flex items-center text-2xl md:text-3xl font-medium transition-colors duration-300
                    ${isActive(link.to) ? 'text-[#BCA37F]' : 'text-white hover:text-[#BCA37F]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative">
                    {link.label}
                    <span className={`absolute -left-2 -right-2 h-0.5 bg-[#BCA37F] bottom-0 transform origin-left
                      transition-transform duration-300 ease-out scale-x-0
                      ${isActive(link.to) ? 'scale-x-100' : 'group-hover:scale-x-100'}`} 
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;