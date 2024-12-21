  const VideoModal = ({ video, onClose }) => {
    const modalRef = useRef(null);
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    return (
      <div 
        ref={modalRef}
        className="fixed inset-0 bg-black/95 z-50 overflow-y-auto overscroll-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-2 right-2 z-50 p-2 bg-gray-900/80 rounded-full text-white"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="min-h-screen flex flex-col">
          {/* Video container with dynamic aspect ratio */}
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

          {/* Content section */}
          <div className={`flex-1 bg-gray-900 ${isPortrait ? 'pt-4' : 'pt-0'}`}>
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
                      <h2 className="text-xl md:text-2xl font-bold text-white">{video.title}</h2>
                      <a
                        href={`https://youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm md:text-base"
                      >
                        <span>Watch on YouTube</span>
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                    <p className="text-sm md:text-base text-gray-300">{video.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
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

  // Reusable stat card component
  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-xl text-red-400" />
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="text-lg md:text-xl font-bold">{value}</p>
    </div>
  );

  // Reusable engagement card component
  const EngagementCard = ({ title, value, description, showProgress }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-base font-semibold mb-3">{title}</h3>
      {showProgress && (
        <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div 
            className="absolute h-full bg-red-500 rounded-full"
            style={{ width: `${Math.min(parseFloat(value), 100)}%` }}
          />
        </div>
      )}
      <p className="text-lg md:text-xl font-bold">{value}{showProgress && '%'}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );