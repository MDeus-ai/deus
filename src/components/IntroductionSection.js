import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaUserCircle } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiTensorflow } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

const techStack = [
  { 
    icon: FaPython, 
    name: 'Python',
    description: 'Core language',
    link: 'https://www.python.org/'
  },
  { 
    icon: SiPandas, 
    name: 'Pandas',
    description: 'Data analysis',
    link: 'https://pandas.pydata.org/'
  },
  { 
    icon: SiNumpy, 
    name: 'NumPy',
    description: 'Array computing',
    link: 'https://numpy.org/'
  },
  { 
    icon: SiScikitlearn, 
    name: 'Scikit-learn',
    description: 'ML algorithms',
    link: 'https://scikit-learn.org/'
  },
  { 
    icon: SiTensorflow, 
    name: 'TensorFlow',
    description: 'Deep learning',
    link: 'https://www.tensorflow.org/'
  }
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
          // Add a small delay before starting the typing animation
          setTimeout(() => {
            setStartTyping(true);
          }, 500);
        } else {
          // Reset states when section is out of view
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
        bg-gray-800 rounded-lg border border-gray-700 
        transition-all duration-150
        hover:bg-gray-700 hover:-translate-y-1 hover:border-gray-600 
        shadow-lg
        ${activeIndex === index ? 'border-gray-600' : ''}
        transform transition-all duration-500 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="flex items-center space-x-1.5">
        <tech.icon className="text-base sm:text-lg text-gray-400 group-hover:text-white transition-colors duration-150" />
        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-150 truncate">
          {tech.name}
        </span>
      </div>
      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-150 mt-1">
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
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 md:p-12">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:8rem_8rem]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title Section */}
          <div className={`
            text-center mb-12 transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white relative tracking-tight">
              <span className="opacity-20" />
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
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  To my website! I'm at the exciting crossroads of machine learning and statistics. 
                  Currently a statistics student at Kyambogo University and a self-taught machine-learning practitioner.
                </p>
              </div>

              <Link
                to="/about"
                className="group inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 
                  bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-150 
                  border border-gray-700 hover:border-gray-600 shadow-lg"
              >
                <FaUserCircle className="text-gray-400 group-hover:text-white transition-colors duration-150" />
                <span className="text-sm sm:text-base text-gray-400 group-hover:text-white transition-colors duration-150">
                  Learn More About Me
                </span>
                <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Right Column */}
            <div className={`
              lg:w-1/2 transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            `}>
              <h3 className="text-xl sm:text-2xl font-medium text-white border-b border-gray-800 pb-2 mb-6">
                Technologies I work with.
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