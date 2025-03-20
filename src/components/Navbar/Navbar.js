import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Navbar dimensions and positioning
const NAV_CONFIG = {
  maxWidth: 500,
  desktopPaddingX: 12,
  desktopPaddingY: 10,
  desktopGap: 4,
  capsuleTransitionDuration: 200,
  capsuleTransitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  mobileMenuDuration: 400,
  scrollThreshold: 60,
  showThreshold: 50,
  maxBlur: 8,
  maxBorderRadius: 20,
  maxOpacity: 0.3,
  mobileBreakpoint: 768,
  // Mobile menu specific configurations
  mobile: {
    headerHeight: '4rem',
    footerHeight: '4rem',
    menuPadding: '2rem',
    fontSize: {
      sm: '1.5rem',
      base: '2rem',
      lg: '2.5rem'
    },
    spacing: {
      menuItems: '2rem'
    }
  }
};

// Robotic text animation configuration
const ROBOTIC_TEXT_CONFIG = {
  FONT: {
    FAMILY: 'Space Mono, monospace',
    LETTER_SPACING: '0.1em',
    LINE_HEIGHT: '1.5',
    COLOR: 'rgba(252, 225, 192, 0.8)'
  },
  ANIMATION: {
    WORD_DURATION: 1500,
    GLITCH_DURATION: 190,
    CHAR_STAGGER_DELAY: 50,
    TRANSITION_SPRING: {
      STIFFNESS: 200,
      DAMPING: 20
    }
  },
  GLITCH: {
    SHADOW_COLOR_1: '#ff0080',
    SHADOW_COLOR_2: '#00ff80',
    SHADOW_OFFSET: '2.5px'
  },
  UNDERLINE: {
    HEIGHT: '2px',
    COLOR: 'rgba(255, 255, 255, 0.5)',
    MARGIN_TOP: '0.5rem'
  }
};

const RoboticMenuItem = ({ to, label, isActive, onClick }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
        }, ROBOTIC_TEXT_CONFIG.ANIMATION.GLITCH_DURATION);
      }
    }, ROBOTIC_TEXT_CONFIG.ANIMATION.WORD_DURATION);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <Link
      to={to}
      onClick={onClick}
      className="block w-full"
    >
      <div className="flex flex-col items-start w-full">
        <div 
          className="font-mono relative overflow-hidden w-full"
          style={{
            fontFamily: ROBOTIC_TEXT_CONFIG.FONT.FAMILY,
            letterSpacing: ROBOTIC_TEXT_CONFIG.FONT.LETTER_SPACING,
            lineHeight: ROBOTIC_TEXT_CONFIG.FONT.LINE_HEIGHT,
            color: isActive ? '#f97316' : ROBOTIC_TEXT_CONFIG.FONT.COLOR,
            fontSize: NAV_CONFIG.mobile.fontSize.lg
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              ...ROBOTIC_TEXT_CONFIG.ANIMATION.TRANSITION_SPRING
            }}
          >
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: Math.random() * 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: index * (ROBOTIC_TEXT_CONFIG.ANIMATION.CHAR_STAGGER_DELAY / 1000),
                  type: "spring"
                }}
                className="inline-block"
                style={{
                  textShadow: isGlitching 
                    ? `${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_COLOR_1},
                       -${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} -${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_COLOR_2}`
                    : 'none',
                  transition: 'text-shadow 0.15s ease-in-out'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <div 
          style={{
            width: '100%',
            height: ROBOTIC_TEXT_CONFIG.UNDERLINE.HEIGHT,
            background: `linear-gradient(to right, transparent, ${ROBOTIC_TEXT_CONFIG.UNDERLINE.COLOR}, transparent)`,
            marginTop: ROBOTIC_TEXT_CONFIG.UNDERLINE.MARGIN_TOP,
            clipPath: isGlitching ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 0.3s ease-in-out'
          }}
        />
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "INDEX" },
    { to: "/projects", label: "PROJECTS" },
    { to: "/about", label: "ABOUT" },
    { to: "/blog", label: "BLOG" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollRange = 100;
      const newScrollPercentage = Math.min(currentScrollY / scrollRange, 1);
      setScrollPercentage(newScrollPercentage);

      if (currentScrollY < NAV_CONFIG.showThreshold) {
        setIsVisible(true);
        setScrollDirection('up');
      } else {
        const deltaY = currentScrollY - lastScrollY;
        if (Math.abs(deltaY) > NAV_CONFIG.scrollThreshold) {
          const newDirection = deltaY > 0 ? 'down' : 'up';
          if (newDirection !== scrollDirection) {
            setScrollDirection(newDirection);
            setIsVisible(newDirection === 'up');
          }
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollDirection]);

  useEffect(() => {
    let timeoutId;
    if (isMenuOpen) {
      setIsMenuVisible(true);
      setIsFading(false);
      document.body.style.overflow = 'hidden';
    } else {
      setIsFading(true);
      document.body.style.overflow = '';
      timeoutId = setTimeout(() => {
        setIsMenuVisible(false);
        setIsFading(false);
      }, NAV_CONFIG.mobileMenuDuration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;
  const handleMenuToggle = (isOpen) => setIsMenuOpen(isOpen);
  const handleCloseMenu = () => handleMenuToggle(false);

  const navStyles = {
    maxWidth: `${NAV_CONFIG.maxWidth}px`,
    background: `rgba(0, 0, 0, ${NAV_CONFIG.maxOpacity * scrollPercentage})`,
    backdropFilter: `blur(${NAV_CONFIG.maxBlur * scrollPercentage}px)`,
    borderRadius: `${NAV_CONFIG.maxBorderRadius * scrollPercentage}px`,
    borderColor: `rgba(255, 255, 255, ${0.1 * scrollPercentage})`,
    borderWidth: `${scrollPercentage}px`,
    padding: `${NAV_CONFIG.desktopPaddingY + (scrollPercentage * 2)}px ${NAV_CONFIG.desktopPaddingX + (scrollPercentage * 4)}px`,
    transition: `all ${NAV_CONFIG.capsuleTransitionDuration}ms ${NAV_CONFIG.capsuleTransitionEasing}`,
    margin: '0 auto'
  };

  return (
    <>
      {/* Main Navbar */}
      <div 
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full px-4 py-4 
          transform transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div style={navStyles}>
          <div className="flex items-center justify-between md:justify-center">
            <Link 
              to="/" 
              className="md:hidden text-white text-xl font-bold hover:text-orange-400 transition-colors duration-300"
            >
              <img src="/favicon.png" alt="Logo" className="w-6 h-6 inline-block align-middle" />
            </Link>

            <div className={`hidden md:flex items-center gap-${NAV_CONFIG.desktopGap}`}>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`text-sm font-medium tracking-wider transition-colors duration-300
                    ${isActive(link.to) ? 'text-orange-400' : 'text-neutral-200 hover:text-orange-400'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white hover:text-orange-400 transition-colors duration-300"
              onClick={() => handleMenuToggle(true)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuVisible && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-${NAV_CONFIG.mobileMenuDuration}
              ${isMenuOpen && !isFading ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleCloseMenu}
          >
            <div 
              className={`absolute inset-0 transition-opacity duration-${NAV_CONFIG.mobileMenuDuration} delay-150
                ${isMenuOpen && !isFading ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}`} 
            />
          </div>

          {/* Off-canvas Menu */}
          <div 
            className={`fixed inset-0 z-50 bg-[#1a1a2e] backdrop-blur-xl
              transform transition-transform duration-${NAV_CONFIG.mobileMenuDuration}
              ${isMenuOpen && !isFading ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <header 
                className="flex items-center justify-between px-6"
                style={{ height: NAV_CONFIG.mobile.headerHeight }}
              >
                <Link 
                  to="/" 
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                  onClick={handleCloseMenu}
                >
                  <img src="/favicon.png" alt="Logo" className="w-6 h-6" />
                </Link>
                <button
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-400 
                    hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
                  onClick={handleCloseMenu}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </header>

              {/* Navigation Content */}
              <div className="flex-1 overflow-hidden">
                <nav className="h-full flex flex-col justify-center overflow-y-auto px-6">
                  <div 
                    className="space-y-8 py-8"
                    style={{ padding: NAV_CONFIG.mobile.menuPadding }}
                  >
                    {navLinks.map((link, index) => (
                      <RoboticMenuItem
                        key={index}
                        to={link.to}
                        label={link.label}
                        isActive={isActive(link.to)}
                        onClick={handleCloseMenu}
                      />
                    ))}
                  </div>
                </nav>
              </div>

              {/* Footer */}
              <footer 
                className="text-center text-sm text-neutral-400 border-t border-white/10 flex items-center justify-center"
                style={{ 
                  height: NAV_CONFIG.mobile.footerHeight,
                  fontFamily: 'Roboto Slab, serif' 
                }}
              >
                © {new Date().getFullYear()} Muhumuza Deus. All rights reserved.
              </footer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;