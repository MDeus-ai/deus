import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post metadata
        const metadataResponse = await fetch('/blog/metadata.json');
        if (!metadataResponse.ok) {
          throw new Error(`HTTP error! status: ${metadataResponse.status}`);
        }
        const postsMetadata = await metadataResponse.json();
        const currentPost = postsMetadata.find(p => p.slug === slug);
        
        if (currentPost) {
          setPost(currentPost);
          
          // Fetch the actual markdown content
          const contentResponse = await fetch(`/blog/posts/${slug}.md`);
          if (!contentResponse.ok) {
            throw new Error(`HTTP error! status: ${contentResponse.status}`);
          }
          const contentText = await contentResponse.text();
          
          // Remove frontmatter
          const contentWithoutFrontmatter = contentText.replace(/^---[\s\S]+?---/, '').trim();
          setContent(contentWithoutFrontmatter);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link 
          to="/blog"
          className="flex items-center text-pink-500 hover:text-pink-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-12">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/blog"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center px-4 py-2 
            bg-neutral-900/80 backdrop-blur-sm rounded-full text-white hover:bg-neutral-800 
            transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center px-3 py-1 bg-neutral-800 text-neutral-300 
                  rounded-full text-sm font-medium"
              >
                <Tag className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-center text-sm text-neutral-400 space-x-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readingTime} min read
            </div>
          </div>
        </div>

        {/* Post Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;