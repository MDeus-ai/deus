import React, { useEffect, useRef, useState } from 'react';
import { FaExpand, FaExternalLinkAlt, FaEye, FaThumbsUp, FaCalendarAlt, FaComment } from 'react-icons/fa';
import { format } from 'date-fns';

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
  <div className="flex border-b border-gray-700 mb-6">
    {React.Children.map(children, child =>
      React.cloneElement(child, { isActive: activeTab === child.props.value, onClick: () => setActiveTab(child.props.value) })
    )}
  </div>
);

const Tab = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-lg transition-colors duration-200 ${
      isActive 
        ? 'text-red-500 border-b-2 border-red-500' 
        : 'text-gray-400 hover:text-gray-200'
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

const YOUTUBE_API_KEY = 'AIzaSyD8_m-CihJd7Cm9SHCpU2Q0_lb2sqwKSJ8';
const CHANNEL_ID = 'UCzQjI4peun1w4lFaEviR9Dw';

const YouTubePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const videoRefs = useRef({});

  // Modified Intersection Observer setup
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

    // Use videoRefs object instead of array
    Object.values(videoRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
        // Set initial visibility
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
    return videos
  }, [videos]);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
  };

  const VideoCard = ({ video, index }) => (
    <div
      ref={el => videoRefs.current[video.id] = el}
      className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 group transition-all duration-300"
    >
      <div className="relative aspect-video w-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm">
          {formatDuration(video.duration)}
        </div>
        <button 
          onClick={() => setExpandedVideo(video)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300"
        >
          <FaExpand className="text-white text-3xl opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
            {video.title}
          </h3>
          <div className="flex flex-col items-end text-sm text-gray-400">
            <span>{parseInt(video.views).toLocaleString()} views</span>
            <span>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        <p className="text-gray-300 line-clamp-3">
          {video.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {video.tags.slice(0, 3).map((tag, index) => (
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
      </div>
    </div>
  );

  const VideoModal = ({ video, onClose }) => (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-6xl bg-gray-900 rounded-xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="p-6">
          <TabGroup defaultTab="overview">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="stats">Statistics</Tab>
              <Tab value="engagement">Engagement</Tab>
            </TabList>
            
            <TabPanel value="overview">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                  <a
                    href={`https://youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                  >
                    <span>Watch on YouTube</span>
                    <FaExternalLinkAlt />
                  </a>
                </div>
                <p className="text-gray-300">{video.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaEye className="text-2xl text-red-400" />
                    <h3 className="text-xl font-semibold">Views</h3>
                  </div>
                  <p className="text-3xl font-bold">{parseInt(video.views).toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaThumbsUp className="text-2xl text-red-400" />
                    <h3 className="text-xl font-semibold">Likes</h3>
                  </div>
                  <p className="text-3xl font-bold">{parseInt(video.likes).toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCalendarAlt className="text-2xl text-red-400" />
                    <h3 className="text-xl font-semibold">Published</h3>
                  </div>
                  <p className="text-3xl font-bold">{format(new Date(video.publishedAt), 'MMM d, yyyy')}</p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FaComment className="text-2xl text-red-400" />
                    <h3 className="text-xl font-semibold">Duration</h3>
                  </div>
                  <p className="text-3xl font-bold">{formatDuration(video.duration)}</p>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value="engagement">
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Engagement Rate</h3>
                  <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-red-500 rounded-full"
                      style={{ width: `${(parseInt(video.likes) / parseInt(video.views) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    {((parseInt(video.likes) / parseInt(video.views)) * 100).toFixed(2)}% of viewers liked this video
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Daily Views</h3>
                  <p className="text-3xl font-bold">
                    {Math.round(parseInt(video.views) / Math.max(1, Math.floor((new Date() - new Date(video.publishedAt)) / (1000 * 60 * 60 * 24)))).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">Average views per day since publication</p>
                </div>
              </div>
            </TabPanel>
          </TabGroup>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="relative h-[40vh]">
        <img 
          src="/assets/images/youtube/ytbanner.png" 
          alt="YouTube content header"
          className="w-full h-full object-cover object-center"
        />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAndSortedVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </main>

      {/* Video Modal */}
      {expandedVideo && (
        <VideoModal video={expandedVideo} onClose={() => setExpandedVideo(null)} />
      )}
    </div>
  );
};

export default YouTubePage;