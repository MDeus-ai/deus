import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';

const POSTS_PER_PAGE = 6;
const FEATURED_CAROUSEL_INTERVAL = 5000;

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

  const allTags = useMemo(() => {
    const tagsSet = new Set(allPosts.flatMap(post => post.tags || []));
    const sortedTags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
    return ['Most recent', ...sortedTags];
  }, [allPosts]);

  const featuredPosts = useMemo(() => allPosts.filter(p => p.featured === true), [allPosts]);

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const autoPlay = setInterval(() => {
      setActiveFeaturedIndex(currentIndex => (currentIndex + 1) % featuredPosts.length);
    }, FEATURED_CAROUSEL_INTERVAL);
    return () => clearInterval(autoPlay);
  }, [activeFeaturedIndex, featuredPosts.length]);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-border"></div>
      </div>
    );
  }

  const recentPostsToDisplay = filteredPosts.slice(0, visibleCount);

  return (
    <div className="bg-background text-text-primary font-body">
      {heroPost && (
        <section className="bg-accent text-accent-text border-b-4 border-border">
          <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28 lg:pb-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              {heroPost.coverImage && (
                <Link
                  to={`/blog/${heroPost.slug}`}
                  className="group block bg-surface border-2 border-border transition-all duration-300 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0"
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
            <div>
              <p className="text-sm font-bold mb-2">
                {new Date(heroPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} – {heroPost.author}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-heading">{heroPost.title}</h1>
              <p className="text-lg text-accent-text/80 mb-8 max-w-lg">{heroPost.excerpt}</p>
              <Link to={`/blog/${heroPost.slug}`} className="inline-block bg-text-primary text-background px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]">
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
          {featuredPosts.length > 0 && (
            <div className="mb-20">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left text-text-primary dark:text-accent font-heading">Featured Blog Posts</h2>
              <div className="w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeFeaturedIndex * 100}%)` }}
                >
                  {featuredPosts.map((post) => (
                    <div key={post.slug} className="w-full flex-shrink-0 px-2 py-2">
                      <BlogCard {...post} layout="horizontal" />
                    </div>
                  ))}
                </div>
              </div>
              {featuredPosts.length > 1 && (
                <div className="flex justify-center space-x-3 mt-8">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeaturedIndex(index)}
                      aria-label={`Go to featured post ${index + 1}`}
                      className={`w-8 h-2 transition-all duration-300 ease-in-out ${
                        activeFeaturedIndex === index 
                          ? 'bg-border' 
                          : 'bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600'
                      }`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-20">
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left text-text-primary dark:text-accent font-heading">Browse By Topics</h2>
              <div className="flex flex-wrap justify-start gap-4">
                {allTags.map(tag => {
                  const isActive = activeCategory === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveCategory(tag)}
                      className={`px-5 py-2 border-2 border-border font-bold text-sm transition-all duration-150 hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 ${
                        isActive
                          ? 'bg-accent text-accent-text shadow-[4px_4px_0px_theme(colors.shadow-accent-bg)]'
                          : 'bg-surface text-text-primary shadow-[4px_4px_0px_theme(colors.shadow)]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-surface p-8 border-2 border-border">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="SEARCH FOR CONTENT"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-border py-3 pl-2 pr-10 text-text-primary placeholder:text-text-secondary placeholder:font-bold placeholder:tracking-widest focus:outline-none focus:border-accent font-mono"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-text-primary" size={24} />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left text-text-primary dark:text-accent font-heading">Most Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {recentPostsToDisplay.map(post => <BlogCard key={post.slug} {...post} layout="vertical" />)}
          </div>

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-xl text-text-secondary/90">No posts found.</h3>
              <p className="text-text-secondary/70">Try adjusting your search or filter.</p>
            </div>
          )}
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-20">
              <button onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)} className="bg-surface text-text-primary px-8 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]">
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