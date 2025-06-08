// This file should be named BlogPreview.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from '../components/BlogCard'; 

// This BlogBanner component is fine as is.
const BlogBanner = () => {
  const tickerText = "BLOG POSTS AND ARTICLES • ";
  return (
    <div>
      <div className="bg-black text-white py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{tickerText.repeat(10)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{tickerText.repeat(10)}</span>
        </div>
      </div>
    </div>
  );
};

// The component name is kept as you provided.
const BlogPreview = () => { 
  // State is unchanged
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blog/metadata.json');
        const postsData = await response.json();
        
        // --- THIS IS THE ONLY LOGICAL CHANGE ---
        // 1. Filter the data for posts that have "preview: true"
        const previewPosts = postsData.filter(post => post.preview === true);

        // 2. Sort only the filtered preview posts by date
        const sortedPosts = previewPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 3. Set the filtered and sorted list to the state
        setPosts(sortedPosts);

      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // The rest of the component is IDENTICAL to what you provided.
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans">
      <BlogBanner />

      <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Writing about ML/DL, AI, my learning journey and anything that interests me.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* This mapping logic now works on the filtered "preview" posts */}
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              tags={post.tags}
              className={index === 0 ? 'lg:col-span-2' : ''}
              layout={index === 0 ? 'horizontal' : 'vertical'}
            />
          ))}

          {/* This unique card remains exactly where it was */}
          <Link
            to="/blog"
            className="group block bg-yellow-400 border-2 border-black 
                       shadow-[8px_8px_0px_#000] hover:shadow-none 
                       hover:translate-x-2 hover:translate-y-2 
                       transition-all duration-200 ease-in-out
                       flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="text-black">
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-4">
                Explore More Articles
              </h3>
              <p className="text-gray-800 mb-6">
                Visit the main blog page to see the full collection of posts.
              </p>
              <div className="inline-flex items-center gap-2 font-bold text-lg">
                Go to Blog
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={24} />
              </div>
            </div>
          </Link>
          
          {posts.length === 0 && !isLoading && (
            <div className="text-center py-16 lg:col-span-2">
              <h3 className="text-xl text-gray-700 mb-2">No posts found</h3>
              <p className="text-gray-500">
                Check back later for new content!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;