import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaUserCircle } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiPostgresql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

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
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setStartTyping(true);
          }, 500);
        } else {
          setIsVisible(false);
          setStartTyping(false);
        }
      },
      { threshold: 0.1 }
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
        hover:border-pink-500/50 transition-all duration-300
        transform hover:-translate-y-1
        ${activeIndex === index ? 'border-pink-500/50' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionDelay: `${index * 100}ms`
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
      <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mt-1">
        {tech.description}
      </p>
    </a>
  );

  return (
    <section
      ref={sectionRef}
      className={`
        relative transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="relative max-w-5xl mx-auto bg-[#1a1a2e] rounded-xl p-6 md:p-12 border border-neutral-800">
        {/* Grid Background */}
        <div className="absolute inset-1">
        <div className="absolute inset-2.5 bg-[linear-gradient(to_right,#FFA50033_1px,transparent_1px),linear-gradient(to_bottom,#FFA50033_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="absolute inset-2.5 bg-gradient-to-b from-transparent via-orange-500/5 to-orange-500/10" />
      </div>

        <div className="relative z-10">
          {/* Title Section */}
          <div className={`
            text-center mb-12 transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgba(252,225,192,0.95)]">
              {startTyping ? (
                <ReactTypingEffect 
                  text={["Welcome"]}
                  typingDelay={200}
                  speed={30} 
                  eraseDelay={10000000}
                />
              ) : (
                <span className="opacity-0">Welcome</span>
              )}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column */}
            <div className={`
              lg:w-1/2 transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
            `}>
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                  To my website! I'm at the exciting crossroads of machine learning and statistics. 
                  A statistics major at Kyambogo University and a self-taught machine-learning practitioner.
                </p>
              </div>

              <Link
                to="/about"
                className="group inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 
                  bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
                  hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaUserCircle className="text-neutral-400 group-hover:text-pink-500 transition-colors duration-300" />
                <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors duration-300">
                  Learn More About Me
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-pink-500">
                  →
                </span>
              </Link>
            </div>

            {/* Right Column */}
            <div className={`
              lg:w-1/2 transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
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
      </div>
    </section>
  );
};

export default IntroductionSection;