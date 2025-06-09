import { Link } from 'react-router-dom';

const BlogCard = ({ slug, title, excerpt, coverImage, date, author, tags = [], layout = 'vertical', className = '' }) => {
  // This flag is part of the original functionality and is preserved.
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={className}>
      {/* The entire card is a Link, preserving the core functionality. */}
      {/* The closing tag is now correctly </Link> to prevent syntax errors. */}
      <Link
        to={`/blog/${slug}`}
        className="group block bg-gray-50 border-2 border-black h-full
                   transition-all duration-300 ease-in-out
                   hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1"
      >
        <div className={`flex ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
          {/* Cover Image with correct border based on layout */}
          <div className={`flex-shrink-0 ${isHorizontal ? 'md:w-5/12 border-r-2 border-black' : 'h-56 border-b-2 border-black'}`}>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.src = '/assets/placeholder.jpg'; }} // Added fallback display none
            />
          </div>

          {/* Content area */}
          <div className={`p-6 flex flex-col justify-between flex-grow ${isHorizontal ? 'md:w-7/12' : 'w-full'}`}>
            {/* Top part of the card content */}
            <div>
              <h3 className="text-xl font-bold mb-3 line-clamp-3">{title}</h3>

              {/* Excerpt is now conditionally rendered ONLY for horizontal cards, matching the design. */}
              {isHorizontal && (
                <p className="text-gray-600 line-clamp-2 mb-4">{excerpt}</p>
              )}

              {/* Date and Author line is now included */}
              <p className="text-xs text-gray-500 mb-4">
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {author && <span className="mx-1">•</span>}
                {author}
              </p>
            </div>

            {/* Tags are now conditionally rendered ONLY for vertical cards, matching the design. */}
            {!isHorizontal && tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div >
  );
};

export default BlogCard;