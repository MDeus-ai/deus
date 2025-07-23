import { Link } from 'react-router-dom';

const BlogCard = ({ slug, title, excerpt, coverImage, date, author, tags = [], layout = 'vertical', className = '' }) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={className}>
      <Link
        to={`/blog/${slug}`}
        className={`group block bg-surface border-2 border-border h-full 
                   transition-all duration-300 ease-in-out 
                   hover:shadow-none hover:translate-x-2 hover:translate-y-2
                   active:translate-x-0 active:translate-y-0
                   shadow-[8px_8px_0px_theme(colors.shadow)]`}
      >
        <div className={`flex ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
          <div className={`flex-shrink-0 bg-gray-200 dark:bg-zinc-800 ${isHorizontal ? 'md:w-5/12 border-r-2 border-border' : 'h-56 border-b-2 border-border'}`}>
            <img src={coverImage} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/assets/placeholder.jpg'; }} />
          </div>
          <div className={`p-6 flex flex-col justify-between flex-grow`}>
            <div>
              <h3 className="text-xl font-bold mb-3 line-clamp-3 text-text-primary">{title}</h3>
              {isHorizontal && ( <p className="text-text-secondary line-clamp-2 mb-4">{excerpt}</p> )}
              <p className="text-xs text-text-secondary/80 mb-4">
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {author && <span className="mx-1">•</span>}
                {author}
              </p>
            </div>
            {!isHorizontal && tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;