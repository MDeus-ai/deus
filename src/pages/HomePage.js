import React, { useState, useEffect, useRef } from 'react';
import AutoTransition from '../components/AutoTransition';
import IntroductionSection from '../components/IntroductionSection';
import MilestoneTimeline from '../components/MilestoneTimeline';
import HeroSection from '../components/HeroSection';
import { FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const allProjects = [
  {
    title: 'Kaggle Competitions',
    description: 'Notebooks, And Leaderboard Positions. See my work with structured datasets, including data cleaning, data-analysis, data-transformation, and leveraging machine-learning algorithms for classification and regression tasks',
    link: '/kaggle-competitions',
    coverImage: '/assets/images/structdata/kaggle_main_cover.jpg',
    technologies: [],
  },
  {
    title: 'My YouTube Content',
    description: 'Inspired From My Name, Deus (.M.L is for Machine Learning;)\nTopics I Cover include Machine Learning, Deep Learning, Coding tutorials, The underlying Math, and anything related',
    link: '/youtube',
    coverImage: '/assets/images/structdata/youtube.jpg',
    technologies: [],
  },
  {
    title: 'Data Stories',
    description: 'Uncovering interesting patterns in fictional and real datasets through various data analysis techniques, leveraging my insights to develop a playful and story like narrative\n (Playing with statistics)',
    link: '/datastory',
    coverImage: '/assets/images/datastories/ds-cover.jpg',
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
    <div className="bg-[#1a1a2e] rounded-xl p-6 transition-all duration-600 transform 
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
      <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-2xl group h-[550px]
        border border-neutral-800 relative
        md:hover:border-[#1a1a2e] transition-all duration-300
        after:absolute after:inset-0 after:rounded-xl after:pointer-events-none
        after:opacity-0 md:group-hover:after:opacity-100
        after:transition-opacity after:duration-300
        after:bg-gradient-to-r after:from-pink-500/0 after:via-pink-500/10 after:to-pink-500/0
        after:bg-[length:200%_200%] after:bg-clip-padding
        after:p-[1px] after:-m-[1px]">
        <div className="relative h-80 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/assets/placeholder.jpg`;
            }}
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white md:group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300">
              {project.title}
            </h3>
            {project.icon && <div className="text-pink-500 text-xl">{project.icon}</div>}
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-line overflow-y-auto max-h-32">
            {project.description}
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-neutral-800 text-neutral-300 rounded-full"
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
    <FadeInSection delay={index * 300}>
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
    <div className="bg-[#1a1b3c] text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Hero Section */}

      <HeroSection />

      {/* Main Content */}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-40">
        {/* Introduction Section */}
        <IntroductionSection />

        {/* Projects Section */}
        <section className="py-20">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                My Activities
              </h2>
            </div>
          </FadeInSection>

          <AutoTransition 
            items={allProjects}
            interval={2500}
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
              <h2 className="text-4xl font-bold mb-4 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
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
      {/* Milestones Section */}
      <MilestoneTimeline />  
    </div>
  );
};

export default HomePage;
