// src/pages/BlogPost.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const metadataResponse = await fetch('/blog/metadata.json');
        if (!metadataResponse.ok) throw new Error(`HTTP error! status: ${metadataResponse.status}`);
        const postsMetadata = await metadataResponse.json();
        const currentPost = postsMetadata.find(p => p.slug === slug);
        
        if (currentPost) {
          setPost(currentPost);
          document.title = `${currentPost.title} | Blog`;
          
          const contentResponse = await fetch(`/blog/posts/${slug}.md`);
          if (!contentResponse.ok) throw new Error(`HTTP error! status: ${contentResponse.status}`);
          const contentText = await contentResponse.text();

          const contentWithoutFrontmatter = contentText.replace(/^---[\s\S]+?---/, '').trim();
          setContent(contentWithoutFrontmatter);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    return () => {
      document.title = 'Blog | Muhumuza Deus';
    };
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // --- Markdown Component Overrides (mobile-optimized but design preserved) ---
  const MarkdownComponents = {
    h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-extrabold text-black mt-12 sm:mt-16 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-10 sm:mt-14 mb-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-extrabold text-black mt-8 sm:mt-12 mb-4">{children}</h3>,
    p: ({ children }) => <p className="text-lg md:text-xl leading-relaxed text-gray-800 mb-6">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside pl-5 mb-6 space-y-2 text-lg md:text-xl text-gray-800">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-6 space-y-2 text-lg md:text-xl text-gray-800">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l-4 border-yellow-400 pl-4 sm:pl-6 italic text-gray-700 text-lg md:text-xl">{children}</blockquote>,
    a: ({ href, children }) => <a href={href} className="text-black font-medium underline hover:text-gray-700 transition-colors break-words">{children}</a>,
    
    img: ({ src, alt }) => (
      <figure className="my-8 sm:my-10">
        <img
          src={src.startsWith('/') ? src : `/${src}`}
          alt={alt}
          className="rounded-sm w-full h-auto"
          loading="lazy"
        />
        {alt && (
          <figcaption className="text-center text-sm text-gray-500 mt-3">{alt}</figcaption>
        )}
      </figure>
    ),

    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-6 sm:my-8 overflow-x-auto">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-sm"
            customStyle={{
              fontSize: '14px',
              lineHeight: '1.4'
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-yellow-200 text-yellow-900 font-mono text-[0.9em] px-1.5 py-0.5 rounded-md break-words" {...props}>
          {children}
        </code>
      );
    },
    
    table: ({ children }) => (
      <div className="my-8 w-full overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full min-w-full border-collapse text-base">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    th: ({ children }) => (
      <th className="bg-black text-white text-left font-bold p-2 sm:p-3 lg:p-4 whitespace-nowrap border-r-2 border-white last:border-r-0">
        {children}
      </th>
    ),
    tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
    tr: ({ children }) => <tr className="border-b-2 border-white last:border-b-0">{children}</tr>,
    td: ({ children }) => <td className="p-3 sm:p-2 bg-gray-100 text-gray-900 border-r-2 border-white last:border-r-0 first:bg-yellow-400 first:text-black">{children}</td>,
  };

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="flex items-center text-black hover:underline">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-20">

        {/* --- Post Header --- */}
        <header className="max-w-3xl mx-auto text-left mb-8 sm:mb-12">
          {post.tags && (
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {post.tags.map((tag, index) => (
                <span key={tag}>
                  {tag}
                  {index < post.tags.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-5 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-700">
            {formatDate(post.date)}
            {post.author && ` – ${post.author}`}
          </p>
        </header>

        {/* --- Main Image --- */}
        {post.coverImage && (
          <figure className="mb-8 sm:mb-12 rounded-sm overflow-hidden max-w-3xl mx-auto">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-100 object-cover" />
          </figure>
        )}

        {/* --- Post Content --- */}
        <article className="max-w-3xl mx-auto">
          <ReactMarkdown
            components={MarkdownComponents}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* --- FIX: Bottom Navigation with Hard Shadow Button --- */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200 flex justify-center">
          <Link
            to="/blog"
            className="group relative inline-block text-black text-base"
          >
            <span className="relative z-10 flex items-center justify-center border-2 border-black bg-white px-6 py-3 font-bold transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to all articles
            </span>
            <span className="absolute inset-0 border-2 border-black bg-black"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;