import React, { useState, useEffect, useRef } from 'react';
// FaGithub might not be used directly here anymore, but keep if needed elsewhere
// import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

// Fade-in section component (reused) - No changes needed here
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
        // Optional: Reset visibility when scrolling out of view if desired
        // else {
        //   setIsVisible(false);
        // }
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
      className={`transition-all duration-700 ease-out ${className}
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
    document.title = 'My Projects | Muhumuza Deus';
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);

  const projects = [
    {
      id: 1,
      slug: "plantvision-cv001dd",
      title: "PlantVision cv001dd (Currently under development...)",
      description: "A Vision model based on the Convolutional Neural Network Architecture(CNN) for detecting and classifying plant diseases based on plant leaves",
      image: "/assets/images/project/plantvision.jpg",
      github: "https://github.com/MDeus-ai/PlantVision-cv001dd",
      tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],
    },
  ];

  const filteredProjects = projects.filter(project => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(lowerSearchTerm) ||
                        project.description.toLowerCase().includes(lowerSearchTerm) ||
                        project.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
    return matchesSearch;
  });

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          // obs.unobserve(entry.target); // Optional: Keep observing or unobserve
        }
        // Optional: Reset if scrolled out
        // else {
        //    entry.target.classList.add('opacity-0', 'translate-y-8');
        //    entry.target.classList.remove('opacity-100', 'translate-y-0');
        // }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentProjectRefs = projectRefs.current;
    const refsToObserve = currentProjectRefs.filter(ref => ref !== null);
    refsToObserve.forEach(ref => observer.observe(ref));

    return () => {
        refsToObserve.forEach(ref => {
            if (ref) observer.unobserve(ref);
        });
    };
  }, [filteredProjects]);


  return (
    <div className="min-h-screen bg-[#1a1b3c] text-white">
      {/* Header Section */}
      <header className="pt-20 md:pt-28 lg:pt-32 pb-8 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#151530] to-[#1a1b3c] -z-10"></div>
        <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(circle,rgba(120,50,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            {(isVisible) => (
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {isVisible ? (
                    <ReactTypingEffect text={["My Projects"]} typingDelay={200} speed={30} eraseDelay={10000000} />
                  ) : (
                    <span>My Projects</span>
                  )}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 px-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  Explore my portfolio of end-to-end projects showcasing my skills in machine learning, deep learning and data science. Click on a project to see the details.
                </p>
                <div className="flex flex-col gap-3 justify-center items-center mb-6 sm:mb-8">
                  <div className="relative w-full md:w-2/3">
                    <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#1a1a2e]/60 backdrop-blur-md border border-purple-500/20 rounded-full py-2 sm:py-3 px-5 sm:px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 text-sm sm:text-base" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap slightly */}
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={el => projectRefs.current[index] = el}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500/40 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  {/* V-- ADJUST CARD HEIGHT HERE --V */}
                  {/* Change h-64, md:h-72, lg:h-80 to control the card's height */}
                  {/* Use Tailwind height scale: h-48, h-52, h-56, h-60, h-64, h-72, h-80, h-96 etc. */}
                  <div className="relative h-96 md:h-96 lg:h-96 w-full"> {/* <<< INCREASED HEIGHT */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

                    {/* V-- ADJUST TITLE SIZE & PADDING HERE --V */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5"> {/* <<< Increased Padding */}
                      {/* Change text-lg, sm:text-xl, md:text-2xl to control font size */}
                      {/* Use Tailwind font sizes: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl etc. */}
                      <h3
                        className="text-lg sm:text-xl md:text-3xl font-bold text-white group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300 truncate" /* <<< INCREASED TEXT SIZE */
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // No changes needed for the 'No projects' section
          <div className="text-center py-10 md:py-16">
            <p className="text-lg text-gray-400">No projects match your search criteria.</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 text-sm">
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;