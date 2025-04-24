import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, Search, ChevronDown } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  useEffect(() => {
    // Set page title when component mounts
    document.title = 'Blog | Muhumuza Deus';

    // Restore original title when component unmounts
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Ensure loading state is true at the start
      try {
        const response = await fetch('/blog/metadata.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const postsData = await response.json();

        const sortedPosts = postsData.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Consider setting an error state here to display to the user
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success/error
      }
    };

    fetchPosts();
  }, []);

  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        {/* Improved loading spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Roboto Slab, serif' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
            Blog
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto px-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
            Machine learning, Deep learning, Artificial Intelligence, My Learning Experiences And Everything Else.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
           {/* --- Search Input (Now always visible on md+) --- */}
           <div className="relative max-w-xl mx-auto">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-5 w-5 text-neutral-500" />
             </div>
             <input
               type="text"
               placeholder="Search posts..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg
                 text-white placeholder-neutral-500 focus:outline-none focus:ring-2
                 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
               style={{ fontFamily: 'Roboto Slab, serif' }}
             />
           </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden relative max-w-xl mx-auto"> {/* Added max-w-xl */}
            <button
              onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
              className="w-full px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg flex items-center justify-between"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <span>{selectedTag || 'Filter by Tag'}</span> {/* Changed default text */}
              <ChevronDown className={`w-4 h-4 transform transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTagDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-neutral-800 rounded-lg shadow-lg max-h-60 overflow-y-auto"> {/* Added max-height and overflow */}
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setIsTagDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-neutral-700 ${!selectedTag ? 'text-pink-500 font-semibold' : 'text-neutral-300'}`} // Highlight active
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  All Posts
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsTagDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-neutral-700 ${
                      selectedTag === tag ? 'text-pink-500 font-semibold' : 'text-neutral-300' // Highlight active
                    }`}
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tags */}
          <div className="hidden md:block">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${!selectedTag ? 'bg-pink-500 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${selectedTag === tag ? 'bg-pink-500 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              // The main container styling remains largely the same
              className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800
                hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col" // Added flex flex-col
            >
              {/* Image container */}
              <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0"> {/* Added flex-shrink-0 */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  // Add onError handler for robustness
                   onError={(e) => {
                     e.target.onerror = null; // Prevent infinite loop if placeholder fails
                     e.target.src = '/assets/placeholder.jpg'; // Path relative to public folder
                   }}
                />
                 {/* Optional: subtle gradient overlay on image if needed for text contrast, but not strictly required by prompt */}
                 {/* <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" /> */}
              </div>

              {/* Content Area - Apply background/blur here */}
              <div className="p-4 sm:p-6 bg-black/40 backdrop-blur-md border-t border-neutral-700/50 flex-grow flex flex-col"> {/* MODIFIED: Added bg, blur, border, flex-grow, flex, flex-col */}

                {/* Tags Section */}
                <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 mb-3"> {/* Added mb-3 */}
                  <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-min">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex-none px-3 py-1 bg-neutral-800/80 text-neutral-300 backdrop-blur-sm  /* Slightly different bg for tags */
                          rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink-400 /* Adjusted hover color slightly */
                  transition-colors duration-300 line-clamp-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-neutral-300 text-sm mb-4 line-clamp-3 flex-grow" style={{ fontFamily: 'Roboto Slab, serif' }}> {/* Increased line-clamp, added flex-grow */}
                  {post.excerpt}
                </p>

                {/* Metadata & Read More */}
                <div className="mt-auto pt-2"> {/* Pushes items below to bottom */}
                    <div className="flex items-center text-xs sm:text-sm text-neutral-400 space-x-4 mb-3" style={{ fontFamily: 'Roboto Slab, serif' }}> {/* Adjusted color, added mb */}
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" /> {/* Slightly more spacing */}
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" /> {/* Slightly more spacing */}
                        {post.readingTime} min read
                      </div>
                    </div>

                    <div className="flex items-center text-pink-500 hover:text-pink-400 text-sm font-medium transition-colors duration-300" style={{ fontFamily: 'Roboto Slab, serif' }}> {/* Added hover effect */}
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !isLoading && ( // Added !isLoading condition
          <div className="text-center py-16 col-span-1 md:col-span-2"> {/* Ensure it spans columns if grid is active */}
            <h3 className="text-xl text-neutral-400 mb-2" style={{ fontFamily: 'Roboto Slab, serif' }}>No posts found</h3>
            <p className="text-neutral-500" style={{ fontFamily: 'Roboto Slab, serif' }}>
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;