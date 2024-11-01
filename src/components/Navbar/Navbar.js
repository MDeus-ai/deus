import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronRight } from 'lucide-react';

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollThreshold]);

  useEffect(() => {
    // Apply blur to main content when menu is open
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.filter = isMenuOpen ? 'blur(10px)' : 'none';  // To increase blur intensity, adjust the '10px' value
      mainContent.style.transition = 'filter 0.5s ease-out';
    }
    
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
      if (mainContent) {
        mainContent.style.filter = 'none';
      }
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out 
        ${isScrolled ? 'bg-black/70' : 'bg-neutral-950/80'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        backdrop-blur-md px-5 py-3 md:px-6`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-xl md:text-2xl font-bold hover:text-[#BCA37F] transition-colors duration-300">
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl hover:text-[#BCA37F] transition-colors duration-300"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Off-canvas Menu Backdrop */}
      {/* To increase backdrop blur intensity, adjust the backdrop-blur-md to backdrop-blur-lg or backdrop-blur-xl */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-xl z-50 transition-opacity duration-500
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Off-canvas Menu */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-neutral-950/95 backdrop-blur-xl z-50 
          transform transition-transform duration-500 ease-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Off-canvas Header */}
        <div className="flex items-center justify-between p-3 md:p-6 border-b border-neutral-800">
          <Link 
            to="/" 
            className="text-white text-2xl md:text-3xl font-bold hover:text-[#BCA37F] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#BCA37F] 
              hover:bg-neutral-800/50 rounded-full transition-all duration-300 hover:rotate-90"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Off-canvas Content */}
        <div className="h-[calc(100%-81px)] overflow-y-auto">
          <div className="p-6 md:p-8">
            <div className="space-y-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`group flex items-center text-2xl md:text-3xl font-medium transition-colors duration-300
                    ${isActive(link.to) ? 'text-[#BCA37F]' : 'text-neutral-300 hover:text-[#BCA37F]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ChevronRight className={`w-6 h-6 mr-3 transition-transform duration-300 transform 
                    ${isActive(link.to) ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}
                    group-hover:translate-x-0 group-hover:opacity-100`} />
                  <span>{link.label}</span>
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