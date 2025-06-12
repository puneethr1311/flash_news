import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleCard = ({ article, isBookmarked, onToggleBookmark, onRead }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffInMinutes = Math.floor((now - articleDate) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getContentTypeColor = (type) => {
    const colors = {
      'Article': 'bg-blue-100 text-blue-600',
      'News': 'bg-red-100 text-red-600',
      'Analysis': 'bg-purple-100 text-purple-600',
      'Research': 'bg-green-100 text-green-600',
      'Feature': 'bg-orange-100 text-orange-600'
    };
    return colors[type] || 'bg-secondary-100 text-text-secondary';
  };

  return (
    <article className="bg-background border border-secondary-200 rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 group">
      {/* Article Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Elements */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Content Type Badge */}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getContentTypeColor(article.contentType)}`}>
            {article.contentType}
          </span>
          
          {/* New Badge */}
          {article.isNew && (
            <span className="bg-accent text-white px-2 py-1 text-xs font-medium rounded-full animate-pulse">
              New
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className="absolute bottom-3 right-3 p-2 bg-background bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? 'text-accent fill-current' : 'text-text-muted'}
          />
        </button>
      </div>

      {/* Article Content */}
      <div className="p-4">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs text-text-muted mb-2">
          <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full font-medium">
            {article.category}
          </span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={article.authorAvatar}
                alt={article.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{article.author}</p>
              <p className="text-xs text-text-muted">{formatTimeAgo(article.publishedAt)}</p>
            </div>
          </div>

          {/* Read Button */}
          <button
            onClick={onRead}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            <span>Read</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-secondary-200">
            {article.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-surface text-text-muted rounded-full hover:bg-secondary-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-text-muted">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Overlay for Mobile */}
      <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none lg:hidden"></div>
    </article>
  );
};

export default ArticleCard;