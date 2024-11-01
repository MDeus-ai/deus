import React, { useState, useEffect, useRef } from 'react';
import AutoTransition from '../components/AutoTransition';
import ZoomHeroSection from '../components/HeroZoom';
import IntroductionSection from '../components/IntroductionSection';
import { FaBrain, FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';



const allProjects = [
  {
    title: 'Kaggle Competitions',
    description: 'Notebooks, And Leaderboard Positions. See my work with structured datasets, including data cleaning, data-analysis, data-transformation, and leveraging machine-learning algorithms for classification and regression tasks',
    link: '/kaggle-competitions',
    coverImage: '/assets/images/structdata/kaggle_main_cover.png',
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
  {
    title: "Data Science Professional Certificate",
    provider: "IBM",
    date: "2023",
    image: "/assets/images/certs/ibm.png",
    link: "#"
  }
];


const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.2 });

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
      {children}
    </div>
  );
};


const CertificationCard = ({ cert, index }) => (
  <FadeInSection delay={index * 200}>
    <div className="bg-gray-800 rounded-xl p-6 transition-all duration-600 transform 
      hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
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
  </FadeInSection>
);

const ProjectCard = ({ project, isActive, index }) => {
  const cardContent = (
    <div className={`transform transition-all duration-700
      ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
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

  return (
    <FadeInSection delay={index * 200}>
      {project.link ? (
        <Link to={project.link} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </FadeInSection>
  );
};

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Hero Section */}
      <ZoomHeroSection backgroundImage="/assets/hero.jpg">
        <h1 className="text-4xl sm:text-7xl font-bold mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
          <ReactTypingEffect text="Muhumuza Deus" typingDelay={200} speed={100} eraseDelay={10000000} />
        </h1>
        <div className="text-xl sm:text-2xl" style={{ fontFamily: 'Roboto Slab, serif' }}>
          <ReactTypingEffect 
            text="machine learning, deep-learning, statistics" 
            typingDelay={2000} 
            speed={50} 
            eraseDelay={10000000}
          />
        </div>
      </ZoomHeroSection>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-40">
        {/* New Introduction Section */}
        <IntroductionSection />

        {/* Projects Section */}
        <section className="py-20">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto Slab, serif' }}>
                My Activities
              </h2>
            </div>
          </FadeInSection>

          <AutoTransition 
            items={allProjects}
            interval={5000}
            renderItem={(project, isActive, index) => (
              <ProjectCard 
                project={project} 
                isActive={isActive} 
                index={index}
              />
            )}
          />
        </section>

        {/* Certifications Section */}
        <section className="py-2">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Roboto Slab, serif' }}>
                Certifications
              </h2>
              <p className="text-gray-300 text-lg mb-8">Certifications and achievements in machine learning and data science</p>
            </div>
          </FadeInSection>
          
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
