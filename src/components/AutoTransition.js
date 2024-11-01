import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AutoTransition = ({ items, renderItem, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [direction, setDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 700);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  }, [items.length]);

  useEffect(() => {
    if (!isAutoScrolling || isAnimating) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoScrolling, interval, nextSlide, isAnimating]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const getSlideStyles = (index) => {
    const isActive = index === currentIndex;
    const isPrev = index === (currentIndex === 0 ? items.length - 1 : currentIndex - 1);
    const isNext = index === (currentIndex === items.length - 1 ? 0 : currentIndex + 1);
    
    let translateX = '0';
    if (direction === 'right') {
      if (isPrev) translateX = '-100%';
      if (isNext) translateX = '100%';
    } else {
      if (isPrev) translateX = '100%';
      if (isNext) translateX = '-100%';
    }

    return {
      opacity: isActive ? 1 : 0,
      transform: `
        scale(${isActive ? 1 : 0.95}) 
        translateX(${translateX})
      `,
      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      pointerEvents: isActive ? 'auto' : 'none', // Only allow interaction with active slide
      zIndex: isActive ? 1 : 0
    };
  };

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="relative h-[550px]">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="w-full px-0 sm:px-4"
              style={getSlideStyles(index)}
            >
              {renderItem(item, index === currentIndex, index)}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={prevSlide}
        disabled={isAnimating} 
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={nextSlide}
        disabled={isAnimating} 
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/75'
            } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={isAnimating}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoTransition;