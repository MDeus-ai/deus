import React, { useEffect, useRef, useState } from 'react';
import { FaExpand, FaExternalLinkAlt, FaEye, FaThumbsUp, FaCalendarAlt, FaComment, FaTimes, FaGithub } from 'react-icons/fa';
import { format } from 'date-fns';

// Constants
const YOUTUBE_API_KEY = 'AIzaSyD8_m-CihJd7Cm9SHCpU2Q0_lb2sqwKSJ8';
const CHANNEL_ID = 'UCzQjI4peun1w4lFaEviR9Dw';

// Utility Functions
const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};

// Custom Tabs Components
const TabGroup = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div className="w-full">
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2 border-b border-neutral-700 mb-6">
    {React.Children.map(children, child =>
      React.cloneElement(child, { isActive: activeTab === child.props.value, onClick: () => setActiveTab(child.props.value) })
    )}
  </div>
);

const Tab = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-base whitespace-nowrap transition-colors duration-200 font-['Roboto_Slab'] ${
      isActive 
        ? 'text-red-500 border-b-2 border-red-500' 
        : 'text-neutral-400 hover:text-neutral-200'
    }`}
  >
    {children}
  </button>
);

const TabPanel = ({ children, value, activeTab }) => (
  <div className={activeTab === value ? 'block' : 'hidden'}>
    {children}
  </div>
);

// Utility Components
const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-neutral-800/50 p-4 rounded-lg" style={{ fontFamily: 'Roboto Slab, serif' }}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="text-xl text-red-400" />
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

const EngagementCard = ({ title, value, description, showProgress }) => (
  <div className="bg-neutral-800/50 p-4 rounded-lg" style={{ fontFamily: 'Roboto Slab, serif' }}>
    <h3 className="text-base font-semibold mb-3">{title}</h3>
    {showProgress && (
      <div className="relative w-full h-3 bg-neutral-700 rounded-full overflow-hidden mb-2">
        <div 
          className="absolute h-full bg-red-500 rounded-full"
          style={{ width: `${Math.min(parseFloat(value), 100)}%` }}
        />
      </div>
    )}
    <p className="text-lg font-bold">{value}{showProgress && '%'}</p>
    <p className="mt-1 text-xs text-neutral-400">{description}</p>
  </div>
);

// Video Modal Component
const VideoModal = ({ video, onClose }) => {
  const modalRef = useRef(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/95 z-50 overflow-y-auto overscroll-none"
      style={{ fontFamily: 'Roboto Slab, serif' }}
    >
      <button
        onClick={onClose}
        className="fixed top-2 right-2 z-50 p-2 bg-neutral-900/80 rounded-full text-white"
        aria-label="Close modal"
      >
        <FaTimes className="text-xl" />
      </button>

      <div className="min-h-screen flex flex-col">
        <div className={`relative w-full ${isPortrait ? 'h-[40vh]' : 'h-screen'}`}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            playsInline
          />
        </div>

        <div className={`flex-1 bg-neutral-900 ${isPortrait ? 'pt-4' : 'pt-0'}`}>
          <div className="px-4 py-2">
            <TabGroup defaultTab="overview">
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="stats">Stats</Tab>
                <Tab value="engagement">Engagement</Tab>
              </TabList>
              
              <TabPanel value="overview">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <h2 className="text-xl font-bold text-white">{video.title}</h2>
                    <a
                      href={`https://youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
                    >
                      <span>Watch on YouTube</span>
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-300">{video.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TabPanel>
              
              <TabPanel value="stats">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard icon={FaEye} title="Views" value={parseInt(video.views).toLocaleString()} />
                  <StatCard icon={FaThumbsUp} title="Likes" value={parseInt(video.likes).toLocaleString()} />
                  <StatCard icon={FaCalendarAlt} title="Published" value={format(new Date(video.publishedAt), 'MMM d, yyyy')} />
                  <StatCard icon={FaComment} title="Duration" value={formatDuration(video.duration)} />
                </div>
              </TabPanel>
              
              <TabPanel value="engagement">
                <div className="space-y-4">
                  <EngagementCard
                    title="Engagement Rate"
                    value={((parseInt(video.likes) / parseInt(video.views)) * 100).toFixed(2)}
                    description="of viewers liked this video"
                    showProgress
                  />
                  <EngagementCard
                    title="Daily Views"
                    value={Math.round(parseInt(video.views) / Math.max(1, Math.floor((new Date() - new Date(video.publishedAt)) / (1000 * 60 * 60 * 24)))).toLocaleString()}
                    description="Average views per day since publication"
                  />
                </div>
              </TabPanel>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video, videoRefs, setExpandedVideo, selectedTag, setSelectedTag }) => (
  <div
    ref={el => videoRefs.current[video.id] = el}
    className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-red-500 transform hover:shadow-xl hover:shadow-red-500/10 group transition-all duration-300"
    style={{ fontFamily: 'Roboto Slab, serif' }}
  >
    <div className="relative aspect-video w-full">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
        {formatDuration(video.duration)}
      </div>
      <button 
        onClick={() => setExpandedVideo(video)}
        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 active:bg-black/60 transition-all duration-300"
        aria-label="Expand video"
      >
        <FaExpand className="text-white text-2xl opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" />
      </button>
    </div>

    <div className="p-3 md:p-4 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex flex-col items-end text-xs text-neutral-400 whitespace-nowrap">
          <span>{parseInt(video.views).toLocaleString()} views</span>
          <span>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
      
      <p className="text-xs text-neutral-400 line-clamp-2">
        {video.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {video.tags.slice(0, 2).map((tag, index) => (
          <button
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={`px-2 py-0.5 text-xs rounded-full border transition-all duration-300 ${
              selectedTag === tag
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Main Component
const YouTubePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const videoRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(videoRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(8px)';
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        
        if (!data.items?.length) {
          throw new Error('No videos found for this channel');
        }

        const videoIds = data.items.map(item => item.id.videoId).join(',');
        
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`
        );
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch video stats');
        }

        const statsData = await statsResponse.json();
        
        const videosWithStats = data.items.map(video => {
          const stats = statsData.items.find(item => item.id === video.id.videoId);
          return {
            id: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails.high.url,
            publishedAt: video.snippet.publishedAt,
            tags: video.snippet.tags || [],
            views: stats?.statistics.viewCount || 0,
            likes: stats?.statistics.likeCount || 0,
            duration: stats?.contentDetails.duration || 'PT0M0S'
          };
        });

        setVideos(videosWithStats);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredAndSortedVideos = React.useMemo(() => {
    return videos.filter(video => 
      selectedTag === 'All' || video.tags.includes(selectedTag)
    );
  }, [videos, selectedTag]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="relative h-[25vh] md:h-[40vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/assets/images/youtube/ytcover.jpg" 
            alt="YouTube content header"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
            YouTube Content
          </h1>
          <div className="flex space-x-3">
            <a 
              href="https://github.com/deus-ml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <FaGithub className="text-lg" />
              GitHub Profile
            </a>
            <a 
              href={`https://youtube.com/channel/${CHANNEL_ID}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <FaExternalLinkAlt className="text-lg" />
              Channel
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8" style={{ fontFamily: 'Roboto Slab, serif' }}>
        {/* Tag Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('All')}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
              selectedTag === 'All'
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
            }`}
          >
            All Videos
          </button>
          {Array.from(new Set(videos.flatMap(video => video.tags))).map((tag, index) => (
            <button
              key={index}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
            <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-base text-neutral-400">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3 text-center">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
              <FaTimes className="text-xl" />
            </div>
            <h2 className="text-lg font-bold text-white">Error Loading Videos</h2>
            <p className="text-neutral-400 max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSortedVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                videoRefs={videoRefs}
                setExpandedVideo={setExpandedVideo}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            ))}
          </div>
        )}
      </main>

      {/* Video Modal */}
      {expandedVideo && (
        <VideoModal 
          video={expandedVideo} 
          onClose={() => setExpandedVideo(null)} 
        />
      )}
    </div>
  );
};

export default YouTubePage;