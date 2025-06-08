// src/pages/BlogPage.js

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Most recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = 'Blog | Muhumuza Deus';
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blog/metadata.json');
        const postsData = await response.json();
        setAllPosts(postsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) { console.error('Error fetching blog posts:', error); }
      finally { setIsLoading(false); }
    };
    fetchPosts();
    return () => { document.title = 'Muhumuza Deus'; };
  }, []);

  const allTags = useMemo(() => ['Most recent', 'Announcements', 'Engineering', 'Research', 'Tutorials', 'Community', 'TFHE-rs', 'Concrete', 'Concrete ML', 'FhEVM'], []);
  const featuredPosts = useMemo(() => allPosts.filter(p => p.featured === true), [allPosts]);
  
  const filteredPosts = useMemo(() => {
    let posts = [...allPosts];
    if (activeCategory !== 'Most recent') {
      posts = posts.filter(post => post.tags?.includes(activeCategory));
    }
    if (searchTerm) {
      posts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return posts;
  }, [allPosts, activeCategory, searchTerm]);

  useEffect(() => setVisibleCount(POSTS_PER_PAGE), [activeCategory, searchTerm]);

  const heroPost = useMemo(() => {
    return allPosts.find(post => post.isHero === true) || allPosts[0];
  }, [allPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const recentPostsToDisplay = filteredPosts.slice(0, visibleCount);

  return (
    <div className="bg-white text-black font-sans">
      
      {/* --- HERO SECTION --- */}
      {heroPost && (
        <section className="bg-yellow-400 border-b-4 border-black">
          {/* FIX 2: Added more top padding for mobile, adjusted all paddings */}
          <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28 lg:pb-20 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* IMAGE SIDE - Styled with BlogCard effects */}
            <div className="hidden lg:block">
              {heroPost.coverImage && (
                <Link
                  to={`/blog/${heroPost.slug}`}
                  className="group block bg-gray-50 border-2 border-black
                             transition-all duration-300 ease-in-out
                             hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={heroPost.coverImage}
                      alt={`Cover for ${heroPost.title}`}
                      className="w-full h-full max-h-[400px] object-cover"
                    />
                  </div>
                </Link>
              )}
            </div>
            
            {/* TEXT SIDE - Original layout preserved */}
            <div>
              <p className="text-sm font-bold mb-2">
                {new Date(heroPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} – {heroPost.author}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">{heroPost.title}</h1>
              <p className="text-lg text-black/80 mb-8 max-w-lg">{heroPost.excerpt}</p>
              <Link to={`/blog/${heroPost.slug}`} className="inline-block bg-white text-black px-6 py-3 border-2 border-black font-bold shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200">
                Read More
              </Link>
            </div>
          </div>
          
          <div className="text-center pb-12">
            <a href="#main-content" className="inline-flex flex-col items-center font-bold text-sm group">
              Read more blog posts
              <ChevronDown className="mt-1 animate-bounce group-hover:animate-none" size={24} />
            </a>
          </div>
        </section>
      )}

      <main id="main-content" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          
          {/* --- FEATURED BLOG POSTS SECTION --- */}
          {featuredPosts.length > 0 && (
            <div className="mb-20">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left">Featured Blog Posts</h2>
              <div className="w-full min-h-[200px] overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeFeaturedIndex * 100}%)` }}
                >
                  {featuredPosts.map((post) => (
                    <div key={post.slug} className="w-full flex-shrink-0">
                      <BlogCard
                        {...post}
                        layout="horizontal"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {featuredPosts.length > 1 && (
                <div className="flex justify-center space-x-3 mt-8">
                  {featuredPosts.map((_, index) => (
                    // FIX 3: Changed indicator from circle to larger rectangle
                    <button
                      key={index}
                      onClick={() => setActiveFeaturedIndex(index)}
                      aria-label={`Go to featured post ${index + 1}`}
                      className={`w-8 h-2 transition-all duration-300 ease-in-out ${
                        activeFeaturedIndex === index 
                          ? 'bg-black' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- BROWSE & SEARCH SECTION --- */}
          <div className="mb-20">
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left">Browse By Topics</h2>
              <div className="flex flex-wrap justify-start gap-4">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveCategory(tag)}
                    // FIX 1: Added active: state for a click effect
                    className={`px-5 py-2 border-2 border-black font-bold text-sm shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 active:shadow-none active:translate-x-0 active:translate-y-0 ${
                      activeCategory === tag ? 'bg-yellow-400' : 'bg-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 p-8">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="SEARCH FOR CONTENT"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-black py-3 pl-2 pr-10 text-black placeholder:text-gray-500 placeholder:font-bold placeholder:tracking-widest focus:outline-none focus:border-yellow-400"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-black" size={24} />
              </div>
            </div>
          </div>
          
          {/* --- MOST RECENT POSTS SECTION --- */}
          <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left">Most Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {recentPostsToDisplay.map(post => <BlogCard key={post.slug} {...post} layout="vertical" />)}
          </div>

          {/* --- EMPTY STATE & LOAD MORE --- */}
          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16 col-span-full">
              <h3 className="text-xl text-gray-700">No posts found.</h3>
              <p className="text-gray-500">Try adjusting your search or filter.</p>
            </div>
          )}
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-20">
              <button onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)} className="bg-white text-black px-8 py-3 border-2 border-black font-bold shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200">
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;