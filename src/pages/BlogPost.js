// src/pages/BlogPost.jsx

import React, { useState, useEffect, useMemo } from 'react';
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

import ReadingProgressBar from '../components/ReadingProgressBar';
import AuthorBio from '../components/AuthorBio';
import ReadNext from '../components/ReadNext';
import Callout from '../components/Callout';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [readingTime, setReadingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const metadataResponse = await fetch('/blog/metadata.json');
        const postsMetadata = await metadataResponse.json();
        const currentPost = postsMetadata.find(p => p.slug === slug);

        if (currentPost) {
          setPost(currentPost);
          document.title = `${currentPost.title} | Blog`;

          const contentResponse = await fetch(`/blog/posts/${slug}.md`);
          const contentText = await contentResponse.text();
          const contentWithoutFrontmatter = contentText.replace(/^---[\s\S]+?---/, '').trim();
          setContent(contentWithoutFrontmatter);

          const wordCount = contentWithoutFrontmatter.split(/\s+/).length;
          const wordsPerMinute = 200;
          setReadingTime(Math.ceil(wordCount / wordsPerMinute));
        }
      } catch (error) { console.error('Error fetching post:', error); }
      finally { setIsLoading(false); }
    };
    fetchPost();
    return () => { document.title = 'Blog | Muhumuza Deus'; };
  }, [slug]);

  const MarkdownComponents = useMemo(() => ({
    // THE FIX: Added a style definition for h1 tags.
    h1: ({ node, children, ...props }) => <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary mt-12 mb-6" {...props}>{children}</h1>,

    h2: ({ node, children, ...props }) => <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary mt-12 mb-6 scroll-mt-28 border-b-2 border-border/20 pb-3" {...props}>{children}</h2>,
    h3: ({ node, children, ...props }) => <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-text-primary mt-10 mb-5 scroll-mt-28" {...props}>{children}</h3>,
    p: (props) => <p className="text-lg leading-relaxed text-text-secondary mb-6" {...props} />,
    ul: (props) => <ul className="list-disc list-outside pl-6 mb-6 space-y-3 text-lg text-text-secondary" {...props} />,
    ol: (props) => <ol className="list-decimal list-outside pl-6 mb-6 space-y-3 text-lg text-text-secondary" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: ({ children, ...props }) => <a className="text-accent font-medium underline hover:opacity-80 transition-opacity break-words" {...props}>{children}</a>,
    blockquote: ({ node, children, ...props }) => {
        const pElement = Array.isArray(children) ? children[0] : children;
        const text = pElement?.props?.children;
        if (typeof text === 'string') {
            const calloutMatch = text.match(/^\s*\[!(NOTE|TIP|WARNING)\]\s*/);
            if (calloutMatch) {
                const type = calloutMatch[1];
                const newText = text.replace(calloutMatch[0], '');
                const childrenWithoutSyntax = React.cloneElement(pElement, { children: newText });
                return <Callout type={type}>{childrenWithoutSyntax}</Callout>;
            }
        }
        return <blockquote className="my-8 border-l-4 border-accent pl-5 italic text-text-secondary text-lg" {...props}>{children}</blockquote>;
    },
    code: ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <div className="my-8"><SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ fontFamily: 'var(--font-mono)', margin: 0 }} {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter></div>
        ) : (
            <code className="bg-surface text-text-primary font-mono text-[0.9em] px-1.5 py-1 border border-border/20 rounded-md" {...props}>{children}</code>
        );
    },
    img: (props) => <img className="my-8 rounded-lg border-2 border-border" {...props} alt={props.alt || ''} />,
  }), []);

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-border"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="flex items-center text-text-primary hover:text-accent">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
        </Link>
    </div>
  );

  return (
    <div className="bg-background font-body text-text-primary">
      <ReadingProgressBar />
      <div className="container mx-auto px-4 pt-28 sm:pt-32 pb-16">
        <main className="max-w-3xl mx-auto">
            <header className="text-center mb-10">
                {post.tags && (
                    <p className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
                        {post.tags.join(' / ')}
                    </p>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-text-primary mb-5 leading-tight">
                    {post.title}
                </h1>
                <p className="text-lg text-text-secondary">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="mx-2 text-border/50">•</span>
                    {readingTime} min read
                </p>
            </header>

            {post.coverImage && (
                <figure className="mb-12">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-auto object-cover aspect-video bg-surface"
                    />
                </figure>
            )}

            <ReactMarkdown
                components={MarkdownComponents}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
            >
                {content}
            </ReactMarkdown>

            <AuthorBio />

            <ReadNext currentSlug={slug} currentTags={post?.tags} />

            <div className="mt-16 pt-10 border-t border-border/20 flex justify-center">
                <Link
                    to="/blog"
                    className="inline-flex items-center justify-center bg-surface text-text-primary px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Articles
                </Link>
            </div>
        </main>
      </div>
    </div>
  );
};

export default BlogPost;