import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/news-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Icon name="FileX" size={64} className="text-primary-600" />
          </div>
          <h1 className="text-6xl font-bold text-primary-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium transition-button hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-surface text-text-primary py-3 px-6 rounded-lg font-medium transition-button hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:ring-offset-2 flex items-center justify-center space-x-2 border border-secondary-200"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-secondary-200">
          <p className="text-sm text-text-muted mb-4">Need help? Try these links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate('/news-dashboard')}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/search-results')}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => navigate('/user-profile-settings')}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;