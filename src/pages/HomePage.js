import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaDatabase, FaBrain, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiTensorflow } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

const HomePage = () => {
  const [selectedDeepLearningProject, setSelectedDeepLearningProject] = useState(null);
  const [showWelcomeTyping, setShowWelcomeTyping] = useState(false);
  const [showAboutTyping, setShowAboutTyping] = useState(false);
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const [structuredDataIndex, setStructuredDataIndex] = useState(0);
  const [deepLearningIndex, setDeepLearningIndex] = useState(0);
  const [certificationsIndex, setCertificationsIndex] = useState(0);

  const structuredDataProjects = [
    {
      title: "Data Analysis Dashboard",
      description: "Interactive visualization of complex datasets",
      link: '/data-analysis-dashboard',
      coverImage: '/assets/structdata/struct_im1.jpg'
    },
    {
      title: "Predictive Modeling",
      description: "Machine learning models for business forecasting",
      link: '/predictive-modeling',
      coverImage: '/assets/structdata/struct_im2.jpg'
    },
    {
      title: "ETL Pipeline",
      description: "Efficient data processing and transformation",
      link: '/etl-pipeline',
      coverImage: '/assets/structdata/struct_im3.jpg'
    }
  ];

  const deepLearningProjects = [
    {
      title: "Neural Network Architectures",
      description: "Designing and implementing cutting-edge neural network structures for various applications in AI.",
      icon: <FaBrain />, 
      fullDescription: "This project involves the exploration and implementation of advanced neural network architectures, focusing on novel structures for efficiency and tackling complex tasks.",
      coverImage: '/assets/deeplearning/dl_im1.jpg'
    },
    {
      title: "Computer Vision Applications",
      description: "Object detection and image segmentation using Convolutional Neural Networks (CNNs).",
      icon: <FaBrain />,
      fullDescription: "Leveraging state-of-the-art CNNs to perform tasks such as real-time object detection and image segmentation, with applications in autonomous vehicles and medical imaging.",
      coverImage: '/assets/deeplearning/dl_im2.jpg'
    },
    {
      title: "Natural Language Processing",
      description: "Text analysis and generation with transformer models like BERT and GPT.",
      icon: <FaBrain />,
      fullDescription: "Harnessing transformer models for sentiment analysis, language translation, and creative text generation.",
      coverImage: '/assets/deeplearning/dl_im3.jpg'
    },
    {
      title: "Reinforcement Learning",
      description: "Training agents to make decisions in complex environments.",
      icon: <FaBrain />,
      fullDescription: "Developing AI agents that learn and adapt in challenging scenarios, from game-playing AIs to robotic control systems.",
      coverImage: '/assets/deeplearning/dl_im4.jpg'
    }
  ];

  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera",
      date: "2023",
      icon: <FaBrain />,
      link: "/certification/machine-learning-specialization"
    },
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera",
      date: "2023",
      icon: <FaBrain />,
      link: "/certification/deep-learning-specialization"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2024",
      icon: <SiTensorflow />,
      link: "/certification/tensorflow-developer"
    }
  ];

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
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    const welcomeElement = welcomeRef.current;
    const aboutElement = aboutRef.current;

    if (welcomeElement) observer.observe(welcomeElement);
    if (aboutElement) observer.observe(aboutElement);

    return () => {
      if (welcomeElement) observer.unobserve(welcomeElement);
      if (aboutElement) observer.unobserve(aboutElement);
    };
  }, []);

  const handleSlide = (direction, projectType) => {
    const projects = projectType === 'structured' ? structuredDataProjects : 
                     projectType === 'deep-learning' ? deepLearningProjects : 
                     certifications;
    const setIndex = projectType === 'structured' ? setStructuredDataIndex : 
                     projectType === 'deep-learning' ? setDeepLearningIndex : 
                     setCertificationsIndex;
  
    const calculateVisibleCards = () => {
      const screenWidth = window.innerWidth;
  
      if (screenWidth < 640) {
        // Mobile view: show 1 card at a time
        return 1;
      } else if (screenWidth < 1024) {
        // Tablet view: show 2 cards at a time
        return 2;
      } else {
        // Desktop view: show 3 cards at a time
        return 3;
      }
    };
  
    const visibleCards = calculateVisibleCards();
  
    setIndex((prevIndex) => {
      if (direction === 'left') {
        return prevIndex > 0 ? prevIndex - 1 : 0;
      } else {
        // Ensures enough cards remain in view based on the visibleCards count
        return prevIndex < projects.length - visibleCards ? prevIndex + 1 : prevIndex;
      }
    });
  };
  
  

  const renderSlider = (projects, projectType, currentIndex) => {
    const isStructured = projectType === 'structured';
    const isCertifications = projectType === 'certifications';

    return (
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4"
              onClick={() => !isStructured && !isCertifications && setSelectedDeepLearningProject(index)}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                {!isCertifications && (
                  <div className="relative overflow-hidden">
                    <img src={project.coverImage} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold">View Details</span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2 truncate">{project.title}</h4>
                  <p className="text-gray-300 text-sm line-clamp-3">{isCertifications ? `${project.issuer} - ${project.date}` : project.description}</p>
                </div>
                {isCertifications && (
                  <div className="flex justify-center p-4">
                    <div className="text-4xl text-blue-500 transition-transform duration-300 group-hover:scale-125">
                      {project.icon}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-75 hover:opacity-100 transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleSlide('left', projectType)}
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-75 hover:opacity-100 transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleSlide('right', projectType)}
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="h-screen flex items-center justify-center bg-cover bg-center relative" style={{backgroundImage: "url('/assets/hero.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl sm:text-7xl font-bold mb-4 bg-clip-text animate-pulse">
            <ReactTypingEffect
              text="Muhumuza Deus"
              typingDelay={200}
              speed={100}
              eraseDelay={10000000}
            />
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
        <section ref={welcomeRef} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300">
              {showWelcomeTyping && (
                <ReactTypingEffect
                  text="../Hello"
                  typingDelay={200}
                  speed={50}
                  eraseDelay={10000000}
                />
              )}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Welcome to my website! I'm at the exciting crossroads of
              machine learning and statistics. Here, I showcase my journey, including my bio,
              skills, and innovative projects that illustrate my passion for transforming data into actionable insights.
            </p>
          </div>
        </section>

        <section ref={aboutRef} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 lg:p-20 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300">
              {showAboutTyping && (
                <ReactTypingEffect
                  text="../About Me"
                  typingDelay={200}
                  speed={50}
                  eraseDelay={10000000}
                />
              )}
            </h2>
            <p className="text-gray-300 mb-4 text-base sm:text-lg leading-relaxed">
              I am currently a statistics student at Kyambogo University and a self-taught machine-learning practitioner with interests in deep learning.
            </p>
            <Link to="/about" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group">
              <FaUserCircle className="mr-2 group-hover:animate-bounce" /> Learn More About Me
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
            </Link>
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
                  <li key={index} className="bg-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transform hover:scale-110 transition-all duration-300 hover:bg-gray-700 cursor-pointer group">
                    <tech.icon className="mr-2 group-hover:animate-bounce" />
                    <span className="text-sm sm:text-base group-hover:font-semibold">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-orange-400">MY ACTIVITIES</h2>
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">My Work with Structured Datasets</h3>
            {renderSlider(structuredDataProjects, 'structured', structuredDataIndex)}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Deep Learning Explorations</h3>
            {renderSlider(deepLearningProjects, 'deep-learning', deepLearningIndex)}
            {selectedDeepLearningProject !== null && (
              <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mt-8 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <h4 className="text-xl sm:text-2xl font-semibold mb-4">{deepLearningProjects[selectedDeepLearningProject].title}</h4>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{deepLearningProjects[selectedDeepLearningProject].fullDescription}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Certifications</h3>
            {renderSlider(certifications, 'certifications', certificationsIndex)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;