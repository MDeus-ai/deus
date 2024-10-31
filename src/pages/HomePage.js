import React, { useState, useEffect, useRef } from 'react';
import { FaPython, FaBrain, FaUserCircle, FaChevronLeft, FaChevronRight, FaCertificate } from 'react-icons/fa';
import { SiPandas, SiNumpy, SiScikitlearn, SiTensorflow } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

const techStack = [
  { icon: FaPython, name: 'Python' },
  { icon: SiPandas, name: 'Pandas' },
  { icon: SiNumpy, name: 'NumPy' },
  { icon: SiScikitlearn, name: 'Scikit-learn' },
  { icon: SiTensorflow, name: 'TensorFlow' },
];

const allProjects = [
  {
    title: 'Kaggle Competitions',
    description: 'Notebooks, And Leaderboard Positions. See my work with structured datasets, including data cleaning, data-analysis, data-transformation, and leveraging machine-learning algorithms for classification and regression tasks',
    link: '/kaggle-competitions',
    coverImage: '/assets/images/structdata/kaggle.png',
    technologies: ['Python', 'Pandas', 'Numpy', 'Scikit-Learn'],
  },
  {
    title: 'Predictive Modeling',
    description: 'Machine learning models for business forecasting',
    link: '/predictive-modeling',
    coverImage: '/assets/images/structdata/struct_im2.jpg',
    technologies: ['Scikit-learn', 'TensorFlow', 'NumPy'],
  },
  {
    title: 'ETL Pipeline',
    description: 'Efficient data processing and transformation',
    link: '/etl-pipeline',
    coverImage: '/assets/images/structdata/struct_im3.jpg',
    technologies: ['Python', 'Apache Airflow', 'SQL'],
  },
  {
    title: 'Neural Network Architectures',
    description: 'Designing and implementing cutting-edge neural network structures',
    icon: <FaBrain />,
    fullDescription:
      'This project involves the exploration and implementation of advanced neural network architectures, focusing on novel structures for efficiency and tackling complex tasks.',
    coverImage: '/assets/images/deeplearning/dl_im1.jpg',
    technologies: ['PyTorch', 'TensorFlow', 'CUDA'],
  },
  {
    title: 'Computer Vision Applications',
    description: 'Object detection and image segmentation using CNNs',
    icon: <FaBrain />,
    fullDescription:
      'Leveraging state-of-the-art CNNs to perform tasks such as real-time object detection and image segmentation.',
    coverImage: '/assets/images/deeplearning/dl_im2.jpg',
    technologies: ['OpenCV', 'TensorFlow', 'YOLO'],
  },
];

const certifications = [
  {
    title: "Machine Learning Specialization",
    provider: "DeepLearning.AI",
    date: "2023",
    image: "/assets/images/certs/dl-ai.png",
    link: "#"
  },
  {
    title: "Deep Learning Specialization",
    provider: "Coursera",
    date: "2023",
    image: "/assets/images/certs/coursera.png",
    link: "#"
  },
  {
    title: "Data Science Professional Certificate",
    provider: "IBM",
    date: "2023",
    image: "/assets/images/certs/ibm.png",
    link: "#"
  }
];

const CertificationCard = ({ cert, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-gray-800 rounded-xl p-6 transition-all duration-700 transform 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <FaCertificate className="text-3xl text-purple-400" />
        <div>
          <h3 className="text-xl font-bold text-white">{cert.title}</h3>
          <p className="text-gray-300">{cert.provider}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-2">{cert.date}</p>
      <Link to={cert.link} className="mt-4 inline-block text-purple-400 hover:text-purple-300">
        View Certificate →
      </Link>
    </div>
  );
};

const ProjectCard = ({ project, isActive, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const cardContent = (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl group h-[550px]">
        <div className="relative h-80 overflow-hidden">
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
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {project.title}
            </h3>
            {project.icon && <div className="text-blue-400 text-xl">{project.icon}</div>}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{project.description}</p>
          <div className="pt-2 flex flex-wrap gap-1">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-700 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return project.link ? <Link to={project.link} className="block">{cardContent}</Link> : cardContent;
};

const HomePage = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [showWelcomeTyping, setShowWelcomeTyping] = useState(false);
  const [showAboutTyping, setShowAboutTyping] = useState(false);
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === welcomeRef.current) setShowWelcomeTyping(true);
          if (entry.target === aboutRef.current) setShowAboutTyping(true);
        }
      });
    }, { threshold: 0.5 });

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  const handleProjectNavigation = (direction) => {
    setCurrentProjectIndex((prev) => (direction === 'left' ? (prev === 0 ? allProjects.length - 1 : prev - 1) : (prev === allProjects.length - 1 ? 0 : prev + 1)));
  };

  return (
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Hero Section */}
      <header className="h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url(/assets/hero.jpg)` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl sm:text-7xl font-bold mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
            <ReactTypingEffect text="Muhumuza Deus" typingDelay={200} speed={100} eraseDelay={10000000} component="span" />
          </h1>
          <p className="text-xl sm:text-2xl" style={{ fontFamily: 'Roboto Slab, serif' }}>
            <ReactTypingEffect text="machine learning, deep-learning, statistics" typingDelay={2000} speed={50} eraseDelay={10000000} component="span" />
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Welcome Section */}
        <section ref={welcomeRef} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300" style={{ fontFamily: 'Roboto Slab, serif' }}>
              {showWelcomeTyping && <ReactTypingEffect text="../Hello" typingDelay={200} speed={50} eraseDelay={10000000} component="span" />}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Roboto Slab, serif' }}>
              Welcome to my website! I'm at the exciting crossroads of machine learning and statistics.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 transform skew-y-6 sm:skew-y-3 -z-10"></div>
          <div className="relative bg-gray-800 rounded-lg p-6 sm:p-8 lg:p-20 shadow-2xl bg-opacity-90">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-300" style={{ fontFamily: 'Roboto Slab, serif' }}>
              {showAboutTyping && <ReactTypingEffect text="../About Me" typingDelay={200} speed={50} eraseDelay={10000000} component="span" />}
            </h2>
            <p className="text-gray-300 mb-4 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Roboto Slab, serif' }}>
              I am currently a statistics student at Kyambogo University and a self-taught machine-learning practitioner.
            </p>
            <Link to="/about" className="inline-flex items-center text-blue-400 hover:text-blue-300">
              <FaUserCircle className="mr-2" /> Learn More About Me
            </Link>
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Technologies I work with:</h3>
              <ul className="flex flex-wrap gap-4">
                {techStack.map((tech, index) => (
                  <li key={index} className="bg-gray-700 px-3 py-2 rounded-full flex items-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
                    <tech.icon className="mr-2" />
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto Slab, serif' }}>
              My Activities
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}>
                {allProjects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-0 sm:px-4">
                    <ProjectCard 
                      project={project} 
                      isActive={index === currentProjectIndex} 
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleProjectNavigation('left')} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group">
              <FaChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
            </button>

            <button onClick={() => handleProjectNavigation('right')} className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none group">
              <FaChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto Slab, serif' }}>
              Certifications
            </h2>
            <p className="text-gray-300 text-lg mb-8">Professional certifications and achievements in machine learning and data science</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
