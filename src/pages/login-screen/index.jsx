import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockCredentials = {
    admin: {
      email: "admin@flashnews.com",
      password: "admin123",
      role: "admin",
      name: "Admin User"
    },
    user: {
      email: "user@flashnews.com", 
      password: "user123",
      role: "user",
      name: "Regular User"
    }
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { email, password } = formData;
      
      // Check credentials
      let authenticatedUser = null;
      
      if (email === mockCredentials.admin.email && password === mockCredentials.admin.password) {
        authenticatedUser = mockCredentials.admin;
      } else if (email === mockCredentials.user.email && password === mockCredentials.user.password) {
        authenticatedUser = mockCredentials.user;
      }

      if (authenticatedUser) {
        // Store user data in localStorage (mock session)
        localStorage.setItem('flashNewsUser', JSON.stringify(authenticatedUser));
        
        // Redirect based on role
        if (authenticatedUser.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/news-dashboard');
        }
      } else {
        setError('Invalid email or password. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('Login failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo purposes, use the provided mock credentials.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-100 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}
  ></div>
</div>


      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-elevated border border-secondary-200 p-8 animate-fade-in">
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-card">
              <Icon name="Newspaper" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome to Flash News</h1>
            <WelcomeMessage />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-100 border border-error-200 rounded-lg animate-slide-down">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                <p className="text-sm text-error font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            onForgotPassword={handleForgotPassword}
          />

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-accent-100 rounded-lg border border-accent-200">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Info" size={16} className="text-accent-600" />
              <h3 className="text-sm font-semibold text-accent-600">Demo Credentials</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-background rounded p-2 border border-accent-200">
                <p className="font-medium text-text-primary">Admin Access:</p>
                <p className="text-text-secondary">Email: admin@flashnews.com</p>
                <p className="text-text-secondary">Password: admin123</p>
              </div>
              <div className="bg-background rounded p-2 border border-accent-200">
                <p className="font-medium text-text-primary">User Access:</p>
                <p className="text-text-secondary">Email: user@flashnews.com</p>
                <p className="text-text-secondary">Password: user123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-overlay">
          <div className="bg-background rounded-lg p-6 shadow-modal flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <span className="text-text-primary font-medium">Signing you in...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
