import React, { useState, useEffect } from 'react';
import { FaTimes, FaExpand, FaMoon, FaSun, FaShare, FaCompress } from 'react-icons/fa';
import { SiJupyter } from 'react-icons/si';

const NotebookModal = ({ notebook, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('100%');

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Auto-hide toolbar
  useEffect(() => {
    let timeout;
    if (showToolbar && !isMobile) {
      timeout = setTimeout(() => setShowToolbar(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showToolbar, isMobile]);

  // Calculate and update iframe height
  useEffect(() => {
    const updateIframeHeight = () => {
      const viewportHeight = window.innerHeight;
      const toolbarHeight = 64; // 4rem
      const padding = isFullscreen ? 0 : (isMobile ? 0 : 64); // 4rem padding on desktop
      const availableHeight = viewportHeight - toolbarHeight - (padding * 2);
      setIframeHeight(`${availableHeight}px`);
    };

    updateIframeHeight();
    window.addEventListener('resize', updateIframeHeight);
    return () => window.removeEventListener('resize', updateIframeHeight);
  }, [isFullscreen, isMobile]);

  if (!isOpen) return null;

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Try to adjust iframe content after load
    try {
      const iframe = document.querySelector('.notebook-iframe');
      if (iframe) {
        // Force iframe to recalculate its height
        iframe.style.height = '100%';
        iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
      }
    } catch (e) {
      console.warn('Could not adjust iframe height:', e);
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load the notebook. Please try again later.');
  };

  const handleMouseMove = () => {
    if (!isMobile) {
      setShowToolbar(true);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(notebook.link);
      alert('Notebook link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  const notebookId = notebook.link.split('/').pop().split('?')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`
        fixed transition-all duration-300 
        ${isFullscreen ? 'inset-0' : isMobile ? 'inset-0' : 'inset-8'}
        flex flex-col
      `}>
        {/* Modal Content */}
        <div 
          className={`
            w-full h-full
            ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
            ${isFullscreen ? '' : 'rounded-lg'}
            shadow-xl
            flex flex-col
            overflow-hidden
          `}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setShowToolbar(true)}
        >
          {/* Toolbar */}
          <div className={`
            relative z-10
            transition-opacity duration-300
            ${showToolbar || isMobile ? 'opacity-100' : 'opacity-0'}
            ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}
            backdrop-blur-sm border-b
            ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
            flex-shrink-0
          `}>
            <div className="flex justify-between items-center p-2 md:p-4">
              {/* Left side */}
              <div className="flex items-center gap-2 overflow-hidden">
                <SiJupyter className="text-xl md:text-2xl text-orange-400 flex-shrink-0" />
                <h3 className={`text-base md:text-xl font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {notebook.title}
                </h3>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {isDarkMode ? <FaSun className="text-lg md:text-xl" /> : <FaMoon className="text-lg md:text-xl" />}
                </button>

                <button
                  onClick={handleShare}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <FaShare className="text-lg md:text-xl" />
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {isFullscreen ? (
                    <FaCompress className="text-lg md:text-xl" />
                  ) : (
                    <FaExpand className="text-lg md:text-xl" />
                  )}
                </button>

                <button
                  onClick={onClose}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <FaTimes className="text-lg md:text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-900">
                <div className="text-red-400 text-center max-w-md">
                  <p className="text-xl font-bold mb-2">Error Loading Notebook</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Notebook Iframe */}
            <div className="w-full h-full">
              <iframe
                className="notebook-iframe w-full"
                src={`https://www.kaggle.com/embed/muhumuzadeusai/${notebookId}${isDarkMode ? '?theme=dark' : ''}`}
                style={{
                  height: iframeHeight,
                  display: isLoading ? 'none' : 'block',
                  border: 'none',
                }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={`Kaggle notebook: ${notebook.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                scrolling="yes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookModal;