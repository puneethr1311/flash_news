import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({
  isOpen,
  onClose,
  categories,
  authors,
  contentTypes,
  selectedCategory,
  selectedAuthor,
  contentType,
  dateRange,
  onCategoryChange,
  onAuthorChange,
  onContentTypeChange,
  onDateRangeChange,
  onClearFilters
}) => {
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const FilterSection = ({ title, children, isCollapsible = true }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
      <div className="border-b border-secondary-200 pb-4 mb-4 last:border-b-0">
        {isCollapsible ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left mb-3 text-sm font-medium text-text-primary hover:text-primary-600 transition-colors"
          >
            <span>{title}</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        ) : (
          <h3 className="text-sm font-medium text-text-primary mb-3">{title}</h3>
        )}
        {(!isCollapsible || isExpanded) && (
          <div className="space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const FilterOption = ({ value, currentValue, onChange, children, count }) => (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center">
        <input
          type="radio"
          name={`filter-${Math.random()}`}
          value={value}
          checked={currentValue === value}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-colors ${
          currentValue === value
            ? 'border-primary bg-primary' :'border-secondary-300 group-hover:border-primary-300'
        }`}>
          {currentValue === value && (
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
          )}
        </div>
        <span className={`text-sm transition-colors ${
          currentValue === value
            ? 'text-primary-600 font-medium' :'text-text-secondary group-hover:text-text-primary'
        }`}>
          {children}
        </span>
      </div>
      {count && (
        <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </label>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-overlay bg-secondary-900 bg-opacity-50 lg:hidden">
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 max-w-sm bg-background shadow-elevated animate-slide-in-left overflow-y-auto">
            <div className="p-4 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-text-primary">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-button hover:bg-surface"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-32 h-[calc(100vh-8rem)] w-80 bg-surface border-r border-secondary-200 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-text-primary">Filters</h2>
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Clear All
            </button>
          </div>
          <FilterContent />
        </div>
      </aside>
    </>
  );

  function FilterContent() {
    return (
      <div className="space-y-6">
        {/* Categories */}
        <FilterSection title="Categories">
          {categories.map(category => (
            <FilterOption
              key={category}
              value={category}
              currentValue={selectedCategory}
              onChange={onCategoryChange}
            >
              {category === 'all' ? 'All Categories' : category}
            </FilterOption>
          ))}
        </FilterSection>

        {/* Date Range */}
        <FilterSection title="Date Range">
          {dateRangeOptions.map(option => (
            <FilterOption
              key={option.value}
              value={option.value}
              currentValue={dateRange}
              onChange={onDateRangeChange}
            >
              {option.label}
            </FilterOption>
          ))}
        </FilterSection>

        {/* Content Type */}
        <FilterSection title="Content Type">
          {contentTypes.map(type => (
            <FilterOption
              key={type}
              value={type}
              currentValue={contentType}
              onChange={onContentTypeChange}
            >
              {type === 'all' ? 'All Types' : type}
            </FilterOption>
          ))}
        </FilterSection>

        {/* Authors */}
        <FilterSection title="Authors">
          {authors.slice(0, 8).map(author => (
            <FilterOption
              key={author}
              value={author}
              currentValue={selectedAuthor}
              onChange={onAuthorChange}
            >
              {author === 'all' ? 'All Authors' : author}
            </FilterOption>
          ))}
          {authors.length > 8 && (
            <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors mt-2">
              Show more authors
            </button>
          )}
        </FilterSection>

        {/* Quick Filters */}
        <FilterSection title="Quick Filters" isCollapsible={false}>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors">
              Trending
            </button>
            <button className="px-3 py-2 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors">
              Featured
            </button>
            <button className="px-3 py-2 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors">
              Most Read
            </button>
            <button className="px-3 py-2 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors">
              Recent
            </button>
          </div>
        </FilterSection>
      </div>
    );
  }
};

export default FilterSidebar;