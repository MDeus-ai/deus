import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, Search } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Instead of using window.fs, fetch the metadata.json file directly
        const response = await fetch('/blog/metadata.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const postsData = await response.json();
        
        // Sort posts by date (most recent first)
        const sortedPosts = postsData.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        setPosts(sortedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  // Filter posts based on selected tag and search query
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
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto px-4">
            Exploring machine learning, deep learning, and artificial intelligence through detailed tutorials and insights.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
          {/* Mobile Search Toggle */}
          <div className="md:hidden flex justify-center mb-4">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className={`relative max-w-xl mx-auto transition-all duration-300 ${
            isSearchExpanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0 md:scale-100 md:opacity-100'
          }`}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg 
                text-white placeholder-neutral-500 focus:outline-none focus:ring-2 
                focus:ring-pink-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Tags ScrollView for Mobile */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
            <div className="flex flex-nowrap md:flex-wrap gap-2 md:justify-center min-w-min">
              <button
                onClick={() => setSelectedTag(null)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${!selectedTag 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${selectedTag === tag 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
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
              className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 
                hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Post Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
              </div>

              {/* Post Content */}
              <div className="p-4 sm:p-6">
                {/* Tags ScrollView for Mobile */}
                <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
                  <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-min">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex-none px-3 py-1 bg-neutral-800 text-neutral-300 
                          rounded-full text-xs font-medium whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white mt-3 mb-2 group-hover:text-pink-500 
                  transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-xs sm:text-sm text-neutral-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readingTime} min read
                  </div>
                </div>

                <div className="mt-4 flex items-center text-pink-500 text-sm font-medium">
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-neutral-400 mb-2">No posts found</h3>
            <p className="text-neutral-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;