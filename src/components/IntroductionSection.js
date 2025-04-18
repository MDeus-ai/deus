import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaUserCircle } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiPostgresql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

// Add custom floating animation with reduced height
const floatingAnimation = `
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
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
          // Reduced delay times for faster appearance
          setTimeout(() => setAnimationPhase(1), 70);  // Reduced from 100ms
          setTimeout(() => setStartTyping(true), 250); // Reduced from 500ms
          setTimeout(() => setAnimationPhase(2), 400); // Reduced from 800ms
          setTimeout(() => setAnimationPhase(3), 500); // Reduced from 1100ms
        } else {
          setIsVisible(false);
          setStartTyping(false);
          setAnimationPhase(0);
        }
      },
      { threshold: 0.1 } // Reduced threshold for earlier detection
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
    <div
      className={`
        group relative flex flex-col p-2 sm:p-2.5 
        bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
        hover:border-pink-500/50 transition-all duration-300 ease-in-out
        ${activeIndex === index ? 'border-pink-500/50' : ''}
        ${animationPhase >= 3 ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        transitionDelay: `${400 + index * 80}ms` // Reduced from 800 + index * 120ms
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
    </div>
  );

  return (
    <>
      <style>{floatingAnimation}</style>
      <section
        ref={sectionRef}
        className={`
          relative transition-all duration-500 ease-out transform max-w-5xl mx-auto p-4 sm:p-6 md:p-8
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
      <div className="relative z-10 overflow-hidden">
        {/* Title Section with floating animation */}
        <div className={`
          text-center mb-8 sm:mb-12 transition-all duration-300 ease-in-out
          ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'}
          animate-float
        `}>
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgba(252,225,192,0.95)]">
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

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column with fade animation */}
          <div className={`
            lg:w-1/2 transition-all duration-300 ease-in-out
            ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="prose prose-invert max-w-none mb-6 sm:mb-8 relative">
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                To my website! I'm at the exciting crossroads of machine learning and statistics. 
                A statistics major at Kyambogo University and a self-taught machine-learning practitioner.
              </p>
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"></div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 
                bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
                hover:border-pink-500/50 hover:bg-neutral-800/80 transition-all duration-300 ease-in-out relative"
            >
              <FaUserCircle className="text-neutral-400 group-hover:text-pink-500 transition-colors duration-300" />
              <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors duration-300">
                Learn More About Me
              </span>
              <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1 text-pink-500">
                →
              </span>
            </Link>
          </div>

          {/* Right Column with fade animation */}
          <div className={`
            lg:w-1/2 transition-all duration-300 ease-in-out
            ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'}
          `}>
            <h3 className="text-lg sm:text-xl font-medium text-[rgba(252,225,192,0.95)] border-b border-neutral-800 pb-2 mb-4 sm:mb-6">
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