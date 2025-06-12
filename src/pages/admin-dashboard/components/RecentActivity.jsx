import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    const iconMap = {
      user_registration: 'UserPlus',
      content_published: 'FileText',
      payout_processed: 'CreditCard',
      system_alert: 'AlertTriangle',
      content_moderation: 'Flag'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (color) => {
    const colorMap = {
      success: 'text-success bg-success-100',
      primary: 'text-primary-600 bg-primary-100',
      accent: 'text-accent-600 bg-accent-100',
      warning: 'text-warning-500 bg-warning-100',
      error: 'text-error bg-error-100'
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'user_registration', label: 'User Events' },
    { value: 'content_published', label: 'Content' },
    { value: 'payout_processed', label: 'Payouts' },
    { value: 'system_alert', label: 'System' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  return (
    <div className="bg-background border border-secondary-200 rounded-lg p-4 lg:p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs border border-secondary-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="Filter" size={14} className="text-text-muted" />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface transition-button">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.color)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary font-medium leading-relaxed">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-text-muted">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  <span className="w-1 h-1 bg-text-muted rounded-full"></span>
                  <span className="text-xs text-text-muted capitalize">
                    {activity.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-muted text-sm">No activities found for selected filter</p>
          </div>
        )}
      </div>

      {/* Activity Summary */}
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-text-primary">
              {activities.length}
            </div>
            <div className="text-xs text-text-secondary">
              Total Events
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">
              {activities.filter(a => a.timestamp > new Date(Date.now() - 3600000)).length}
            </div>
            <div className="text-xs text-text-secondary">
              Last Hour
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;