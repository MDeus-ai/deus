import React, { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsPage = () => {
  const projectRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "Data Analysis Dashboard",
      description: "Interactive visualization of complex datasets using React and D3.js, enabling users to explore and understand complex data patterns through intuitive interfaces.",
      image: "/assets/images/project/cover_1.jpg",
      github: "https://github.com/yourusername/data-dashboard",
      demo: "https://your-data-dashboard-demo.com",
      tags: ["React", "D3.js", "Data Visualization"]
    },
    {
      id: 2,
      title: "Predictive Modeling for Business Forecasting",
      description: "Machine learning models to predict business trends and outcomes, helping organizations make data-driven decisions with confidence.",
      image: "/assets/images/project/cover_1.jpg",
      github: "https://github.com/yourusername/predictive-modeling",
      demo: "https://your-predictive-model-demo.com",
      tags: ["Python", "Scikit-learn", "Pandas"]
    },
    {
      id: 3,
      title: "Neural Network for Image Classification",
      description: "Deep learning model for classifying images using TensorFlow, achieving high accuracy in identifying and categorizing visual content.",
      image: "/assets/images/project/cover_1.jpg",
      github: "https://github.com/yourusername/image-classification",
      demo: "https://your-image-classifier-demo.com",
      tags: ["Python", "TensorFlow", "Deep Learning"]
    },
    {
      id: 4,
      title: "Natural Language Processing Chatbot",
      description: "AI-powered chatbot using NLP techniques to provide natural and context-aware responses to user queries.",
      image: "/assets/images/project/cover_1.jpg",
      github: "https://github.com/yourusername/nlp-chatbot",
      demo: "https://your-chatbot-demo.com",
      tags: ["Python", "NLTK", "Machine Learning"]
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/assets/images/project/main_cover.jpg" 
            alt="Projects header"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 
            className="text-4xl md:text-5xl font-bold text-text-primary z-10"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            My Projects
          </h1>
          <p 
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            Exploring the intersection of data science, machine learning, and web development
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group"
              style={{ transition: `transform 0.5s ease, opacity 0.7s ease ${index * 0.1}s` }}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
              </div>

              <div className="p-6 space-y-4">
                <h3 
                  className="text-xl md:text-2xl font-bold text-blue-400 line-clamp-2"
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-gray-300 line-clamp-3"
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    <FaGithub className="text-xl" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;