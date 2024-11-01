import React, { useEffect, useRef, useState } from 'react';

const HeroZoom = ({ children, backgroundImage }) => {
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastScrollYRef = useRef(window.scrollY);
  const [transform, setTransform] = useState({ scale: 1, opacity: 1 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use transform3d for hardware acceleration
    const updateTransform = (scale, opacity) => {
      section.style.setProperty('--scale', scale);
      setTransform({ scale, opacity });
    };

    const calculateScale = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = 1 - (rect.top + rect.height) / (viewportHeight + rect.height);
      
      // Get current scale from the CSS variable
      const currentScale = parseFloat(section.style.getPropertyValue('--scale') || '1');
      
      // Calculate new scale with improved smoothing
      let targetScale = 1 + (scrollProgress * 0.8);
      targetScale = Math.max(1, Math.min(targetScale, 1.8));
      
      // Enhanced easing with variable factor based on distance
      const distance = Math.abs(targetScale - currentScale);
      const easingFactor = Math.min(0.1, distance * 0.2); // Adaptive easing
      const newScale = currentScale + (targetScale - currentScale) * easingFactor;
      
      // Improved opacity calculation
      let newOpacity = 1;
      if (rect.top < -viewportHeight * 0.6) {
        newOpacity = Math.max(0, 1 - Math.abs(rect.top + viewportHeight * 0.6) / (rect.height * 0.4));
      }

      // Only update if the change is significant
      if (Math.abs(newScale - currentScale) > 0.001 || Math.abs(newOpacity - transform.opacity) > 0.001) {
        updateTransform(newScale, newOpacity);
      }

      // Continue animation if needed
      if (Math.abs(targetScale - newScale) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(calculateScale);
      }
    };

    // Debounced scroll handler with throttling
    const handleScroll = () => {
      if (animationFrameRef.current) return;
      
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      
      // Only update if scroll change is significant
      if (scrollDelta > 2) {
        lastScrollYRef.current = currentScrollY;
        animationFrameRef.current = requestAnimationFrame(() => {
          calculateScale();
          animationFrameRef.current = null;
        });
      }
    };

    // Enhanced Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            calculateScale();
          }
        });
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20), // Reduced number of thresholds
        rootMargin: "150px"
      }
    );

    observer.observe(section);
    window.addEventListener('scroll', handleScroll, { passive: true });
    section.style.setProperty('--scale', '1');

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [transform.opacity]); // Added transform.opacity to dependency array

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0,0,0) scale(${transform.scale})`, // Hardware acceleration
          opacity: transform.opacity,
          willChange: 'transform, opacity',
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0.1, 1)', // Faster, smoother transition
          transformOrigin: 'center center'
        }}
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ 
          opacity: 0.5,
          transition: 'opacity 0.2s ease-out'
        }}
      />
      <div 
        className="relative z-10 text-center px-4"
        style={{
          transform: `translate3d(0,0,0) scale(${1 / Math.max(1, transform.scale * 0.9)})`, // Hardware acceleration
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0.1, 1)' // Matching transition
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default HeroZoom;