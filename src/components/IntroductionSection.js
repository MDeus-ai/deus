import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaUserCircle } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiPostgresql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

// Add custom floating animation
const floatingAnimation = `
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

const techStack = [
  { 
    icon: FaPython, 
    name: 'Python',
    description: 'Core language',
    // link: 'https://www.python.org/'
  },
  { 
    icon: SiPandas, 
    name: 'Pandas',
    description: 'Data analysis',
    // link: 'https://pandas.pydata.org/'
  },
  { 
    icon: SiNumpy, 
    name: 'NumPy',
    description: 'Array computing',
    // link: 'https://numpy.org/'
  },
  { 
    icon: SiScikitlearn, 
    name: 'Scikit-learn',
    description: 'ML algorithms',
    // link: 'https://scikit-learn.org/'
  },
  { 
    icon: SiPytorch, 
    name: 'Pytorch',
    description: 'Deep learning',
    // link: 'https://pytorch.org/'
  },
  { 
    icon: SiPostgresql, 
    name: 'PostgreSQL',
    description: 'Databases',
    // link: 'https://pytorch.org/'
  },
];

const IntroductionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered animation sequence
          setTimeout(() => setAnimationPhase(1), 100);
          setTimeout(() => setStartTyping(true), 500);
          setTimeout(() => setAnimationPhase(2), 800);
          setTimeout(() => setAnimationPhase(3), 1100);
        } else {
          setIsVisible(false);
          setStartTyping(false);
          setAnimationPhase(0);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const TechStackItem = ({ tech, index }) => (
    <a
      href={tech.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex flex-col p-2 sm:p-2.5 
        bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
        hover:border-pink-500/50 transition-all duration-500 ease-in-out
        transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20
        ${activeIndex === index ? 'border-pink-500/50 scale-105' : ''}
        ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionDelay: `${800 + index * 120}ms`
      }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="flex items-center space-x-1.5">
        <tech.icon className="text-base sm:text-lg text-neutral-400 group-hover:text-pink-500 transition-colors duration-300" />
        <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors duration-300 truncate">
          {tech.name}
        </span>
      </div>
      <div className="relative overflow-hidden">
        <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mt-1">
          {tech.description}
        </p>
      </div>
    </a>
  );

  return (
    <>
      <style>{floatingAnimation}</style>
      <section
        ref={sectionRef}
        className={`
          relative transition-all duration-1000 ease-out transform max-w-5xl mx-auto p-6 md:p-12
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
        `}
      >
      <div className="relative z-10">
        {/* Title Section with floating animation */}
        <div className={`
          text-center mb-12 transition-all duration-1000 ease-in-out
          ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          animate-float
        `}>
          <h2 className="relative text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgba(252,225,192,0.95)]">
            {startTyping ? (
              <ReactTypingEffect 
                text={["Welcome"]}
                typingDelay={200}
                speed={30} 
                eraseDelay={10000000}
                cursor="_"
              />
            ) : (
              <span className="opacity-0">Welcome</span>
            )}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column with slide and fade animation */}
          <div className={`
            lg:w-1/2 transition-all duration-1000 ease-in-out
            ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}
          `}>
            <div className="prose prose-invert max-w-none mb-8 relative">
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                To my website! I'm at the exciting crossroads of machine learning and statistics. 
                A statistics major at Kyambogo University and a self-taught machine-learning practitioner.
              </p>
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"></div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 
                bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
                hover:border-pink-500/50 hover:bg-neutral-800/80 transition-all duration-500 ease-in-out 
                transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20 relative"
            >
              <FaUserCircle className="text-neutral-400 group-hover:text-pink-500 transition-colors duration-300" />
              <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors duration-300">
                Learn More About Me
              </span>
              <span className="inline-block transition-transform duration-500 ease-in-out group-hover:translate-x-2 text-pink-500">
                →
              </span>
            </Link>
          </div>

          {/* Right Column with slide and fade animation */}
          <div className={`
            lg:w-1/2 transition-all duration-1000 ease-in-out
            ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}
          `}>
            <h3 className="text-xl sm:text-2xl font-medium text-[rgba(252,225,192,0.95)] border-b border-neutral-800 pb-2 mb-6">
              Technologies & libraries I work with.
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {techStack.map((tech, index) => (
                <TechStackItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default IntroductionSection;