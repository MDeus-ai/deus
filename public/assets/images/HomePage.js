import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaBrain, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiTensorflow } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

// ProjectCard Component
const ProjectCard = ({ project, isActive }) => {
  // To adjust the size of the cards, modify the classes below
  const cardContent = (
    <div
      className={`transform transition-all duration-700 ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
      }`}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl group">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/assets/placeholder.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {project.title}
            </h3>
            {project.icon && <div className="text-blue-400 text-2xl">{project.icon}</div>}
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
          {project.fullDescription && (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">{project.fullDescription}</p>
            </div>
          )}
          <div className="pt-4 flex flex-wrap gap-2">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-gray-700 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <Link to={project.link} className="block">
        {cardContent}
      </Link>
    );
  } else {
    return cardContent;
  }
};

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showWelcomeTyping, setShowWelcomeTyping] = useState(false);
  const [showAboutTyping, setShowAboutTyping] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const autoPlayRef = useRef(null);

  const PUBLIC_URL = process.env.PUBLIC_URL || '';

  const allProjects = [
    {
      title: 'Data Analysis Dashboard',
      description: 'Interactive visualization of complex datasets',
      link: '/data-analysis-dashboard',
      coverImage: `${PUBLIC_URL}/assets/structdata/struct_im1.jpg`,
      technologies: ['Python', 'Pandas', 'Plotly'],
    },
    {
      title: 'Predictive Modeling',
      description: 'Machine learning models for business forecasting',
      link: '/predictive-modeling',
      coverImage: `${PUBLIC_URL}/assets/structdata/struct_im2.jpg`,
      technologies: ['Scikit-learn', 'TensorFlow', 'NumPy'],
    },
    {
      title: 'ETL Pipeline',
      description: 'Efficient data processing and transformation',
      link: '/etl-pipeline',
      coverImage: `${PUBLIC_URL}/assets/structdata/struct_im3.jpg`,
      technologies: ['Python', 'Apache Airflow', 'SQL'],
    },
    {
      title: 'Neural Network Architectures',
      description: 'Designing and implementing cutting-edge neural network structures',
      icon: <FaBrain />,
      fullDescription:
        'This project involves the exploration and implementation of advanced neural network architectures, focusing on novel structures for efficiency and tackling complex tasks.',
      coverImage: `${PUBLIC_URL}/assets/deeplearning/dl_im1.jpg`,
      technologies: ['PyTorch', 'TensorFlow', 'CUDA'],
    },
    {
      title: 'Computer Vision Applications',
      description: 'Object detection and image segmentation using CNNs',
      icon: <FaBrain />,
      fullDescription:
        'Leveraging state-of-the-art CNNs to perform tasks such as real-time object detection and image segmentation.',
      coverImage: `${PUBLIC_URL}/assets/deeplearning/dl_im2.jpg`,
      technologies: ['OpenCV', 'TensorFlow', 'YOLO'],
    },
  ];

  // Image Loading Effect
  useEffect(() => {
    const imageUrls = [
      `${PUBLIC_URL}/assets/hero.jpg`,
      ...allProjects.map((project) => project.coverImage),
    ];

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          resolve();
        };
      });
    };

    Promise.all(imageUrls.map((url) => loadImage(url)))
      .then(() => setImagesLoaded(true))
      .catch((error) => {
        console.error('Error loading images:', error);
        setLoadingError(true);
      });
  }, [PUBLIC_URL, allProjects]);

  // Intersection Observer Effect
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === welcomeRef.current) {
            setShowWelcomeTyping(true);
          } else if (entry.target === aboutRef.current) {
            setShowAboutTyping(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto Play Effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev === allProjects.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, allProjects.length]);

  const handleProjectNavigation = (direction) => {
    // Removed code that stops auto-scroll when arrows are pressed
    setCurrentProjectIndex((prev) => {
      if (direction === 'left') {
        return prev === 0 ? allProjects.length - 1 : prev - 1;
      }
      return prev === allProjects.length - 1 ? 0 : prev + 1;
    });
  };

  if (loadingError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Loading...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <header
        className="h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${PUBLIC_URL}/assets/hero.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl sm:text-7xl font-bold mb-4 bg-clip-text animate-pulse">
            <ReactTypingEffect text="Muhumuza Deus" typingDelay={200} speed={100} eraseDelay={10000000} />
          </h1>
          <p className="text-xl sm:text-2xl">
            <ReactTypingEffect
              text="machine learning, deep-learning, statistics"
              typingDelay={2000}
              speed={50}
              eraseDelay={10000000}
            />
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Welcome Section */}
        <section ref={welcomeRef} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300">
              {showWelcomeTyping && (
                <ReactTypingEffect text="../Hello" typingDelay={200} speed={50} eraseDelay={10000000} />
              )}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Welcome to my website! I'm at the exciting crossroads of machine learning and statistics. Here, I showcase
              my journey, including my bio, skills, and innovative projects that illustrate my passion for transforming
              data into actionable insights.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 lg:p-20 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300">
              {showAboutTyping && (
                <ReactTypingEffect text="../About Me" typingDelay={200} speed={50} eraseDelay={10000000} />
              )}
            </h2>
            <p className="text-gray-300 mb-4 text-base sm:text-lg leading-relaxed">
              I am currently a statistics student at Kyambogo University and a self-taught machine-learning practitioner
              with interests in deep learning.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            >
              <FaUserCircle className="mr-2 group-hover:animate-bounce" /> Learn More About Me
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
            </Link>

            {/* Technologies Section */}
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Technologies and libraries I work with:</h3>
              <ul className="flex flex-wrap gap-4">
                {[
                  { icon: FaPython, name: 'Python' },
                  { icon: SiPandas, name: 'Pandas' },
                  { icon: SiNumpy, name: 'NumPy' },
                  { icon: SiScikitlearn, name: 'Scikit-learn' },
                  { icon: SiTensorflow, name: 'TensorFlow' },
                ].map((tech, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transform hover:scale-110 transition-all duration-300 hover:bg-gray-700 cursor-pointer group"
                  >
                    <tech.icon className="mr-2 group-hover:animate-bounce" />
                    <span className="text-sm sm:text-base group-hover:font-semibold">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              My Activities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-purple-600 mx-auto rounded-full" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
              >
                {allProjects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <ProjectCard project={project} isActive={index === currentProjectIndex} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => handleProjectNavigation('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group"
              aria-label="Previous project"
            >
              <FaChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleProjectNavigation('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group"
              aria-label="Next project"
            >
              <FaChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Project Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {allProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`transition-all duration-300 focus:outline-none ${
                    index === currentProjectIndex
                      ? 'w-8 h-3 bg-gradient-to-r from-orange-400 to-purple-600 rounded-full'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded-full hover:scale-110'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">
                {currentProjectIndex + 1} / {allProjects.length}
              </span>
            </div>
          </div>

          {/* Project Details Modal (optional) */}
          {selectedProject !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{allProjects[selectedProject].title}</h3>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <img
                      src={allProjects[selectedProject].coverImage}
                      alt={allProjects[selectedProject].title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <p className="text-gray-300">
                      {allProjects[selectedProject].fullDescription ||
                        allProjects[selectedProject].description}
                    </p>
                    {allProjects[selectedProject].technologies && (
                      <div className="flex flex-wrap gap-2">
                        {allProjects[selectedProject].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {allProjects[selectedProject].link && (
                      <div className="pt-4">
                        <Link
                          to={allProjects[selectedProject].link}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          View Full Project
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Additional Sections can be added here */}
      </main>
    </div>
  );
};

export default HomePage;
