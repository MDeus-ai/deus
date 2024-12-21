import React, { useEffect, useState } from 'react';

const ScrollPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleMenuState = (e) => {
      if (e.detail) {
        setIsVisible(false);
      } else if (window.scrollY <= 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('menuStateChange', handleMenuState);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('menuStateChange', handleMenuState);
    };
  }, []);

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ bottom: '2rem' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-sm font-medium tracking-wider uppercase">
          Scroll Down
        </span>
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollPrompt;