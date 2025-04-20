import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotebookViewer from '../components/NotebookViewer';
import { FaCalendarAlt, FaCode, FaDownload, FaLightbulb, FaBookmark, FaArrowLeft } from 'react-icons/fa';


// Fade-in section component (reused from HomePage)
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





// DATA STORIES
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
const dataStoriesDetails = {
  'titanic-data-analysis': {
    title: 'Titanic',
    description: 'Using the titanic dataset from kaggle to dig deep and understand the titanic disaster of 1912',
    coverImage: '/assets/datastories_assets/images/titanic.jpg',
    date: 'March 10, 2024',
    readTime: '12 min read',
    tags: ['Pandas', 'Seaborn', 'Matplotlib', 'Logistic Regression', 'Classification', 'Pandas'],
    notebookUrl: '/assets/datastories_assets/notebooks/titanic_story_nb.ipynb',
    featured: true,
    sections: [
        // {
        //     title: 'Introduction',
        //     content: 'The COVID-19 pandemic presented an unprecedented global challenge with varying responses and outcomes across different regions. This data story aims to examine how timing and strictness of lockdown measures correlated with case trajectories and mortality rates. By analyzing public health data from multiple countries, I sought to identify patterns that could inform future pandemic responses.',
        //     visualizations: [
        //       {
        //         id: 'global-cases-chart',
        //         title: 'Global COVID-19 Cases Timeline',
        //         description: 'Visualization of global case counts from January 2020 through December 2023',
        //         imageUrl: '/assets/images/datastories/covid-cases-timeline.jpg'
        //       }
        //     ]
        //   },
  
    ]
  },
  // 'weather-patterns': {
  //   title: 'Climate Change Patterns',
  //   description: 'Analysis of 100 years of weather data to identify climate change patterns and predict future trends.',
  //   coverImage: '/assets/datastories_assets/images/analysis1.jpg',
  //   date: 'January 15, 2024',
  //   readTime: '15 min read',
  //   tags: ['Climate Data', 'Time Series', 'Forecasting', 'Matplotlib'],
  //   summary: 'By analyzing historical weather data spanning the last century, this project aims to visualize climate change patterns and develop predictive models for future climate scenarios.',
  //   notebookUrl: '/assets/datastories_assets/notebooks/storytime.ipynb',
  //   featured: false,
  //   sections: [
  //     // Sections remain the same as in your original code
  //   ]
  // },
  // // Other stories remain the same
};
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////









const DataStoryDetailPage = () => {
  const { storyId } = useParams();
  const [activeTab, setActiveTab] = useState('story'); // 'story' or 'notebook'
  const [story, setStory] = useState(null);
  const [randomFeaturedStories, setRandomFeaturedStories] = useState([]);

  useEffect(() => {
    // Set page title when component mounts
    document.title = 'Data Story';
    
    // Restore original title when component unmounts
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);
  
  // Function to shuffle and select random featured stories
  const getRandomFeaturedStories = () => {
    // Get all featured stories
    const featuredStories = Object.entries(dataStoriesDetails)
      .filter(([_, storyData]) => storyData.featured)
      .map(([id, storyData]) => ({ id, ...storyData }));
    
    // Shuffle array
    const shuffled = [...featuredStories].sort(() => 0.5 - Math.random());
    
    // Take up to 3 stories (or fewer if there aren't enough featured stories)
    return shuffled.slice(0, Math.min(3, shuffled.length));
  };
  
  useEffect(() => {
    // In a real app, you would fetch the story data from an API
    // For now, we'll use our sample data
    if (dataStoriesDetails[storyId]) {
      setStory(dataStoriesDetails[storyId]);
    }
    
    // Set random featured stories
    setRandomFeaturedStories(getRandomFeaturedStories());
    
    // Scroll to top when story changes
    window.scrollTo(0, 0);
  }, [storyId]);
  
  if (!story) {
    return (
      <div className="bg-[#1a1b3c] text-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Story not found</h2>
          <p className="mb-6 text-sm md:text-base">The data story you're looking for doesn't exist or has been moved.</p>
          <Link to="/datastory" className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-purple-600 text-white text-sm md:text-base rounded-full hover:bg-purple-700 transition-colors duration-300">
            <FaArrowLeft className="mr-2" /> Back to Data Stories
          </Link>
          
          {randomFeaturedStories.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg md:text-xl font-bold mb-6">Featured Stories You Might Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured stories rendering remains the same */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Render code blocks with syntax highlighting
  const CodeBlock = ({ code }) => {
    return (
      <div className="bg-[#1a1a2e] rounded-lg overflow-hidden my-6 border border-purple-500/10">
        <pre className="overflow-x-auto p-4 text-sm text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    );
  };
  
  // Render visualization with caption
  const Visualization = ({ viz }) => {
    return (
      <figure className="my-6">
        <div className="rounded-lg overflow-hidden border border-purple-500/10 relative">
          <img 
            src={viz.imageUrl} 
            alt={viz.title} 
            className="w-full object-cover h-64 md:h-auto"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              // Better placeholder with dimensions and visualization title
              const placeholderEl = document.createElement('div');
              placeholderEl.className = 'absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a2e] text-purple-400';
              placeholderEl.innerHTML = `
                <FaImage className="text-4xl mb-2" />
                <p className="text-center px-4 text-sm">${viz.title}</p>
              `;
              e.target.parentNode.appendChild(placeholderEl);
              e.target.style.visibility = 'hidden';
            }}
          />
        </div>
        <figcaption className="mt-2 text-center">
          <h4 className="font-bold text-lg text-white">{viz.title}</h4>
          <p className="text-gray-400 text-sm">{viz.description}</p>
        </figcaption>
      </figure>
    );
  };
  
  return (
    <div className="bg-[#1a1b3c] text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
    {/* Enhanced Hero Section - Optimized for mobile and desktop */}
    <header className="relative h-auto pt-20 pb-12 md:py-16 lg:py-20 md:h-[50vh] md:min-h-[300px] lg:min-h-[400px] overflow-hidden">
    {/* Background Image with improved overlay */}
    <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-[#1a1a2e] flex items-center justify-center">
        <img 
            src={story.coverImage} 
            alt={story.title} 
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
            onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.innerHTML = `
                <div class="w-full h-full flex flex-col items-center justify-center">
                <span class="text-4xl text-purple-400 mb-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg></span>
                <p class="text-center px-4">${story.title}</p>
                </div>
            `;
            }}
        />
        </div>
        {/* Improved gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3c] via-[#1a1b3c]/85 to-[#1a1b3c]/50"></div>
    </div>
    
    {/* Header Content - Enhanced for mobile and desktop */}
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">          
        {/* Added breadcrumb for better navigation */}
        <div className="hidden md:flex items-center mb-6 text-sm text-gray-400">
        <Link to="/datastory" className="hover:text-purple-300 transition-colors flex items-center">
            <FaArrowLeft className="mr-2 text-xs" /> Data Stories
        </Link>
        <span className="mx-2">•</span>
        <span className="text-purple-300">{story.title}</span>
        </div>
        
        {/* Title with improved typography and spacing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight max-w-4xl">
        {story.title}
        </h1>
        
        {/* Meta information with better alignment and responsive design */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 text-gray-300 mb-6 md:mb-8">
        <div className="flex items-center bg-purple-900/30 px-3 py-1 rounded-full">
            <FaCalendarAlt className="mr-2 text-purple-400" />
            <span>{story.date}</span>
        </div>
        <div className="flex items-center bg-purple-900/30 px-3 py-1 rounded-full">
            <span className="mr-1">📚</span>
            <span>{story.readTime}</span>
        </div>
        </div>
        
        {/* Tags with improved styling and spacing */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {story.tags.map((tag, i) => (
            <span 
            key={i} 
            className="px-3 py-1 text-sm font-medium bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 rounded-full transition-colors cursor-pointer"
            >
            {tag}
            </span>
        ))}
        </div>
        
    </div>
    </header>

      {/* Main Content with Tab Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-purple-500/20 mb-6 overflow-x-auto">
          <button
            className={`py-2 px-3 md:py-3 md:px-4 font-medium flex items-center transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
              activeTab === 'story' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('story')}
          >
            <FaBookmark className="mr-1 md:mr-2" /> Story & Insights
          </button>
          <button
            className={`py-2 px-3 md:py-3 md:px-4 font-medium flex items-center transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
              activeTab === 'notebook' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('notebook')}
          >
            <FaCode className="mr-1 md:mr-2" /> Notebook & Code
          </button>
        </div>
        
        {/* Content Area - Full width for notebook view */}
        <div className={activeTab === 'notebook' ? "w-full" : "max-w-4xl mx-auto"}>
          {activeTab === 'story' ? (
            // Story View - Summary and insights
            <div>
              {/* Summary Section */}
              <FadeInSection className="mb-6 md:mb-10">
                <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-500/10">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-full">
                      <FaLightbulb className="text-lg md:text-xl text-purple-400" />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">Key Insights</h2>
                  </div>
                </div>
              </FadeInSection>
              
              {/* Content Sections */}
              {story.sections.map((section, idx) => (
                <FadeInSection key={idx} delay={idx * 100} className="mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[rgba(252,225,192,0.95)]">{section.title}</h2>
                  <div className="prose prose-sm md:prose-base prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-3 text-gray-300 text-sm md:text-base">{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Code Snippet if available */}
                  {section.codeSnippet && <CodeBlock code={section.codeSnippet} />}
                  
                  {/* Visualizations if available */}
                  {section.visualizations && section.visualizations.map((viz, i) => (
                    <Visualization key={i} viz={viz} />
                  ))}
                </FadeInSection>
              ))}
            </div>
          ) : (
            // Notebook View - Removed fade-in effect and increased width
            <div>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[rgba(252,225,192,0.95)]">Interactive Notebook</h2>
                  <a 
                    href={story.notebookUrl} 
                    className="inline-flex items-center justify-center px-3 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 text-sm"
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    <FaDownload className="mr-2" /> Download Notebook
                  </a>
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  This is the complete Jupyter notebook containing all the code, analysis, and visualizations forthis data story. You can toggle the code cells visibility using the controls below, or download the notebook to run it yourself.
                </p>
              </div>
              
              {/* Our new Notebook Viewer component */}
              <div>
                <NotebookViewer notebookUrl={story.notebookUrl} />
              </div>
            
              <div className="mt-12">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-[rgba(252,225,192,0.95)]">Key Code Snippets</h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">
                  These are the most important code segments from the notebook that drive the analysis:
                </p>
                
                <div className="space-y-8">
                  {story.sections.filter(section => section.codeSnippet).map((section, idx) => (
                    <div key={idx} className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-500/10">
                      <h4 className="text-lg md:text-xl font-bold mb-3 text-white">{section.title}</h4>
                      <CodeBlock code={section.codeSnippet} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add custom CSS for Jupyter notebook styling */}
      <style jsx global>{`
        /* Custom styles for Jupyter notebook */
        .custom-jupyter-notebook {
          font-family: 'Roboto Slab', serif;
          color: #e2e8f0;
        }
        
        .custom-jupyter-notebook .jp-Cell {
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          margin-bottom: 1rem;
          padding-bottom: 1rem;
        }
        
        .custom-jupyter-notebook .jp-InputArea-editor {
          background-color: #111827;
          border-radius: 0.375rem;
          padding: 0.75rem;
          font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
        }
        
        .custom-jupyter-notebook .jp-OutputArea-output {
          background-color: rgba(17, 24, 39, 0.6);
          border-radius: 0.375rem;
          padding: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .custom-jupyter-notebook pre {
          white-space: pre-wrap;
        }
        
        .custom-jupyter-notebook img {
          max-width: 100%;
          height: auto;
          margin: 1rem auto;
          display: block;
          border-radius: 0.375rem;
        }
        
        .custom-jupyter-notebook table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        
        .custom-jupyter-notebook th, 
        .custom-jupyter-notebook td {
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 0.5rem;
          text-align: left;
        }
        
        .custom-jupyter-notebook th {
          background-color: rgba(139, 92, 246, 0.1);
        }
        
        .custom-jupyter-notebook tr:nth-child(even) {
          background-color: rgba(30, 41, 59, 0.5);
        }
        
        /* Custom scrollbar for notebook container */
        .notebook-viewer div::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .notebook-viewer div::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        
        .notebook-viewer div::-webkit-scrollbar-thumb {
          background-color: #4c1d95;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default DataStoryDetailPage;