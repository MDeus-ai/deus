import React, { useEffect, useRef, useState } from 'react';
import ScrollPrompt from './ScrollPrompt';

const HeroZoom = ({ children, backgroundImage }) => {
  const sectionRef = useRef(null);
  const [transform, setTransform] = useState({ scale: 1, opacity: 1 });
  const frameRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const lastScale = useRef(1);
  const transformRef = useRef(transform);
  
  // Update the ref whenever transform changes
  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const calculateTransform = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.bottom / (viewportHeight + rect.height))));
      
      const targetScale = 1 + (scrollProgress * 0.25);
      const smoothingFactor = 0.15;
      
      const newScale = lerp(lastScale.current, targetScale, smoothingFactor);
      lastScale.current = newScale;

      let newOpacity = 1;
      if (rect.top < -viewportHeight * 0.3) {
        newOpacity = Math.max(0, 1 - Math.abs(rect.top + viewportHeight * 0.3) / (viewportHeight * 0.7));
      }

      const currentTransform = transformRef.current;
      const scaleDiff = Math.abs(newScale - currentTransform.scale);
      const opacityDiff = Math.abs(newOpacity - currentTransform.opacity);
      
      if (scaleDiff > 0.001 || opacityDiff > 0.001) {
        setTransform({
          scale: newScale,
          opacity: newOpacity
        });
      }

      if (scaleDiff > 0.0001 || Math.abs(window.scrollY - lastScrollY.current) > 0.1) {
        frameRef.current = requestAnimationFrame(calculateTransform);
      }
      
      lastScrollY.current = window.scrollY;
    };

    const handleScroll = () => {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(calculateTransform);
      }
    };

    const handleResize = () => {
      lastScale.current = 1;
      calculateTransform();
    };

    calculateTransform();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []); // Empty dependency array since we're using refs

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0,0,0) scale(${transform.scale})`,
          opacity: transform.opacity,
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <div
        className="absolute inset-0 bg-black/40"
        style={{ 
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `scale(${1 / Math.max(1, transform.scale * 0.97)})`,
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {children}
      </div>
      <ScrollPrompt />
    </section>
  );
};

export default HeroZoom;