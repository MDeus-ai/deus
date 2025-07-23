import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from './BlogCard';

const BlogBanner = () => {
  const tickerText = "BLOG POSTS AND ARTICLES • ";
  return (
    <div>
      <div className="bg-black dark:bg-accent text-white dark:text-accent-text py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{tickerText.repeat(10)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{tickerText.repeat(10)}</span>
        </div>
      </div>
    </div>
  );
};

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blog/metadata.json');
        const postsData = await response.json();

        const previewPosts = postsData.filter(post => post.preview === true);
        const sortedPosts = previewPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-border"></div>
      </div>
    );
  }

  return (
    <div className="bg-background font-sans">
      <BlogBanner />
      <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 text-text-primary">
            Blog Posts
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Writing about ML/DL, AI, my learning journey and anything that interests me.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <Link
            to="/blog"
            className={`group block bg-accent border-2 border-border text-accent-text
                       transition-all duration-200 ease-in-out 
                       hover:shadow-none hover:translate-x-2 hover:translate-y-2 
                       active:translate-x-0 active:translate-y-0
                       flex flex-col items-center justify-center p-8 text-center
                       shadow-[8px_8px_0px_theme(colors.shadow)]`}
          >
            <h3 className="text-2xl lg:text-3xl font-extrabold mb-4">
              Explore More Articles
            </h3>
            <p className="text-accent-text/80 mb-6">
              Visit the main blog page to see the full collection of posts.
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-lg">
              Go to Blog
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={24} />
            </div>
          </Link>

          {posts.length === 0 && !isLoading && (
            <div className="text-center py-16 lg:col-span-2">
              <h3 className="text-xl text-text-secondary/90 mb-2">No posts found</h3>
              <p className="text-text-secondary/70">
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