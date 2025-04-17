import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaCode, FaDownload, FaLightbulb, FaBookmark, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';


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

// Notebook viewer component
// A simple custom implementation of a Jupyter notebook viewer
const NotebookViewer = ({ notebookUrl }) => {
    const [notebookData, setNotebookData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCode, setShowCode] = useState(true);
  
    useEffect(() => {
      setIsLoading(true);
      setError(null);
      
      fetch(notebookUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load notebook (${response.status})`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Loaded notebook data:", {
            hasMetadata: !!data.metadata,
            cellsCount: data.cells?.length || 0,
            nbformat: data.nbformat
          });
          setNotebookData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to load notebook:", err);
          setError(err.message);
          setIsLoading(false);
        });
    }, [notebookUrl]);
  
    if (isLoading) {
      return (
        <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-purple-500/10 flex flex-col items-center justify-center h-96">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/30 mb-4 flex items-center justify-center">
              <FaCode className="text-2xl text-purple-300 animate-spin" />
            </div>
            <div className="h-5 w-64 bg-purple-500/30 rounded-full mb-4"></div>
            <div className="h-3 w-48 bg-purple-500/20 rounded-full"></div>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-red-500/20 flex flex-col items-center justify-center h-96">
          <FaExclamationTriangle className="text-4xl text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Failed to load notebook</h3>
          <p className="text-gray-400 text-center">{error}</p>
          <div className="flex gap-4 mt-6">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <a 
              href={notebookUrl} 
              download
              className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg flex items-center transition-colors"
            >
              <FaDownload className="mr-1" /> Download Raw
            </a>
          </div>
        </div>
      );
    }
  
    if (!notebookData || !notebookData.cells || !Array.isArray(notebookData.cells)) {
      return (
        <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-yellow-500/20 flex flex-col items-center justify-center h-96">
          <FaExclamationTriangle className="text-4xl text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Invalid Notebook Format</h3>
          <p className="text-gray-400 text-center">The notebook doesn't have the expected structure.</p>
          <a 
            href={notebookUrl} 
            download
            className="mt-6 px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg flex items-center transition-colors"
          >
            <FaDownload className="mr-1" /> Download Raw
          </a>
        </div>
      );
    }
  
    // Helper function to render cell content based on cell type
    const renderCell = (cell, index) => {
      // Markdown cell
      if (cell.cell_type === 'markdown') {
        return (
          <div key={index} className="notebook-cell markdown-cell py-3 px-4 border-b border-purple-500/10">
            <div className="markdown-content prose prose-invert max-w-none" 
                 dangerouslySetInnerHTML={{ __html: convertMarkdown(cell.source) }}>
            </div>
          </div>
        );
      }
      
      // Code cell
      else if (cell.cell_type === 'code') {
        return (
          <div key={index} className="notebook-cell code-cell py-3 border-b border-purple-500/10">
            {/* Input */}
            {showCode && (
              <div className="flex">
                <div className="cell-prompt px-3 py-2 text-purple-400 font-mono text-sm text-right w-16">
                  In [{cell.execution_count || ' '}]:
                </div>
                <div className="cell-input bg-[#111827] flex-1 p-2 rounded-lg my-1 overflow-x-auto">
                  <pre className="font-mono text-sm text-gray-300">{Array.isArray(cell.source) ? cell.source.join('') : cell.source}</pre>
                </div>
              </div>
            )}
            
            {/* Output */}
            {cell.outputs && cell.outputs.length > 0 && (
              <div className="flex mt-1">
                <div className="cell-prompt px-3 py-2 text-purple-400 font-mono text-sm text-right w-16">
                  Out [{cell.execution_count || ' '}]:
                </div>
                <div className="cell-output bg-[#111827]/50 flex-1 p-2 rounded-lg my-1 overflow-x-auto">
                  {cell.outputs.map((output, i) => renderOutput(output, i))}
                </div>
              </div>
            )}
          </div>
        );
      }
      
      // Unknown cell type
      return (
        <div key={index} className="notebook-cell unknown-cell py-2 px-4 border-b border-purple-500/10 text-gray-400 italic">
          Unsupported cell type: {cell.cell_type}
        </div>
      );
    };
  
    // Helper function to render cell outputs
    const renderOutput = (output, index) => {
      // Text/plain output
      if (output.output_type === 'stream' || (output.output_type === 'execute_result' && output.data && output.data['text/plain'])) {
        const text = output.text || output.data['text/plain'];
        return (
          <pre key={index} className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
            {Array.isArray(text) ? text.join('') : text}
          </pre>
        );
      }
      
      // Display data (images, HTML, etc.)
      else if (output.output_type === 'display_data' || output.output_type === 'execute_result') {
        // Handle HTML
        if (output.data && output.data['text/html']) {
          const html = Array.isArray(output.data['text/html']) 
            ? output.data['text/html'].join('') 
            : output.data['text/html'];
          return (
            <div key={index} dangerouslySetInnerHTML={{ __html: html }}></div>
          );
        }
        
        // Handle images
        else if (output.data && output.data['image/png']) {
          const imgData = output.data['image/png'];
          return (
            <div key={index} className="flex justify-center py-2">
              <img 
                src={`data:image/png;base64,${imgData}`} 
                alt="Output visualization" 
                className="max-w-full rounded-lg" 
              />
            </div>
          );
        }
      }
      
      // Error output
      else if (output.output_type === 'error') {
        return (
          <div key={index} className="error-output text-red-400 font-mono text-sm">
            <div className="font-bold">{output.ename}: {output.evalue}</div>
            {output.traceback && (
              <pre className="mt-1 whitespace-pre-wrap text-xs">{output.traceback.join('\n')}</pre>
            )}
          </div>
        );
      }
      
      // Fallback for unknown output types
      return (
        <div key={index} className="text-gray-400 italic text-sm">
          [Unsupported output type: {output.output_type}]
        </div>
      );
    };
  
    // Simple markdown to HTML conversion (ideally you would use a library like marked.js)
    const convertMarkdown = (markdown) => {
      // This is a very basic implementation, consider using a proper markdown library
      if (Array.isArray(markdown)) {
        markdown = markdown.join('');
      }
      
      // Handle headers
      markdown = markdown.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-purple-300 my-3">$1</h3>');
      markdown = markdown.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-purple-200 my-4">$1</h2>');
      markdown = markdown.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-purple-100 my-5">$1</h1>');
      
      // Handle code blocks
      markdown = markdown.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-2 rounded-lg my-3 overflow-x-auto">$1</pre>');
      
      // Handle inline code
      markdown = markdown.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 rounded text-purple-300">$1</code>');
      
      // Handle paragraphs - split by double newlines and wrap in p tags
      const paragraphs = markdown.split(/\n\n+/);
      markdown = paragraphs.map(p => {
        if (p.startsWith('<h') || p.startsWith('<pre')) {
          return p;
        }
        return `<p class="my-2">${p}</p>`;
      }).join('');
      
      return markdown;
    };
  
    return (
      <div className="notebook-viewer w-full">
        <div className="controls mb-4 flex flex-wrap justify-between items-center bg-[#1a1a2e] p-3 rounded-t-xl border border-purple-500/10">
          <div className="flex items-center">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-3 py-1 text-sm rounded-md flex items-center mr-2 ${
                showCode 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/50'
              }`}
            >
              {showCode ? 'Hide Code Cells' : 'Show All Cells'}
            </button>
          </div>
          <a 
            href={notebookUrl} 
            download
            className="px-3 py-1 text-sm bg-purple-600/50 hover:bg-purple-600 text-white rounded-md flex items-center transition-colors"
          >
            <FaDownload className="mr-1" /> Download Raw
          </a>
        </div>
        
        <div 
          className="bg-[#1a1a2e]/80 backdrop-blur-md rounded-b-xl border border-purple-500/10 w-full"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4c1d95 #1a1a2e' }}
        >
          <div className="notebook-contents p-4">
            {/* Notebook metadata */}
            {notebookData.metadata && notebookData.metadata.kernelspec && (
              <div className="text-sm text-gray-400 mb-4">
                <span className="font-bold">Kernel:</span> {notebookData.metadata.kernelspec.display_name || notebookData.metadata.kernelspec.name}
                {notebookData.metadata.language_info && (
                  <span className="ml-2">({notebookData.metadata.language_info.name})</span>
                )}
              </div>
            )}
            
            {/* Render all cells */}
            {notebookData.cells.map((cell, index) => renderCell(cell, index))}
          </div>
        </div>
      </div>
    );
};
  



// Sample data for individual stories - kept from original code
const dataStoriesDetails = {
  'covid-data-analysis': {
    title: 'COVID-19 Data Analysis',
    description: 'Exploring global COVID-19 data to uncover patterns in transmission rates and vaccination effectiveness across different regions.',
    coverImage: '/assets/datastories_assets/images/earth.jpg',
    date: 'March 10, 2024',
    readTime: '12 min read',
    tags: ['Data Analysis', 'Visualization', 'Pandas', 'Time Series'],
    summary: 'This analysis explores how different policies affected COVID-19 transmission rates globally. By analyzing data from 2020-2023, I discovered fascinating correlations between policy implementation timing and outcome effectiveness.',
    notebookUrl: '/assets/datastories_assets/notebooks/storytime.ipynb',
    featured: true,
    sections: [
        {
            title: 'Introduction',
            content: 'The COVID-19 pandemic presented an unprecedented global challenge with varying responses and outcomes across different regions. This data story aims to examine how timing and strictness of lockdown measures correlated with case trajectories and mortality rates. By analyzing public health data from multiple countries, I sought to identify patterns that could inform future pandemic responses.',
            visualizations: [
              {
                id: 'global-cases-chart',
                title: 'Global COVID-19 Cases Timeline',
                description: 'Visualization of global case counts from January 2020 through December 2023',
                imageUrl: '/assets/images/datastories/covid-cases-timeline.jpg'
              }
            ]
          },
          {
            title: 'Data Collection & Methodology',
            content: 'For this analysis, I collected data from the Johns Hopkins COVID-19 data repository, Our World in Data, and the Oxford COVID-19 Government Response Tracker. The dataset includes daily case counts, deaths, testing rates, vaccination rates, and a stringency index measuring the strictness of government responses. Data preprocessing involved handling missing values, normalizing population-dependent metrics, and aligning time-series data across different sources.',
            codeSnippet: `
    # Load and preprocess the COVID-19 dataset
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns
    
    # Load datasets
    jhu_data = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    owid_data = pd.read_csv('https://covid.ourworldindata.org/data/owid-covid-data.csv')
    oxford_data = pd.read_csv('https://raw.githubusercontent.com/OxCGRT/covid-policy-tracker/master/data/OxCGRT_latest.csv')
    
    # Data preprocessing
    # Convert JHU data from wide to long format
    jhu_long = pd.melt(
        jhu_data, 
        id_vars=['Province/State', 'Country/Region', 'Lat', 'Long'],
        var_name='date', 
        value_name='confirmed'
    )
    jhu_long['date'] = pd.to_datetime(jhu_long['date'])
    
    # Merge datasets
    merged_data = pd.merge(
        jhu_long, 
        owid_data[['location', 'date', 'total_deaths', 'total_tests', 'people_vaccinated']], 
        left_on=['Country/Region', 'date'],
        right_on=['location', 'date'],
        how='left'
    )
    
    # Merge stringency index
    merged_data = pd.merge(
        merged_data,
        oxford_data[['CountryName', 'Date', 'StringencyIndex']],
        left_on=['Country/Region', jhu_long['date'].dt.strftime('%Y%m%d')],
        right_on=['CountryName', 'Date'],
        how='left'
    )
    `
          },
          {
            title: 'Key Findings',
            content: 'The analysis revealed several interesting patterns:\n\n1. **Early Intervention Impact**: Countries that implemented strict measures within 2 weeks of their first 100 cases experienced 34% lower peak case rates on average.\n\n2. **Vaccination Correlation**: For every 10% increase in vaccination rate, there was an average 12% decrease in mortality from the Delta variant.\n\n3. **Regional Differences**: East Asian countries maintained lower case rates despite varying stringency levels, suggesting cultural factors beyond government policy played important roles.\n\n4. **Wave Pattern Consistency**: Regardless of geography or policy, most countries experienced similar wave patterns, though with different magnitudes and timing.',
            visualizations: [
              {
                id: 'stringency-impact',
                title: 'Stringency Index vs. Case Growth Rate',
                description: 'Scatterplot showing the relationship between policy stringency and subsequent case growth',
                imageUrl: '/assets/images/datastories/stringency-impact.jpg'
              },
              {
                id: 'vaccination-mortality',
                title: 'Vaccination Rate vs. Mortality',
                description: 'Analysis of how increasing vaccination rates affected COVID-19 mortality across different countries',
                imageUrl: '/assets/images/datastories/vaccination-mortality.jpg'
              }
            ]
          },
          {
            title: 'Conclusions & Future Work',
            content: 'The data suggests that while timing of interventions played a crucial role in determining pandemic outcomes, cultural factors and healthcare system capacity were equally important determinants. Future pandemic response planning should account for these multiple factors rather than focusing solely on lockdown timing or stringency.\n\nFor future work, I plan to incorporate mobility data to better understand the relationship between policy stringency and actual behavioral changes. Additionally, economic impact data would provide a more comprehensive view of the tradeoffs involved in different pandemic response strategies.',
        }
    ]
  },
  'weather-patterns': {
    title: 'Climate Change Patterns',
    description: 'Analysis of 100 years of weather data to identify climate change patterns and predict future trends.',
    coverImage: '/assets/datastories_assets/images/analysis1.jpg',
    date: 'January 15, 2024',
    readTime: '15 min read',
    tags: ['Climate Data', 'Time Series', 'Forecasting', 'Matplotlib'],
    summary: 'By analyzing historical weather data spanning the last century, this project aims to visualize climate change patterns and develop predictive models for future climate scenarios.',
    notebookUrl: '/assets/datastories_assets/notebooks/storytime.ipynb',
    featured: false,
    sections: [
      // Sections remain the same as in your original code
    ]
  },
  // Other stories remain the same
};




const DataStoryDetailPage = () => {
  const { storyId } = useParams();
  const [activeTab, setActiveTab] = useState('story'); // 'story' or 'notebook'
  const [story, setStory] = useState(null);
  const [randomFeaturedStories, setRandomFeaturedStories] = useState([]);
  
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
                  <p className="text-gray-300 text-sm md:text-base italic">"{story.summary}"</p>
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
              
              {/* Key code snippets section - maintained from your original code */}
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