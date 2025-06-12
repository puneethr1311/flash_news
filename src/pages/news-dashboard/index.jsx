import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import FilterSidebar from './components/FilterSidebar';
import ArticleCard from './components/ArticleCard';
import FilterBar from './components/FilterBar';
import LoadingSkeleton from './components/LoadingSkeleton';

const NewsDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [contentType, setContentType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const observerRef = useRef();
  const lastArticleElementRef = useRef();

  // Mock user data
  const mockUser = {
    id: 1,
    name: "puneet",
    email: "puneet@example.com",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  };

  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      title: "Revolutionary AI Technology Transforms Healthcare Industry",
      excerpt: "New artificial intelligence breakthrough promises to revolutionize patient care and medical diagnosis with unprecedented accuracy.",
      content: `Artificial intelligence is making unprecedented strides in healthcare, with new technologies promising to transform how we diagnose, treat, and prevent diseases. Recent breakthroughs in machine learning algorithms have enabled medical professionals to detect conditions earlier and with greater accuracy than ever before.

The latest AI systems can analyze medical images, predict patient outcomes, and even suggest personalized treatment plans. This technology is particularly promising in areas such as radiology, where AI can identify subtle patterns in X-rays and MRIs that might be missed by human eyes.

Healthcare providers are increasingly adopting these AI solutions, reporting improved patient outcomes and reduced diagnostic errors. The integration of AI in healthcare represents a significant step forward in making medical care more precise, efficient, and accessible to patients worldwide.`,
      author: "Dr. Sarah Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "Technology",
      contentType: "Article",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      readTime: "5 min read",
      tags: ["AI", "Healthcare", "Technology", "Innovation"],
      isNew: true
    },
    {
      id: 2,
      title: "Climate Change Summit Reaches Historic Agreement",
      excerpt: "World leaders unite on ambitious climate goals, setting new standards for carbon reduction and renewable energy adoption.",
      content: `In a landmark decision that could reshape global environmental policy, world leaders at the International Climate Summit have reached a historic agreement on carbon reduction targets. The comprehensive accord includes binding commitments from major economies to achieve net-zero emissions by 2050.

The agreement encompasses unprecedented cooperation on renewable energy development, with participating nations committing to invest over $2 trillion in clean energy infrastructure over the next decade. This collaborative effort represents the most significant climate action since the Paris Agreement.

Key provisions include mandatory carbon pricing mechanisms, technology sharing agreements, and support for developing nations transitioning to clean energy. Environmental experts are calling this agreement a crucial step in addressing the global climate crisis.`,
      author: "Michael Chen",
      authorAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: "Environment",
      contentType: "News",
      imageUrl: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?w=800&h=400&fit=crop",
      readTime: "7 min read",
      tags: ["Climate", "Environment", "Politics", "Global"],
      isNew: true
    },
    {
      id: 3,
      title: "Space Exploration Reaches New Milestone",
      excerpt: "Private space company successfully launches mission to Mars, marking a new era in commercial space exploration.",
      content: `The commercial space industry has achieved another remarkable milestone with the successful launch of a Mars exploration mission by a private aerospace company. This achievement represents a significant step forward in making space exploration more accessible and cost-effective.

The mission, which took years of planning and development, demonstrates the growing capabilities of private companies in space technology. The spacecraft is equipped with advanced scientific instruments designed to study Martian geology and search for signs of past or present life.

This success opens new possibilities for future Mars missions, including potential human exploration. The collaboration between private companies and space agencies is accelerating our understanding of the Red Planet and bringing us closer to establishing a human presence beyond Earth.`,
      author: "Dr. Emily Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: "Science",
      contentType: "Article",
      imageUrl: "https://images.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg?w=800&h=400&fit=crop",
      readTime: "6 min read",
      tags: ["Space", "Mars", "Exploration", "Technology"]
    },
    {
      id: 4,
      title: "Economic Markets Show Strong Recovery Signs",
      excerpt: "Global financial markets demonstrate resilience with sustained growth across multiple sectors and regions.",
      content: `Financial markets worldwide are showing strong signs of recovery, with major indices reaching new highs and sustained growth across various sectors. Economic indicators suggest a robust recovery driven by technological innovation, infrastructure investment, and consumer confidence.

The technology sector continues to lead market gains, with companies focusing on artificial intelligence, renewable energy, and digital transformation showing particularly strong performance. This growth is supported by increased investment in research and development and favorable regulatory environments.

Analysts are optimistic about continued market stability, citing strong corporate earnings, low unemployment rates, and steady consumer spending. However, they also caution about potential challenges including inflation concerns and geopolitical uncertainties that could impact future growth.`,
      author: "Robert Williams",
      authorAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: "Business",
      contentType: "Analysis",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      readTime: "4 min read",
      tags: ["Economy", "Markets", "Finance", "Business"]
    },
    {
      id: 5,
      title: "Breakthrough in Renewable Energy Storage",
      excerpt: "Scientists develop revolutionary battery technology that could solve renewable energy storage challenges.",
      content: `Researchers at leading universities have announced a breakthrough in battery technology that could revolutionize renewable energy storage. The new battery design offers significantly improved capacity, faster charging times, and longer lifespan compared to current technologies.

This innovation addresses one of the biggest challenges in renewable energy adoption: storing power generated from solar and wind sources for use when these sources are not available. The new battery technology uses advanced materials and innovative design principles to achieve unprecedented efficiency.

The development has attracted significant interest from energy companies and governments worldwide. Commercial applications are expected within the next five years, potentially accelerating the transition to renewable energy and reducing dependence on fossil fuels.`,
      author: "Dr. Lisa Park",
      authorAvatar: "https://randomuser.me/api/portraits/women/5.jpg",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: "Technology",
      contentType: "Research",
      imageUrl: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?w=800&h=400&fit=crop",
      readTime: "8 min read",
      tags: ["Energy", "Battery", "Innovation", "Sustainability"]
    },
    {
      id: 6,
      title: "Digital Education Revolution Transforms Learning",
      excerpt: "Educational institutions worldwide adopt innovative digital learning platforms, reshaping traditional education models.",
      content: `The education sector is undergoing a digital transformation that is fundamentally changing how students learn and teachers instruct. Advanced learning management systems, virtual reality classrooms, and AI-powered personalized learning are becoming mainstream in educational institutions worldwide.

This shift has been accelerated by recent global events that highlighted the need for flexible, accessible education solutions. Schools and universities are investing heavily in digital infrastructure and training educators to effectively use new technologies.

Students are benefiting from personalized learning experiences that adapt to their individual pace and learning style. Virtual laboratories, interactive simulations, and collaborative online projects are providing rich educational experiences that were previously impossible in traditional classroom settings.`,
      author: "Professor David Kim",
      authorAvatar: "https://randomuser.me/api/portraits/men/6.jpg",
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
      category: "Education",
      contentType: "Feature",
      imageUrl: "https://images.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png?w=800&h=400&fit=crop",
      readTime: "6 min read",
      tags: ["Education", "Digital", "Learning", "Technology"]
    }
  ];

  const categories = ["all", "Technology", "Environment", "Science", "Business", "Education", "Health", "Sports"];
  const authors = ["all", ...new Set(mockArticles.map(article => article.author))];
  const contentTypes = ["all", "Article", "News", "Analysis", "Research", "Feature"];

  // Initialize articles on component mount
  useEffect(() => {
    const initializeArticles = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setLoading(false);
    };

    initializeArticles();
  }, []);

  // Filter articles based on current filters
  useEffect(() => {
    let filtered = [...articles];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(article => article.author === selectedAuthor);
    }

    if (contentType !== 'all') {
      filtered = filtered.filter(article => article.contentType === contentType);
    }

    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          filterDate = null;
      }

      if (filterDate) {
        filtered = filtered.filter(article => new Date(article.publishedAt) >= filterDate);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort articles
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.readTime.localeCompare(a.readTime)));
        break;
      default: // relevance
        break;
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, selectedAuthor, contentType, dateRange, searchTerm, sortBy]);

  // Infinite scroll observer
  const lastArticleElementRefCallback = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreArticles();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const loadMoreArticles = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    // Simulate loading more articles
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just duplicate some articles with new IDs
    const moreArticles = mockArticles.slice(0, 3).map(article => ({
      ...article,
      id: article.id + (page * 10),
      publishedAt: new Date(Date.now() - (page * 24 * 60 * 60 * 1000))
    }));
    
    setArticles(prev => [...prev, ...moreArticles]);
    setPage(prev => prev + 1);
    setLoadingMore(false);
    
    // Stop loading more after 3 pages for demo
    if (page >= 3) {
      setHasMore(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add some new articles at the beginning
    const newArticles = [
      {
        ...mockArticles[0],
        id: Date.now(),
        title: "Breaking: Latest Technology News Update",
        publishedAt: new Date(),
        isNew: true
      }
    ];
    
    setArticles(prev => [...newArticles, ...prev]);
    setNewArticlesCount(prev => prev + 1);
    setRefreshing(false);
  };

  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId);
      } else {
        newBookmarks.add(articleId);
      }
      return newBookmarks;
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setContentType('all');
    setDateRange('all');
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedAuthor !== 'all') count++;
    if (contentType !== 'all') count++;
    if (dateRange !== 'all') count++;
    if (searchTerm) count++;
    return count;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(term.trim())}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={mockUser} />
        <div className="pt-16">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header user={mockUser} onSearch={handleSearch} />
      
      <div className="pt-16">
        {/* Filter Bar */}
        

        <div className="flex">
          {/* Desktop Sidebar */}
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            categories={categories}
            authors={authors}
            contentTypes={contentTypes}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
            contentType={contentType}
            dateRange={dateRange}
            onCategoryChange={setSelectedCategory}
            onAuthorChange={setSelectedAuthor}
            onContentTypeChange={setContentType}
            onDateRangeChange={setDateRange}
            onClearFilters={clearAllFilters}
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white text-text-primary mb-2">
                    Latest News & Articles
                  </h1>
                  <p className="text-text-secondary">
                    {filteredArticles.length} articles found
                    {getActiveFilterCount() > 0 && ` with ${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`}
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  {/* New Articles Notification */}
                  {newArticlesCount > 0 && (
                    <div className="bg-accent-100 text-accent-600 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Icon name="Bell" size={14} />
                      <span>{newArticlesCount} new</span>
                    </div>
                  )}

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-surface border border-secondary-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="date">Sort by Date</option>
                      <option value="popularity">Sort by Popularity</option>
                    </select>
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none"
                    />
                  </div>

                  {/* Refresh Button */}
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-2 rounded-lg transition-button hover:bg-surface disabled:opacity-50"
                    title="Refresh articles"
                  >
                    <Icon 
                      name="RefreshCw" 
                      size={18} 
                      className={`text-text-muted ${refreshing ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      ref={index === filteredArticles.length - 1 ? lastArticleElementRefCallback : null}
                    >
                      <ArticleCard
                        article={article}
                        isBookmarked={bookmarkedArticles.has(article.id)}
                        onToggleBookmark={() => toggleBookmark(article.id)}
                        onRead={() => navigate(`/article/${article.id}`)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Search" size={32} className="text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No articles found</h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your filters or search terms to find more content.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-primary text-white px-4 py-2 rounded-lg transition-button hover:bg-primary-600"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center py-8">
                  <div className="flex items-center space-x-2 text-text-muted">
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>Loading more articles...</span>
                  </div>
                </div>
              )}

              {/* End of Results */}
              {!hasMore && filteredArticles.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-muted">You've reached the end of the articles</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NewsDashboard;