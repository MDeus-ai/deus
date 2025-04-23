import React, { useState, useEffect, useRef } from 'react';
import IntroductionSection from '../components/IntroductionSection';
import MilestoneTimeline from '../components/MilestoneTimeline';
import HeroSection from '../components/HeroSection';
import { FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

const allProjects = [
  {
    title: 'Kaggle Competitions',
    description: 'Notebooks, And Leaderboard Positions. See my work with structured datasets, including data cleaning, data-analysis, data-transformation, and leveraging machine-learning algorithms for classification and regression tasks',
    link: '/kaggle-competitions',
    coverImage: '/assets/images/structdata/kaggle_main_cover.png',
    technologies: [],
  },
  {
    title: 'Data Stories...',
    description: 'My machine learning and data science projects, including data analysis, data visualization, statistical modeling and machine learning. I also share my insights and findings from these projects',
    link: '/datastory',
    coverImage: '/assets/images/datastories/ds-cover.jpg',
    technologies: [],
  },
  {
    title: 'YouTube Content',
    description: 'Inspired From My Name, Deus (.M.L is for Machine Learning;)\nTopics I Cover include Machine Learning, Deep Learning, Coding tutorials, The underlying Math, and anything related',
    link: '/youtube',
    coverImage: '/assets/images/structdata/youtube.png',
    technologies: [],
  },
];

const certifications = [
  {
    title: "Introduction To Machine Learning",
    provider: "Kaggle",
    date: "2024",
    image: "/assets/images/certificates/M_deus.ai - Intro to Machine Learning.png",
    link: "https://www.kaggle.com/learn/certification/muhumuzadeusai/intro-to-machine-learning"
  },
  {
    title: "Intermediate Machine Learning",
    provider: "Kaggle",
    date: "2024",
    image: "/assets/images/certs/coursera.png",
    link: "https://www.kaggle.com/learn/certification/muhumuzadeusai/intermediate-machine-learning"
  },
];

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when out of view
          setIsVisible(false);
        }
      });
    }, { threshold: 0.1 });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ${className}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {typeof children === 'function' ? children(isVisible) : children}
    </div>
  );
};

const CertificationCard = ({ cert, index }) => (
  <FadeInSection delay={index * 200}>
    {(isVisible) => (
      <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-6 transition-all duration-600 transform 
        hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 border border-purple-500/10">
        <div className="flex items-center gap-4 mb-4">
          <FaCertificate className="text-3xl text-purple-400" />
          <div>
            <h3 className="text-xl font-bold text-white">
              {cert.title}
            </h3>
            <p className="text-gray-300">{cert.provider}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2">{cert.date}</p>
        <Link to={cert.link} className="mt-4 inline-block text-purple-400 hover:text-purple-300">
          View Certificate →
        </Link>
      </div>
    )}
  </FadeInSection>
);


const ProjectCard = ({ project, index, isEven }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
      });
    }, { threshold: 0.1 });

    const currentElement = cardRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const renderCardContent = (isVisible) => (
    <div className="transform transition-all duration-500 hover:scale-[1.02] will-change-transform">
      {/* Reduced height for mobile */}
      <div className="h-[325px] md:h-[400px] relative rounded-xl overflow-hidden group shadow-xl border border-neutral-800/60 transition-colors">
        {/* Cover Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 will-change-transform"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/assets/placeholder.jpg`;
            }}
          />
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Content Overlay - On top of the image */}
        <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-2 z-10">
          {/* Reduced padding on mobile */}
          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-10 sm:p-10 border border-white/10 transform transition-all duration-500 group-hover:bg-black/40 group-hover:border-purple-500/20">
            {/* Smaller font size for mobile */}
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300 mb-4 sm:mb-5">
              {isVisible ? (
                <ReactTypingEffect 
                  text={[project.title]}
                  typingDelay={200}
                  speed={30} 
                  eraseDelay={10000000}
                />
              ) : (
                <span className="opacity-0">{project.title}</span>
              )}
            </h3>
            {/* Smaller text and more limited line clamp on mobile */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
              {project.description}
            </p>
            <div className="pt-1 sm:pt-2 flex flex-wrap gap-1 sm:gap-2">
              {project.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2 sm:pt-4">
              <span className="inline-block text-purple-400 group-hover:text-purple-300 text-sm sm:text-base font-medium transition-colors duration-300 group-hover:translate-x-1">
                Explore →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <FadeInSection delay={index * 300} className="mb-8 sm:mb-16">
      {(isVisible) => (
        project.link ? (
          <Link to={project.link} className="block">
            {renderCardContent(isVisible)}
          </Link>
        ) : (
          renderCardContent(isVisible)
        )
      )}
    </FadeInSection>
  );
};

const HomePage = () => {
  return (
    <div className="bg-[#1a1b3c] text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="py-12 space-y-24 sm:space-y-36">
        {/* Introduction Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <IntroductionSection />
        </div>

        {/* Projects Section - Integrated with scroll */}
        <section className="py-8 sm:py-12 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b3c] via-[#151530] to-[#1a1b3c] -z-10"></div>
          <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(circle,rgba(120,50,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Narrow container for all screen sizes */}
          <div className="container mx-auto px-4 sm:px-8 lg:px-2 max-w-3xl">
            <FadeInSection>
              {(isVisible) => (
                <div className="text-center mb-10 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                    {isVisible ? (
                      <ReactTypingEffect 
                        text={["My Activities"]}
                        typingDelay={200}
                        speed={30} 
                        eraseDelay={10000000}
                      />
                    ) : (
                      <span>My Activities</span>
                    )}
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
                    Explore my activities in the world of data science and machine learning :)
                  </p>
                </div>
              )}
            </FadeInSection>

            {/* No additional max-width here, inherits from parent container */}
            <div className="space-y-8 sm:space-y-16">
              {allProjects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  project={project} 
                  index={index}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              {(isVisible) => (
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                    {isVisible ? (
                      <ReactTypingEffect 
                        text={["Certifications"]}
                        typingDelay={200}
                        speed={30} 
                        eraseDelay={10000000}
                      />
                    ) : (
                      <span>Certifications</span>
                    )}
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">Certifications and achievements in machine learning and data science</p>
                </div>
              )}
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Milestones Section */}
      <MilestoneTimeline />  
    </div>
  );
};
export default HomePage;