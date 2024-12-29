import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const metadataResponse = await fetch('/blog/metadata.json');
        if (!metadataResponse.ok) {
          throw new Error(`HTTP error! status: ${metadataResponse.status}`);
        }
        const postsMetadata = await metadataResponse.json();
        const currentPost = postsMetadata.find(p => p.slug === slug);
        
        if (currentPost) {
          setPost(currentPost);
          const contentResponse = await fetch(`/blog/posts/${slug}.md`);
          if (!contentResponse.ok) {
            throw new Error(`HTTP error! status: ${contentResponse.status}`);
          }
          const contentText = await contentResponse.text();
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
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white" style={{ fontFamily: 'Roboto Slab, serif' }}>
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link 
          to="/blog"
          className="flex items-center text-pink-500 hover:text-pink-400 transition-colors duration-300"
          style={{ fontFamily: 'Roboto Slab, serif' }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const MarkdownComponents = {
    // Add the image component
    img: ({ node, src, alt, ...props }) => {
      // Handle both relative and absolute paths
      const imgSrc = src.startsWith('/') ? src : `/${src}`;
      return (
        <div className="my-8">
          <img
            src={imgSrc}
            alt={alt}
            className="rounded-lg w-full max-w-3xl mx-auto"
            loading="lazy"
            {...props}
          />
          {alt && alt !== "my_math" && (
            <p className="text-center text-sm text-neutral-400 mt-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
              {alt}
            </p>
          )}
        </div>
      );
    },
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold mt-6 mb-4" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-bold mt-4 mb-3" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-4 space-y-2" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" style={{ fontFamily: 'Roboto Slab, serif' }} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-pink-500 pl-4 py-2 my-4 bg-neutral-900/50 italic" 
        style={{ fontFamily: 'Roboto Slab, serif' }} 
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          customStyle={{ 
            fontFamily: 'monospace',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-pink-500 font-mono" {...props}>
          {children}
        </code>
      );
    },
    a: ({ children, ...props }) => (
      <a 
        className="text-pink-500 hover:text-pink-400 transition-colors duration-300 underline" 
        style={{ fontFamily: 'Roboto Slab, serif' }} 
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table 
          className="min-w-full divide-y divide-neutral-800 border border-neutral-800" 
          style={{ fontFamily: 'Roboto Slab, serif' }} 
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th 
        className="px-6 py-3 bg-neutral-900 text-left text-sm font-medium text-neutral-300 uppercase tracking-wider border-b border-neutral-800" 
        style={{ fontFamily: 'Roboto Slab, serif' }} 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td 
        className="px-6 py-4 text-neutral-300 border-b border-neutral-800" 
        style={{ fontFamily: 'Roboto Slab, serif' }} 
        {...props}
      >
        {children}
      </td>
    ),
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Hero Image Section */}
      <div className="relative h-[400px] mb-12">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        
        <Link
          to="/blog"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center px-4 py-2 
            bg-neutral-900/80 backdrop-blur-sm rounded-full text-white hover:bg-neutral-800 
            transition-colors duration-300"
          style={{ fontFamily: 'Roboto Slab, serif' }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Roboto Slab, serif' }}>
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center px-3 py-1 bg-neutral-800 text-neutral-300 
                  rounded-full text-sm font-medium"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                <Tag className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-center text-sm text-neutral-400 space-x-6" style={{ fontFamily: 'Roboto Slab, serif' }}>
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
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;