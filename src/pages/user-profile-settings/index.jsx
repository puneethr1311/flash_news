import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate reader and technology enthusiast',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev'
  });
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: false,
      newsletter: true
    },
    reading: {
      density: 'comfortable',
      fontSize: 'medium',
      defaultSort: 'latest'
    },
    categories: ['Technology', 'Science', 'Business']
  });

  // Mock user data
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15T10:30:00Z'
  };

  // Mock bookmarked articles
  const bookmarkedArticles = [
    {
      id: 1,
      title: 'The Future of Artificial Intelligence in Healthcare',
      author: 'Dr. Sarah Johnson',
      publishedAt: '2024-01-10T14:30:00Z',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Climate Change Solutions: Innovation and Implementation',
      author: 'Michael Chen',
      publishedAt: '2024-01-08T09:15:00Z',
      category: 'Science',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop',
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Remote Work Trends: Building Effective Virtual Teams',
      author: 'Lisa Rodriguez',
      publishedAt: '2024-01-05T16:45:00Z',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop',
      readTime: '6 min read'
    }
  ];

  // Mock active sessions
  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'San Francisco, CA',
      lastActive: '2024-01-15T10:30:00Z',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      lastActive: '2024-01-14T18:22:00Z',
      current: false
    }
  ];

  // Mock reading statistics
  const readingStats = {
    articlesRead: 127,
    totalReadTime: '42 hours',
    favoriteCategory: 'Technology',
    readingStreak: 15,
    monthlyGoal: 50,
    monthlyProgress: 23
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Mock save success
    console.log('Profile saved:', formData);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login-screen');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    // Mock dark mode detection
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => setShowLogoutConfirm(true)} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Profile & Settings</h1>
          <p className="text-text-secondary">Manage your account preferences and personal information</p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-surface rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-button ${
                  activeTab === tab.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden md:block">
            <div className="bg-surface rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-button flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-600 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                    }`}
                  >
                    <Icon name={tab.icon} size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-surface rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-primary text-white rounded-lg transition-button hover:bg-primary-600 flex items-center space-x-2"
                  >
                    <Icon name={isEditing ? "X" : "Edit"} size={16} />
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Image
                        src={user.avatar}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-secondary-200"
                      />
                      {isEditing && (
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center transition-button hover:bg-primary-600">
                          <Icon name="Camera" size={16} />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{user.name}</h3>
                      <p className="text-text-secondary">{user.email}</p>
                      <p className="text-sm text-text-muted">Member since {formatDate(user.joinDate)}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:text-text-muted"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:text-text-muted"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:text-text-muted"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:text-text-muted"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:text-text-muted resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-secondary-200 text-text-secondary rounded-lg transition-button hover:bg-secondary-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-primary text-white rounded-lg transition-button hover:bg-primary-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                {/* Theme Settings */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Appearance</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-text-primary">Dark Mode</h3>
                        <p className="text-sm text-text-secondary">Switch between light and dark themes</p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isDarkMode ? 'bg-primary' : 'bg-secondary-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isDarkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Notifications</h2>
                  <div className="space-y-4">
                    {Object.entries(preferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary capitalize">
                            {key === 'email' ? 'Email Notifications' : key === 'push' ? 'Push Notifications' : 'Newsletter'}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {key === 'email' ? 'Receive notifications via email' : 
                             key === 'push' ? 'Receive push notifications' : 
                             'Subscribe to our weekly newsletter'}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('notifications', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-primary' : 'bg-secondary-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reading Preferences */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Reading Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Article Display Density</label>
                      <select
                        value={preferences.reading.density}
                        onChange={(e) => handlePreferenceChange('reading', 'density', e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="compact">Compact</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Font Size</label>
                      <select
                        value={preferences.reading.fontSize}
                        onChange={(e) => handlePreferenceChange('reading', 'fontSize', e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Default Sort Order</label>
                      <select
                        value={preferences.reading.defaultSort}
                        onChange={(e) => handlePreferenceChange('reading', 'defaultSort', e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="popular">Most Popular</option>
                        <option value="trending">Trending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content Categories */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Content Categories</h2>
                  <p className="text-text-secondary mb-4">Select categories you're interested in</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Technology', 'Science', 'Business', 'Health', 'Sports', 'Entertainment', 'Politics', 'Travel', 'Food'].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-button ${
                          preferences.categories.includes(category)
                            ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Change */}
                <div className="bg-surface rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">Password</h2>
                      <p className="text-text-secondary">Last changed 3 months ago</p>
                    </div>
                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="px-4 py-2 bg-primary text-white rounded-lg transition-button hover:bg-primary-600"
                    >
                      Change Password
                    </button>
                  </div>

                  {showPasswordChange && (
                    <div className="space-y-4 pt-4 border-t border-secondary-200">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setShowPasswordChange(false)}
                          className="px-4 py-2 border border-secondary-200 text-text-secondary rounded-lg transition-button hover:bg-secondary-100"
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg transition-button hover:bg-primary-600">
                          Update Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-surface rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">Two-Factor Authentication</h2>
                      <p className="text-text-secondary">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setShowTwoFactorSetup(!showTwoFactorSetup)}
                      className="px-4 py-2 bg-success text-white rounded-lg transition-button hover:bg-success-600"
                    >
                      Enable 2FA
                    </button>
                  </div>

                  {showTwoFactorSetup && (
                    <div className="pt-4 border-t border-secondary-200">
                      <div className="bg-accent-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Info" size={16} className="text-accent-600" />
                          <span className="font-medium text-accent-600">Setup Instructions</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Download an authenticator app like Google Authenticator or Authy, then scan the QR code below.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-48 h-48 bg-secondary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <Icon name="QrCode" size={64} className="text-text-muted" />
                        </div>
                        <p className="text-sm text-text-secondary mb-4">
                          Backup Code: ABCD-EFGH-IJKL-MNOP
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => setShowTwoFactorSetup(false)}
                            className="px-4 py-2 border border-secondary-200 text-text-secondary rounded-lg transition-button hover:bg-secondary-100"
                          >
                            Cancel
                          </button>
                          <button className="px-4 py-2 bg-success text-white rounded-lg transition-button hover:bg-success-600">
                            Verify & Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Active Sessions</h2>
                  <div className="space-y-4">
                    {activeSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Icon name={session.device.includes('iPhone') ? 'Smartphone' : 'Monitor'} size={20} className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-text-primary flex items-center space-x-2">
                              <span>{session.device}</span>
                              {session.current && (
                                <span className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded-full">Current</span>
                              )}
                            </h3>
                            <p className="text-sm text-text-secondary">{session.browser} • {session.location}</p>
                            <p className="text-xs text-text-muted">Last active: {formatTime(session.lastActive)}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="px-3 py-1 text-sm text-error hover:bg-error-100 rounded-lg transition-button">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bookmarks Tab */}
            {activeTab === 'bookmarks' && (
              <div className="bg-surface rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">Bookmarked Articles</h2>
                    <p className="text-text-secondary">{bookmarkedArticles.length} saved articles</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-secondary-200 text-text-secondary rounded-lg transition-button hover:bg-secondary-100 flex items-center space-x-2">
                      <Icon name="Download" size={16} />
                      <span>Export</span>
                    </button>
                    <button className="px-4 py-2 bg-error text-white rounded-lg transition-button hover:bg-error-600 flex items-center space-x-2">
                      <Icon name="Trash2" size={16} />
                      <span>Clear All</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedArticles.map((article) => (
                    <div key={article.id} className="border border-secondary-200 rounded-lg overflow-hidden hover:shadow-card transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-button hover:bg-opacity-100">
                          <Icon name="BookmarkMinus" size={16} className="text-error" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 text-xs bg-primary-100 text-primary-600 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-text-muted">{article.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{article.title}</h3>
                        <div className="flex items-center justify-between text-sm text-text-secondary">
                          <span>{article.author}</span>
                          <span>{formatTime(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-6">
                {/* Reading Overview */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">Reading Overview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="BookOpen" size={24} className="text-primary-600" />
                      </div>
                      <div className="text-2xl font-bold text-text-primary">{readingStats.articlesRead}</div>
                      <div className="text-sm text-text-secondary">Articles Read</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Clock" size={24} className="text-accent-600" />
                      </div>
                      <div className="text-2xl font-bold text-text-primary">{readingStats.totalReadTime}</div>
                      <div className="text-sm text-text-secondary">Total Time</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Flame" size={24} className="text-success-600" />
                      </div>
                      <div className="text-2xl font-bold text-text-primary">{readingStats.readingStreak}</div>
                      <div className="text-sm text-text-secondary">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Star" size={24} className="text-warning-600" />
                      </div>
                      <div className="text-2xl font-bold text-text-primary">{readingStats.favoriteCategory}</div>
                      <div className="text-sm text-text-secondary">Top Category</div>
                    </div>
                  </div>
                </div>

                {/* Monthly Progress */}
                <div className="bg-surface rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-text-primary">Monthly Reading Goal</h2>
                    <span className="text-sm text-text-secondary">
                      {readingStats.monthlyProgress} / {readingStats.monthlyGoal} articles
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(readingStats.monthlyProgress / readingStats.monthlyGoal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    You're {Math.round((readingStats.monthlyProgress / readingStats.monthlyGoal) * 100)}% towards your monthly goal!
                  </p>
                </div>

                {/* Export Data */}
                <div className="bg-surface rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Export Your Data</h2>
                  <p className="text-text-secondary mb-6">Download your reading history and preferences</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-secondary-200 rounded-lg transition-button hover:bg-secondary-100 flex items-center space-x-3">
                      <Icon name="FileText" size={20} className="text-primary-600" />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">Reading History</div>
                        <div className="text-sm text-text-secondary">PDF Report</div>
                      </div>
                    </button>
                    <button className="p-4 border border-secondary-200 rounded-lg transition-button hover:bg-secondary-100 flex items-center space-x-3">
                      <Icon name="Database" size={20} className="text-success-600" />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">All Data</div>
                        <div className="text-sm text-text-secondary">JSON Export</div>
                      </div>
                    </button>
                    <button className="p-4 border border-secondary-200 rounded-lg transition-button hover:bg-secondary-100 flex items-center space-x-3">
                      <Icon name="Bookmark" size={20} className="text-accent-600" />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">Bookmarks</div>
                        <div className="text-sm text-text-secondary">CSV File</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 pt-6 border-t border-secondary-200">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="px-6 py-3 bg-error text-white rounded-lg transition-button hover:bg-error-600 flex items-center space-x-2"
          >
            <Icon name="LogOut" size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-overlay bg-secondary-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full animate-slide-down">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="LogOut" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Sign Out</h3>
                <p className="text-text-secondary">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-secondary-200 text-text-secondary rounded-lg transition-button hover:bg-secondary-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-error text-white rounded-lg transition-button hover:bg-error-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSettings;