import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, trend, icon, color }) => {
  const getColorClasses = (colorName) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-100',
        icon: 'text-primary-600',
        trend: trend === 'up' ? 'text-success' : 'text-error'
      },
      success: {
        bg: 'bg-success-100',
        icon: 'text-success-500',
        trend: trend === 'up' ? 'text-success' : 'text-error'
      },
      accent: {
        bg: 'bg-accent-100',
        icon: 'text-accent-600',
        trend: trend === 'up' ? 'text-success' : 'text-error'
      },
      warning: {
        bg: 'bg-warning-100',
        icon: 'text-warning-500',
        trend: trend === 'up' ? 'text-success' : 'text-error'
      }
    };
    return colorMap[colorName] || colorMap.primary;
  };

  const colors = getColorClasses(color);

  return (
    <div className="bg-background border border-secondary-200 rounded-lg p-4 lg:p-6 shadow-card transition-theme hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colors.icon} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${colors.trend}`}>
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
          />
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
          {value}
        </h3>
        <p className="text-text-secondary text-sm font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default KPICard;