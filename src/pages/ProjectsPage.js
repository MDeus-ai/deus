import React, { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

// Fade-in section component (reused from HomePage & DataStoriesPage)
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
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

const ProjectsPage = () => {
  const projectRefs = useRef([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Set page title when component mounts
    document.title = 'My Projects | Muhumuza Deus';
    
    // Restore original title when component unmounts
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);

  const projects = [
    {
      id: 1,
      slug: "plantvision-cv001dd", // Added slug for routing
      title: "PlantVision(cv001dd)",
      description: "A Vision model based on the Convolutional Neural Network Architecture(CNN) for detecting and classifying plant diseases based on plant leaves",
      image: "/assets/images/project/plantvision.jpg",
      github: "https://github.com/MDeus-ai/PlantVision-cv001dd",
      tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],
    },
    // You can add more projects here
  ];

  // Filter projects based on search term only
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentProjectRefs = projectRefs.current;

    currentProjectRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentProjectRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1b3c] text-white">
      {/* Header Section - Styled like DataStoriesPage */}
      <header className="pt-20 md:pt-28 lg:pt-32 pb-8 md:pb-16 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151530] to-[#1a1b3c] -z-10"></div>
        <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(circle,rgba(120,50,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            {(isVisible) => (
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {isVisible ? (
                    <ReactTypingEffect 
                      text={["My Projects"]}
                      typingDelay={200}
                      speed={30} 
                      eraseDelay={10000000}
                    />
                  ) : (
                    <span>My Projects</span>
                  )}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 px-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  Explore my portfolio of projects showcasing my skills in machine learning, web development, 
                  and data science. Each project represents a unique challenge and solution.
                </p>
                
                {/* Search control - Mobile friendly */}
                <div className="flex flex-col gap-3 justify-center items-center mb-6 sm:mb-8">
                  <div className="relative w-full md:w-2/3">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#1a1a2e]/60 backdrop-blur-md border border-purple-500/20 rounded-full py-2 sm:py-3 px-5 sm:px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 text-sm sm:text-base"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                ref={el => projectRefs.current[index] = el}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out bg-[#1a1a2e] rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500/40 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group"
                style={{ transition: `transform 0.5s ease, opacity 0.7s ease ${index * 0.1}s` }}
              >
                {/* Project image - smaller height */}
                <Link to={`/projects/${project.slug}`} className="block relative h-40 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60"></div>
                </Link>

                <div className="p-4 bg-[#1a1a2e]/60 backdrop-blur-sm space-y-3">
                  {/* Project title - now a Link */}
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="block text-lg font-bold text-white group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300 mb-2"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    {project.title}
                  </Link>
                  
                  <p 
                    className="text-gray-300 text-sm line-clamp-2"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 text-xs bg-neutral-800/50 text-neutral-300 rounded-full"
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span 
                        className="px-2 py-0.5 text-xs bg-neutral-800/50 text-neutral-300 rounded-full"
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-purple-500/30">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-400 transition-colors"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      <FaGithub className="text-sm" />
                      <span>GitHub</span>
                    </a>
                    
                    {/* View Details Link */}
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="inline-block text-sm text-purple-400 group-hover:text-purple-300 font-medium transition-colors duration-300 group-hover:translate-x-1"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 md:py-16">
            <p className="text-lg text-gray-400">No projects match your search criteria.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 text-sm"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;