import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  activeFilterCount,
  onClearFilters,
  onToggleSidebar
}) => {
  const scrollRef = useRef(null);

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-10 bg-background border-b border-secondary-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-surface border border-secondary-200 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-button"
          >
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex items-center justify-center w-8 h-8 bg-surface border border-secondary-200 rounded-full hover:bg-secondary-100 transition-button"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* Horizontal Scrolling Filter Container */}
          <div className="flex-1 relative">
            <div
              ref={scrollRef}
              className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Category Chips */}
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-button ${
                    selectedCategory === category
                      ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-secondary-100 border border-secondary-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}

              {/* Date Range Selector */}
              <div className="flex-shrink-0 relative">
                <select
                  value={dateRange}
                  onChange={(e) => onDateRangeChange(e.target.value)}
                  className={`appearance-none px-4 py-2 pr-8 rounded-full text-sm font-medium border transition-button cursor-pointer ${
                    dateRange !== 'all' ?'bg-primary text-white border-primary' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-secondary-100 border-secondary-200'
                  }`}
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                    dateRange !== 'all' ? 'text-white' : 'text-text-muted'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="hidden sm:flex items-center justify-center w-8 h-8 bg-surface border border-secondary-200 rounded-full hover:bg-secondary-100 transition-button"
          >
            <Icon name="ChevronRight" size={16} />
          </button>

          {/* Active Filter Count & Clear Button */}
          {activeFilterCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-accent-100 text-accent-600 rounded-lg text-sm">
                <Icon name="Filter" size={14} />
                <span>{activeFilterCount} active</span>
              </div>
              <button
                onClick={onClearFilters}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-error hover:bg-error-100 rounded-lg transition-button"
                title="Clear all filters"
              >
                <Icon name="X" size={14} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => onCategoryChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {dateRange !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs">
                <span>Date: {dateRangeOptions.find(opt => opt.value === dateRange)?.label}</span>
                <button onClick={() => onDateRangeChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;