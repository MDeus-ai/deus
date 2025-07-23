import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MiniBlogCard = ({ slug, title, coverImage, date }) => (
    <Link to={`/blog/${slug}`} className="group block bg-surface border-2 border-border p-4 transition-all duration-200 ease-in-out shadow-[6px_6px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5">
        <div className="flex items-start gap-4">
            <img src={coverImage} alt={title} className="w-20 h-20 object-cover border-2 border-border flex-shrink-0" />
            <div>
                <p className="text-xs text-text-secondary mb-1">
                    {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
                <h4 className="font-heading font-bold text-text-primary leading-tight group-hover:text-accent transition-colors">
                    {title}
                </h4>
            </div>
        </div>
    </Link>
);


const ReadNext = ({ currentSlug, currentTags = [] }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const fetchAndFilterPosts = async () => {
            try {
                const response = await fetch('/blog/metadata.json');
                const allPosts = await response.json();

                // Filter out the current post
                const otherPosts = allPosts.filter(p => p.slug !== currentSlug);

                // Find posts with at least one common tag
                const postsWithSharedTags = otherPosts.filter(p =>
                    p.tags && p.tags.some(tag => currentTags.includes(tag))
                );

                // Get the two most recent posts as a fallback
                const recentPosts = otherPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Combine and de-duplicate, prioritizing tagged posts
                const finalSuggestions = [...new Set([...postsWithSharedTags, ...recentPosts])];

                setRelatedPosts(finalSuggestions.slice(0, 2));

            } catch (error) {
                console.error("Failed to fetch related posts:", error);
            }
        };

        fetchAndFilterPosts();
    }, [currentSlug, currentTags]);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mt-16">
            <h2 className="font-heading text-2xl font-extrabold text-text-primary mb-6">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map(post => <MiniBlogCard key={post.slug} {...post} />)}
            </div>
        </div>
    );
};

export default ReadNext;