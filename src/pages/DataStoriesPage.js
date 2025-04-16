import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

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

// Sample datastories data
const dataStories = [
  {
    id: 'covid-data-analysis',
    title: 'COVID-19 Data Analysis',
    description: 'Exploring global COVID-19 data to uncover patterns in transmission rates and vaccination effectiveness across different regions.',
    coverImage: '/assets/images/datastories/covid-analysis.jpg',
    date: 'March 2024',
    tags: ['Data Analysis', 'Visualization', 'Pandas', 'Time Series'],
    summary: 'This analysis explores how different policies affected COVID-19 transmission rates globally. By analyzing data from 2020-2023, I discovered fascinating correlations between policy implementation timing and outcome effectiveness.',
    notebookUrl: '/notebooks/covid-analysis.ipynb',
    featured: true,
  },
  {
    id: 'weather-patterns',
    title: 'Climate Change Patterns',
    description: 'Analysis of 100 years of weather data to identify climate change patterns and predict future trends.',
    coverImage: '/assets/images/datastories/climate-patterns.jpg',
    date: 'January 2024',
    tags: ['Climate Data', 'Time Series', 'Forecasting', 'Matplotlib'],
    summary: 'By analyzing historical weather data spanning the last century, this project aims to visualize climate change patterns and develop predictive models for future climate scenarios.',
    notebookUrl: '/notebooks/climate-analysis.ipynb',
    featured: false,
  },
  {
    id: 'netflix-viewing-habits',
    title: 'Netflix Viewing Habits',
    description: 'Analyzing viewing patterns across different demographics to uncover interesting trends in content consumption.',
    coverImage: '/assets/images/datastories/netflix-viewing.jpg',
    date: 'February 2024',
    tags: ['Entertainment', 'User Behavior', 'Demographics', 'Visualization'],
    summary: 'This study dives into viewing habits across different age groups and regions, revealing surprising patterns in content preferences and binge-watching behaviors.',
    notebookUrl: '/notebooks/netflix-analysis.ipynb',
    featured: true,
  },
  {
    id: 'housing-market-analysis',
    title: 'Housing Market Trends',
    description: 'Examining housing market data from the past decade to identify economic influences and predict future market movements.',
    coverImage: '/assets/images/datastories/housing-market.jpg',
    date: 'December 2023',
    tags: ['Economics', 'Market Analysis', 'Prediction', 'Regression'],
    summary: 'This analysis explores key factors affecting housing prices across different markets, identifying economic indicators that predict market shifts with surprising accuracy.',
    notebookUrl: '/notebooks/housing-analysis.ipynb',
    featured: false,
  },
];

// Component for story cards
const StoryCard = ({ story, index }) => {
  return (
    <FadeInSection delay={index * 200} className="mb-12">
      {(isVisible) => (
        <Link to={`/datastory/${story.id}`} className="block">
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/10 transition-all duration-500 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 group">
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img 
                src={story.coverImage} 
                alt={story.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/placeholder-data-story.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {story.date}
                </span>
                {story.featured && (
                  <span className="ml-2 bg-amber-500/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300 mb-3">
                {story.title}
              </h3>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {story.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-2">
                <span className="inline-block text-purple-400 group-hover:text-purple-300 font-medium transition-colors duration-300 group-hover:translate-x-1">
                  Read Story →
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </FadeInSection>
  );
};

// Component for featured story (larger display)
const FeaturedStory = ({ story }) => {
  return (
    <FadeInSection className="mb-16">
      {(isVisible) => (
        <Link to={`/datastory/${story.id}`} className="block">
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/20 transition-all duration-500 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/30 group">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={story.coverImage} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/placeholder-featured-story.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent"></div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="mb-4 flex gap-2">
                  <span className="bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {story.date}
                  </span>
                  <span className="bg-amber-500/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[rgba(252,225,192,0.95)] transition-colors duration-300 mb-4">
                  {story.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {story.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {story.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 mb-6 italic hidden sm:block">
                  "{story.summary}"
                </p>
                
                <div className="pt-2">
                  <span className="inline-block text-purple-400 group-hover:text-purple-300 font-medium transition-colors duration-300 group-hover:translate-x-1">
                    Read Full Story →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </FadeInSection>
  );
};

const DataStoriesPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get featured stories and shuffle them
  const featuredStories = dataStories.filter(story => story.featured);
  
  // Fisher-Yates shuffle algorithm for random order
  const shuffleFeaturedStories = () => {
    const shuffled = [...featuredStories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Get one random featured story
  const randomFeaturedStory = shuffleFeaturedStories()[0];
  
  // Filter stories based on current filter and search term
  const filteredStories = dataStories.filter(story => {
    const matchesFilter = filter === 'all' || 
                          (filter === 'featured' && story.featured);
    
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#1a1b3c] text-white min-h-screen" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Header Section */}
      <header className="pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151530] to-[#1a1b3c] -z-10"></div>
        <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(circle,rgba(120,50,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            {(isVisible) => (
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[rgba(252,225,192,0.95)]" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {isVisible ? (
                    <ReactTypingEffect 
                      text={["Data Stories"]}
                      typingDelay={200}
                      speed={30} 
                      eraseDelay={10000000}
                    />
                  ) : (
                    <span>Data Stories</span>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10">
                  Uncovering interesting patterns and insights through data analysis and visualization. 
                  Each story presents a unique perspective on data-driven discoveries.
                </p>
                
                {/* Search and filter controls */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                  <div className="relative w-full md:w-2/3">
                    <input
                      type="text"
                      placeholder="Search stories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#1a1a2e]/60 backdrop-blur-md border border-purple-500/20 rounded-full py-3 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-center">
                    <button 
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        filter === 'all' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-[#1a1a2e]/60 text-gray-300 hover:bg-purple-600/20'
                      }`}
                    >
                      All Stories
                    </button>
                    <button 
                      onClick={() => setFilter('featured')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        filter === 'featured' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-[#1a1a2e]/60 text-gray-300 hover:bg-amber-500/20'
                      }`}
                    >
                      Featured
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Featured Stories Section - Only show if filter is 'all' */}
        {filter === 'all' && featuredStories.length > 0 && (
          <section className="mb-12 md:mb-20">
            <FadeInSection>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-[rgba(252,225,192,0.95)] text-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
                Featured Stories
              </h2>
            </FadeInSection>
            
            {/* Display one random featured story */}
            {randomFeaturedStory && <FeaturedStory story={randomFeaturedStory} />}
          </section>
        )}
        
        {/* All Stories Grid */}
        <section>
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-[rgba(252,225,192,0.95)] text-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
              {filter === 'all' ? "All Stories" : "Featured Stories"}
            </h2>
          </FadeInSection>
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <p className="text-xl text-gray-400">No stories match your search criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setFilter('all');}}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DataStoriesPage;