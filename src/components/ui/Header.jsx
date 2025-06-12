import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isAdmin = user?.role === 'admin';
  const isLoginPage = location.pathname === '/login-screen';

  const navigationItems = [
    { label: 'Dashboard', path: '/news-dashboard', icon: 'Home', requiredRole: null },
    { label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'BarChart3', requiredRole: 'admin' },
    { label: 'Payout Management', path: '/payout-management', icon: 'CreditCard', requiredRole: 'admin' },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiredRole || (isAdmin && item.requiredRole === 'admin')
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsSearchFocused(false);
    }
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/login-screen');
  };

  const isActivePath = (path) => {
    if (path === '/news-dashboard') {
      return location.pathname === '/' || location.pathname === '/news-dashboard';
    }
    return location.pathname === path;
  };

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-300 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/news-dashboard')}
                className="flex items-center space-x-3 transition-all duration-200 hover:opacity-90 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <Icon name="Newspaper" size={22} color="white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hidden sm:block">
                  FLASH NEWS
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {filteredNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 relative group ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                  {isActivePath(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-12 pr-4 py-3 w-72 border-2 rounded-2xl text-sm font-medium transition-all duration-200 focus:outline-none placeholder-gray-400 ${
                      isSearchFocused 
                        ? 'border-blue-300 bg-white shadow-lg ring-4 ring-blue-50' 
                        : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300'
                    }`}
                  />
                </div>
              </form>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 hover:bg-gray-50 group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center ring-2 ring-white shadow-sm">
                    <Icon name="User" size={18} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 hidden lg:block">
                    {user?.name || 'User'}
                  </span>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 mt-1">{user?.email || 'user@example.com'}</p>
                      {isAdmin && (
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handleNavigation('/user-profile-settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-3"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 active:scale-95"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden">
          <div 
            ref={mobileMenuRef}
            className="fixed right-0 top-0 h-full w-80 max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center ring-2 ring-white shadow-sm">
                    <Icon name="User" size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl transition-all duration-200 hover:bg-gray-50 active:scale-95"
                >
                  <Icon name="X" size={22} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-6 space-y-3">
              {filteredNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left px-4 py-4 rounded-2xl transition-all duration-200 flex items-center space-x-4 ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => {
                  handleNavigation('/user-profile-settings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-4 rounded-2xl transition-all duration-200 hover:bg-white flex items-center space-x-4 text-gray-700 hover:text-gray-900 mb-3"
              >
                <Icon name="Settings" size={20} />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-4 rounded-2xl transition-all duration-200 hover:bg-red-50 flex items-center space-x-4 text-red-600"
              >
                <Icon name="LogOut" size={20} />
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;