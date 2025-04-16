import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaCode, FaDownload, FaChartBar, FaLightbulb, FaBookmark, } from 'react-icons/fa';

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

// Sample data for individual stories
const dataStoriesDetails = {
  'covid-data-analysis': {
    title: 'COVID-19 Data Analysis',
    description: 'Exploring global COVID-19 data to uncover patterns in transmission rates and vaccination effectiveness across different regions.',
    coverImage: '/assets/images/datastories/covid-analysis.jpg',
    date: 'March 10, 2024',
    author: 'Deus M.L',
    readTime: '12 min read',
    tags: ['Data Analysis', 'Visualization', 'Pandas', 'Time Series'],
    summary: 'This analysis explores how different policies affected COVID-19 transmission rates globally. By analyzing data from 2020-2023, I discovered fascinating correlations between policy implementation timing and outcome effectiveness.',
    notebookUrl: '/notebooks/covid-analysis.ipynb',
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
    coverImage: '/assets/images/datastories/climate-patterns.jpg',
    date: 'January 15, 2024',
    author: 'Deus M.L',
    readTime: '15 min read',
    tags: ['Climate Data', 'Time Series', 'Forecasting', 'Matplotlib'],
    summary: 'By analyzing historical weather data spanning the last century, this project aims to visualize climate change patterns and develop predictive models for future climate scenarios.',
    notebookUrl: '/notebooks/climate-analysis.ipynb',
    featured: false,
    sections: [
      {
        title: 'Introduction',
        content: 'This data story examines a century of global temperature data to identify patterns of climate change. By analyzing historical records and applying time series forecasting techniques, I explore how temperatures have changed over time and what future trends might look like.',
        visualizations: [
          {
            id: 'global-temp-trend',
            title: 'Global Temperature Anomalies (1920-2023)',
            description: 'Visualization of global temperature deviations from the 20th century average',
            imageUrl: '/assets/images/datastories/global-temp-trend.jpg'
          }
        ]
      },
      {
        title: 'Data Collection & Methodology',
        content: 'For this analysis, I used the NOAA Global Surface Temperature dataset, which provides monthly temperature anomalies relative to the 20th century average. The dataset includes land and ocean temperature records from 1880 to present. I also incorporated atmospheric CO2 concentration data from the Mauna Loa Observatory to examine correlations between temperature changes and greenhouse gas levels.',
        codeSnippet: `
# Load and prepare climate data
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.arima.model import ARIMA

# Load temperature anomaly data
temp_data = pd.read_csv('GlobalTemperatures.csv', parse_dates=['dt'])
temp_data.set_index('dt', inplace=True)

# Load CO2 concentration data
co2_data = pd.read_csv('co2_mm_mlo.csv', skiprows=72, names=['year', 'month', 'date', 'co2', 'seasonally_adjusted', 'fit', 'seasonally_adjusted_fit', 'co2_filled'])
co2_data['date'] = pd.to_datetime(co2_data[['year', 'month']].assign(day=15))
co2_data.set_index('date', inplace=True)

# Resample to annual averages
annual_temp = temp_data['LandAndOceanAverageTemperature'].resample('A').mean()
annual_co2 = co2_data['co2'].resample('A').mean()

# Merge datasets for the overlapping period
climate_df = pd.DataFrame({
    'temperature': annual_temp,
    'co2': annual_co2
}).dropna()

# Perform time series decomposition
result = seasonal_decompose(temp_data['LandAndOceanAverageTemperature'].dropna(), model='additive', period=12)
`
      },
      // Additional sections would be defined similarly
    ]
  },
  // Other story details would be defined similarly
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
                {randomFeaturedStories.map((featuredStory) => (
                  <Link 
                    to={`/datastory/${featuredStory.id}`} 
                    key={featuredStory.id}
                    className="bg-[#1a1a2e]/60 rounded-lg overflow-hidden border border-purple-500/10 transition-all duration-300 hover:border-purple-500/30 hover:translate-y-[-4px]"
                  >
                    <div className="h-40 bg-[#1a1a2e] overflow-hidden relative">
                      <img 
                        src={featuredStory.coverImage} 
                        alt={featuredStory.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentNode.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center">
                              <span class="text-4xl text-purple-400 mb-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg></span>
                              <p class="text-center px-4">${featuredStory.title}</p>
                            </div>
                          `;
                        }}
                      />
                      {featuredStory.featured && (
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-2 py-1">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white mb-2">{featuredStory.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{featuredStory.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" /> {featuredStory.date}
                        </span>
                        <span>{featuredStory.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
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
      {/* Hero Section */}
      <header className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] min-h-[250px] md:min-h-[400px] overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[#1a1a2e] flex items-center justify-center">
            <img 
              src={story.coverImage} 
              alt={story.title} 
              className="w-full h-full object-cover"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3c] via-[#1a1b3c]/90 to-transparent"></div>
        </div>
        
        {/* Header Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-8 md:pb-16">
          <Link to="/datastory" className="inline-flex items-center text-white opacity-80 hover:opacity-100 mb-4 md:mb-6 transition-opacity duration-300">
            <FaArrowLeft className="mr-2" /> Back to Data Stories
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-white">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 md:gap-4 items-center text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1 md:mr-2 text-purple-400" />
              <span>{story.date}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div>{story.readTime}</div>
            <div className="hidden md:block">•</div>
            <div>By {story.author}</div>
          </div>
          
          <div className="flex flex-wrap gap-1 md:gap-2 mb-6">
            {story.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 md:px-3 py-1 text-2xs md:text-xs font-medium bg-purple-600/30 text-purple-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-base md:text-xl text-gray-300 max-w-4xl">{story.description}</p>
        </div>
      </header>

      {/* Main Content with Tab Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Tab Navigation */}
        <div className="flex border-b border-purple-500/20 mb-8 md:mb-12 overflow-x-auto">
          <button
            className={`py-3 md:py-4 px-4 md:px-6 font-medium flex items-center transition-all duration-300 whitespace-nowrap ${
              activeTab === 'story' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('story')}
          >
            <FaBookmark className="mr-1 md:mr-2" /> Story & Insights
          </button>
          <button
            className={`py-3 md:py-4 px-4 md:px-6 font-medium flex items-center transition-all duration-300 whitespace-nowrap ${
              activeTab === 'notebook' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('notebook')}
          >
            <FaCode className="mr-1 md:mr-2" /> Notebook & Code
          </button>
        </div>
        
        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'story' ? (
            // Story View - Summary and insights
            <div>
              {/* Summary Section */}
              <FadeInSection className="mb-8 md:mb-16">
                <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-4 md:p-8 border border-purple-500/10">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="p-2 md:p-3 bg-purple-500/20 rounded-full">
                      <FaLightbulb className="text-xl md:text-2xl text-purple-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Key Insights</h2>
                  </div>
                  <p className="text-gray-300 text-base md:text-lg italic">"{story.summary}"</p>
                </div>
              </FadeInSection>
              
              {/* Content Sections */}
              {story.sections.map((section, idx) => (
                <FadeInSection key={idx} delay={idx * 100} className="mb-8 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[rgba(252,225,192,0.95)]">{section.title}</h2>
                  <div className="prose prose-base md:prose-lg prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-gray-300 text-sm md:text-base">{paragraph}</p>
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
            // Notebook View - Full code and outputs
            <div>
              <FadeInSection className="mb-8 md:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[rgba(252,225,192,0.95)]">Interactive Notebook</h2>
                  <a 
                    href={story.notebookUrl} 
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 text-sm md:text-base"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaDownload className="mr-2" /> Download Notebook
                  </a>
                </div>
                <p className="text-gray-300 mt-4 text-sm md:text-base">
                  This is the complete Jupyter notebook containing all the code, analysis, and visualizations for this data story.
                  You can run this notebook yourself to explore the data and replicate the findings.
                </p>
              </FadeInSection>
              
              {/* Notebook iframe or component would go here in a real application */}
              <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-purple-500/10 mb-12">
                <div className="flex items-center justify-center h-96">
                  <div className="text-center text-gray-400">
                    <FaChartBar className="text-6xl mx-auto mb-4 text-purple-500/50" />
                    <p>Notebook viewer would be embedded here.</p>
                    <p className="mt-2">In a production environment, this would show the actual Jupyter notebook.</p>
                  </div>
                </div>
              </div>
              
              {/* Code snippets sections */}
              <div className="space-y-12">
                {story.sections.filter(section => section.codeSnippet).map((section, idx) => (
                  <FadeInSection key={idx} className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">{section.title} - Code</h3>
                    <CodeBlock code={section.codeSnippet} />
                  </FadeInSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataStoryDetailPage;