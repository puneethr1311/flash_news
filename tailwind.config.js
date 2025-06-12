/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1e40af', // Deep blue (primary) - blue-700
        'primary-50': '#eff6ff', // Very light blue - blue-50
        'primary-100': '#dbeafe', // Light blue - blue-100
        'primary-500': '#3b82f6', // Medium blue - blue-500
        'primary-600': '#2563eb', // Darker blue - blue-600
        'primary-800': '#1e3a8a', // Very dark blue - blue-800
        
        // Secondary Colors
        'secondary': '#64748b', // Balanced slate gray - slate-500
        'secondary-100': '#f1f5f9', // Light slate - slate-100
        'secondary-200': '#e2e8f0', // Light slate - slate-200
        'secondary-300': '#cbd5e1', // Medium light slate - slate-300
        'secondary-400': '#94a3b8', // Medium slate - slate-400
        'secondary-600': '#475569', // Dark slate - slate-600
        'secondary-700': '#334155', // Darker slate - slate-700
        'secondary-800': '#1e293b', // Very dark slate - slate-800
        'secondary-900': '#0f172a', // Near black slate - slate-900
        
        // Accent Colors
        'accent': '#0ea5e9', // Bright sky blue - sky-500
        'accent-100': '#e0f2fe', // Light sky blue - sky-100
        'accent-200': '#bae6fd', // Light sky blue - sky-200
        'accent-600': '#0284c7', // Darker sky blue - sky-600
        
        // Background Colors
        'background': '#ffffff', // Pure white - white
        'surface': '#f8fafc', // Subtle off-white - slate-50
        'surface-100': '#f1f5f9', // Light surface - slate-100
        
        // Text Colors
        'text-primary': '#0f172a', // Near-black slate - slate-900
        'text-secondary': '#475569', // Medium gray - slate-600
        'text-muted': '#64748b', // Muted gray - slate-500
        'text-light': '#94a3b8', // Light gray - slate-400
        
        // Status Colors
        'success': '#059669', // Professional green - emerald-600
        'success-100': '#d1fae5', // Light green - emerald-100
        'success-500': '#10b981', // Medium green - emerald-500
        
        'warning': '#d97706', // Amber orange - amber-600
        'warning-100': '#fef3c7', // Light amber - amber-100
        'warning-500': '#f59e0b', // Medium amber - amber-500
        
        'error': '#dc2626', // Clear red - red-600
        'error-100': '#fee2e2', // Light red - red-100
        'error-500': '#ef4444', // Medium red - red-500
        
        // Dark mode colors
        'dark-background': '#0f172a', // Dark background - slate-900
        'dark-surface': '#1e293b', // Dark surface - slate-800
        'dark-surface-light': '#334155', // Light dark surface - slate-700
        'dark-border': '#374151', // Dark border - gray-700
        'dark-text-primary': '#f8fafc', // Light text on dark - slate-50
        'dark-text-secondary': '#cbd5e1', // Secondary text on dark - slate-300
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'navigation': '1000',
        'dropdown': '1100',
        'overlay': '1200',
        'modal': '1300',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'modal': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-down': 'slideDown 300ms ease-in-out',
        'slide-up': 'slideUp 300ms ease-in-out',
        'slide-in-right': 'slideInRight 300ms ease-out',
        'slide-out-right': 'slideOutRight 300ms ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}