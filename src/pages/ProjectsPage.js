import React, { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const projectRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "Data Analysis Dashboard",
      description: "Interactive visualization of complex datasets using React and D3.js",
      image: `${process.env.PUBLIC_URL}/assets/images/project/proj_one.jpg`,
      github: "https://github.com/yourusername/data-dashboard",
      demo: "https://your-data-dashboard-demo.com",
      tags: ["React", "D3.js", "Data Visualization"]
    },
    {
      id: 2,
      title: "Predictive Modeling for Business Forecasting",
      description: "Machine learning models to predict business trends and outcomes",
      image: `${process.env.PUBLIC_URL}/assets/images/project/proj_one.jpg`,
      github: "https://github.com/yourusername/predictive-modeling",
      demo: "https://your-predictive-model-demo.com",
      tags: ["Python", "Scikit-learn", "Pandas"]
    },
    {
      id: 3,
      title: "Neural Network for Image Classification",
      description: "Deep learning model for classifying images using TensorFlow",
      image: `${process.env.PUBLIC_URL}/assets/images/project/proj_three.jpg`,
      github: "https://github.com/yourusername/image-classification",
      demo: "https://your-image-classifier-demo.com",
      tags: ["Python", "TensorFlow", "Deep Learning"]
    },
    {
      id: 4,
      title: "Natural Language Processing Chatbot",
      description: "AI-powered chatbot using NLP techniques",
      image: `${process.env.PUBLIC_URL}/assets/images/project/proj_four.jpg`,
      github: "https://github.com/yourusername/nlp-chatbot",
      demo: "https://your-chatbot-demo.com",
      tags: ["Python", "NLTK", "Machine Learning"]
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Capture the current refs to avoid issues during cleanup
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
    <div className="projects-page">
      <header className="projects-hero">
        <h1>My Projects</h1>
      </header>

      <main className="projects-content">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              ref={el => projectRefs.current[index] = el}
            >
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
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
