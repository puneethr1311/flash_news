import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const filterPanelRef = useRef(null);
  const searchInputRef = useRef(null);

  const [filters, setFilters] = useState({
    dateRange: 'all',
    contentType: 'all',
    author: '',
    category: 'all',
    source: 'all'
  });

  const [activeFilters, setActiveFilters] = useState([]);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "user"
  };

  // Mock search results data
  const mockSearchResults = [
    {
      id: 1,
      title: "Breaking: Revolutionary AI Technology Transforms Healthcare Industry",
      snippet: "Scientists have developed groundbreaking artificial intelligence that can diagnose diseases with 99% accuracy, potentially revolutionizing medical care worldwide.",
      author: "Dr. Michael Chen",
      publishedAt: "2024-01-15T10:30:00Z",
      source: "TechNews Daily",
      category: "Technology",
      type: "News",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      relevanceScore: 95,
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "Climate Change Solutions: New Green Technology Shows Promise",
      snippet: "Innovative renewable energy solutions are being tested across multiple countries, showing significant potential for reducing carbon emissions by 40%.",
      author: "Emma Rodriguez",
      publishedAt: "2024-01-14T15:45:00Z",
      source: "Environmental Times",
      category: "Environment",
      type: "Article",
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
      relevanceScore: 88,
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Global Economy Outlook: Technology Sector Leads Recovery",
      snippet: "Technology companies are driving economic recovery with unprecedented growth rates, creating millions of new jobs worldwide.",
      author: "James Wilson",
      publishedAt: "2024-01-13T09:20:00Z",
      source: "Business Weekly",
      category: "Business",
      type: "Analysis",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      relevanceScore: 82,
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Space Exploration: Mars Mission Achieves Historic Milestone",
      snippet: "The latest Mars rover has successfully collected samples that could provide evidence of ancient life on the red planet.",
      author: "Dr. Lisa Park",
      publishedAt: "2024-01-12T14:10:00Z",
      source: "Space Explorer",
      category: "Science",
      type: "News",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
      relevanceScore: 79,
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Education Revolution: AI-Powered Learning Platforms Transform Schools",
      snippet: "Educational institutions worldwide are adopting AI-powered platforms that personalize learning experiences for students.",
      author: "Prof. David Kim",
      publishedAt: "2024-01-11T11:30:00Z",
      source: "Education Today",
      category: "Education",
      type: "Feature",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      relevanceScore: 75,
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Healthcare Innovation: Telemedicine Adoption Reaches New Heights",
      snippet: "Remote healthcare services have seen unprecedented growth, making medical care more accessible to rural communities.",
      author: "Dr. Amanda Foster",
      publishedAt: "2024-01-10T16:45:00Z",
      source: "Medical Journal",
      category: "Health",
      type: "Research",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      relevanceScore: 71,
      readTime: "6 min read"
    }
  ];

  const mockSearchSuggestions = [
    "artificial intelligence healthcare",
    "climate change technology",
    "space exploration mars",
    "renewable energy solutions",
    "telemedicine innovation"
  ];

  const mockRecentSearches = [
    "AI technology",
    "climate solutions",
    "space mission",
    "healthcare innovation"
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'popularity', label: 'Popularity', icon: 'TrendingUp' },
    { value: 'author', label: 'Author', icon: 'User' }
  ];

  const filterOptions = {
    dateRange: [
      { value: 'all', label: 'All Time' },
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'year', label: 'This Year' }
    ],
    contentType: [
      { value: 'all', label: 'All Types' },
      { value: 'news', label: 'News' },
      { value: 'article', label: 'Articles' },
      { value: 'analysis', label: 'Analysis' },
      { value: 'feature', label: 'Features' },
      { value: 'research', label: 'Research' }
    ],
    category: [
      { value: 'all', label: 'All Categories' },
      { value: 'technology', label: 'Technology' },
      { value: 'business', label: 'Business' },
      { value: 'science', label: 'Science' },
      { value: 'health', label: 'Health' },
      { value: 'environment', label: 'Environment' },
      { value: 'education', label: 'Education' }
    ],
    source: [
      { value: 'all', label: 'All Sources' },
      { value: 'technews', label: 'TechNews Daily' },
      { value: 'business', label: 'Business Weekly' },
      { value: 'environmental', label: 'Environmental Times' },
      { value: 'space', label: 'Space Explorer' },
      { value: 'medical', label: 'Medical Journal' },
      { value: 'education', label: 'Education Today' }
    ]
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    updateActiveFilters();
  }, [filters]);

  const performSearch = (query) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Add to search history
      if (query && !searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
      }
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const updateActiveFilters = () => {
    const active = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== 'all' && value !== '') {
        const option = filterOptions[key]?.find(opt => opt.value === value);
        if (option) {
          active.push({ key, value, label: option.label });
        }
      }
    });
    setActiveFilters(active);
  };

  const removeFilter = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterKey === 'author' ? '' : 'all'
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: 'all',
      contentType: 'all',
      author: '',
      category: 'all',
      source: 'all'
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">{part}</mark> : 
        part
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getFilteredAndSortedResults = () => {
    let filtered = mockSearchResults.filter(result => {
      if (filters.contentType !== 'all' && result.type.toLowerCase() !== filters.contentType) return false;
      if (filters.category !== 'all' && result.category.toLowerCase() !== filters.category) return false;
      if (filters.author && !result.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case 'popularity':
          return b.relevanceScore - a.relevanceScore;
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

    return filtered;
  };

  const filteredResults = getFilteredAndSortedResults();
  const resultsPerPage = 6;
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Search Results
              </h1>
              {searchTerm && (
                <p className="text-text-secondary mt-1">
                  {filteredResults.length} results for "{searchTerm}"
                </p>
              )}
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowUpDown" size={16} className="text-text-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-secondary-200 rounded-lg text-sm font-medium transition-button hover:bg-surface"
              >
                <Icon name="Filter" size={16} />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative mb-4">
            <form onSubmit={handleSearch} className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles, authors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="w-full pl-12 pr-12 py-4 border border-secondary-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background shadow-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
            </form>

            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-secondary-200 rounded-lg shadow-modal z-50">
                {searchHistory.length > 0 && (
                  <div className="p-4 border-b border-secondary-200">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Recent Searches</h4>
                    <div className="space-y-1">
                      {searchHistory.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(search);
                            navigate(`/search-results?q=${encodeURIComponent(search)}`);
                          }}
                          className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded hover:bg-surface transition-button"
                        >
                          <Icon name="Clock" size={14} className="text-text-muted" />
                          <span className="text-sm text-text-secondary">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Trending Topics</h4>
                  <div className="space-y-1">
                    {mockSearchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
                        }}
                        className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded hover:bg-surface transition-button"
                      >
                        <Icon name="TrendingUp" size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-medium text-text-secondary">Active filters:</span>
              {activeFilters.map((filter) => (
                <span
                  key={`${filter.key}-${filter.value}`}
                  className="inline-flex items-center space-x-1 bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-text-muted hover:text-text-primary transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-surface rounded-lg border border-secondary-200 p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                  >
                    {filterOptions.dateRange.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Content Type
                  </label>
                  <select
                    value={filters.contentType}
                    onChange={(e) => handleFilterChange('contentType', e.target.value)}
                    className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                  >
                    {filterOptions.contentType.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                  >
                    {filterOptions.category.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Source Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Source
                  </label>
                  <select
                    value={filters.source}
                    onChange={(e) => handleFilterChange('source', e.target.value)}
                    className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                  >
                    {filterOptions.source.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Search by author..."
                    value={filters.author}
                    onChange={(e) => handleFilterChange('author', e.target.value)}
                    className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {isFilterPanelOpen && (
            <div className="fixed inset-0 z-overlay bg-secondary-900 bg-opacity-50 lg:hidden">
              <div 
                ref={filterPanelRef}
                className="fixed left-0 top-0 h-full w-80 max-w-sm bg-background shadow-elevated animate-slide-in-left overflow-y-auto"
              >
                <div className="p-4 border-b border-secondary-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-text-primary">Filters</h3>
                    <button
                      onClick={() => setIsFilterPanelOpen(false)}
                      className="p-2 rounded-lg transition-button hover:bg-surface"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-6">
                  {/* Same filter options as desktop */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Date Range
                    </label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                      className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                    >
                      {filterOptions.dateRange.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Content Type
                    </label>
                    <select
                      value={filters.contentType}
                      onChange={(e) => handleFilterChange('contentType', e.target.value)}
                      className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                    >
                      {filterOptions.contentType.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                    >
                      {filterOptions.category.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Source
                    </label>
                    <select
                      value={filters.source}
                      onChange={(e) => handleFilterChange('source', e.target.value)}
                      className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                    >
                      {filterOptions.source.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      placeholder="Search by author..."
                      value={filters.author}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      className="w-full border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                    />
                  </div>
                </div>

                <div className="p-4 border-t border-secondary-200">
                  <button
                    onClick={() => setIsFilterPanelOpen(false)}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium transition-button hover:bg-primary-600"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-surface rounded-lg border border-secondary-200 p-6 animate-pulse">
                    <div className="w-full h-48 bg-secondary-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                    <div className="h-4 bg-secondary-200 rounded w-3/4 mb-4"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-secondary-200 rounded w-20"></div>
                      <div className="h-3 bg-secondary-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                  <Icon name="Search" size={32} className="text-secondary-400" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  No results found
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">Try searching for:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {mockSearchSuggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
                        }}
                        className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm hover:bg-primary-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Search Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginatedResults.map((article) => (
                    <article
                      key={article.id}
                      className="bg-surface rounded-lg border border-secondary-200 overflow-hidden transition-all duration-200 hover:shadow-card hover:border-secondary-300 group"
                    >
                      <div className="relative overflow-hidden h-48">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-text-primary">
                            {article.type}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
                            <Icon name="Target" size={12} className="text-primary-600" />
                            <span className="text-xs font-medium text-primary-600">
                              {article.relevanceScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-600">
                            {article.category}
                          </span>
                          <span className="text-xs text-text-muted">{article.readTime}</span>
                        </div>
                        
                        <h3 className="font-heading font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {highlightSearchTerm(article.title, searchTerm)}
                        </h3>
                        
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                          {highlightSearchTerm(article.snippet, searchTerm)}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                              <Icon name="User" size={12} className="text-primary-600" />
                            </div>
                            <span className="text-text-secondary font-medium">
                              {article.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-text-muted">
                            <Icon name="Calendar" size={12} />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-secondary-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted">{article.source}</span>
                            <div className="flex items-center space-x-2">
                              <button className="p-1 rounded-full hover:bg-secondary-100 transition-colors">
                                <Icon name="Bookmark" size={14} className="text-text-muted" />
                              </button>
                              <button className="p-1 rounded-full hover:bg-secondary-100 transition-colors">
                                <Icon name="Share2" size={14} className="text-text-muted" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1 px-3 py-2 border border-secondary-200 rounded-lg text-sm font-medium transition-button hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="ChevronLeft" size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-button ${
                              currentPage === page
                                ? 'bg-primary text-white' :'border border-secondary-200 hover:bg-surface'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-1 px-3 py-2 border border-secondary-200 rounded-lg text-sm font-medium transition-button hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;