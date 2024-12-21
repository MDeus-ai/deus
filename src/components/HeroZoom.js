import React, { useEffect, useRef, useState, useMemo } from 'react';
import ScrollPrompt from './ScrollPrompt';

const HeroZoom = ({ children, backgroundImage }) => {
  const sectionRef = useRef(null);
  const [transform, setTransform] = useState({ scale: 1, translateY: 0 });
  const frameRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const springRef = useRef({ velocity: { scale: 0, translateY: 0 } });
  const transformRef = useRef(transform);
  
  const spring = useMemo(() => ({
    tension: 0.12,
    friction: 0.35,
    precision: 0.0005
  }), []);

  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const applySpringForce = (current, target, velocity, dt) => {
      const displacement = target - current;
      const springForce = displacement * spring.tension;
      const dampingForce = velocity * spring.friction;
      
      const force = springForce - dampingForce;
      const newVelocity = velocity + force * dt;
      const newPosition = current + newVelocity * dt;
      
      return {
        position: newPosition,
        velocity: newVelocity
      };
    };

    const calculateTransform = (timestamp) => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dt = 1 / 60;

      // Calculate basic scroll progress
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.bottom / (viewportHeight + rect.height))));
      const smoothProgress = Math.pow(scrollProgress, 1.1);
      
      // Transform calculations
      const targetScale = 1 + (smoothProgress * 0.4);
      const targetTranslateY = smoothProgress * 120;

      // Apply spring physics
      const { position: newScale, velocity: scaleVelocity } = applySpringForce(
        transformRef.current.scale,
        targetScale,
        springRef.current.velocity.scale,
        dt
      );

      const { position: newTranslateY, velocity: translateVelocity } = applySpringForce(
        transformRef.current.translateY,
        targetTranslateY,
        springRef.current.velocity.translateY,
        dt
      );

      springRef.current.velocity = {
        scale: scaleVelocity,
        translateY: translateVelocity
      };

      const currentTransform = transformRef.current;
      const needsUpdate = 
        Math.abs(newScale - currentTransform.scale) > spring.precision ||
        Math.abs(newTranslateY - currentTransform.translateY) > spring.precision ||
        Math.abs(lastScrollY.current - window.scrollY) > 0.1;

      if (needsUpdate) {
        setTransform({
          scale: newScale,
          translateY: newTranslateY
        });
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
      springRef.current.velocity = { scale: 0, translateY: 0 };
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
  }, [spring]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-[125%] -top-[12.5%]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0,${-transform.translateY * 0.25}px,0) 
                     scale(${transform.scale})`,
          willChange: 'transform',
          transformOrigin: '50% 50%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,${0.25 + transform.scale * 0.08}) 0%,
            rgba(0,0,0,${0.35 + transform.scale * 0.12}) 50%,
            rgba(0,0,0,${0.45 + transform.scale * 0.15}) 100%
          )`
        }}
      />

      {/* Content */}
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `translate3d(0,${transform.translateY * 0.12}px,0) 
                     scale(${1 / Math.max(1, transform.scale * 0.99)})`
        }}
      >
        {children}
      </div>
      <ScrollPrompt />
    </section>
  );
};

export default HeroZoom;