import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const getFieldClassName = (fieldName) => {
    const baseClasses = "w-full pl-12 pr-4 py-3 border rounded-lg text-sm transition-button focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent";
    
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-error bg-error-50 text-error`;
    }
    
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClasses} border-success bg-success-50`;
    }
    
    return `${baseClasses} border-secondary-200 bg-surface focus:bg-background`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <Icon 
            name="Mail" 
            size={18} 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              errors.email && touched.email ? 'text-error' : 'text-text-muted'
            }`}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName('email')}
            placeholder="Enter your email address"
            disabled={isLoading}
            autoComplete="email"
          />
          {touched.email && !errors.email && formData.email && (
            <Icon 
              name="Check" 
              size={18} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-success"
            />
          )}
        </div>
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={18} 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              errors.password && touched.password ? 'text-error' : 'text-text-muted'
            }`}
          />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClassName('password')}
            placeholder="Enter your password"
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
        {errors.password && touched.password && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || Object.keys(errors).some(key => errors[key])}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium transition-button hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin">
              <Icon name="Loader2" size={20} />
            </div>
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;