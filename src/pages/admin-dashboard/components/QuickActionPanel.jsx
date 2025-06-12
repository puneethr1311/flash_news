import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'configure-payouts',
      title: 'Configure Payouts',
      description: 'Set payout rates and rules',
      icon: 'Settings',
      color: 'primary',
      urgent: false
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Export financial data',
      icon: 'FileText',
      color: 'accent',
      urgent: false
    },
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'User administration',
      icon: 'Users',
      color: 'success',
      urgent: false
    },
    {
      id: 'content-moderation',
      title: 'Content Review',
      description: '3 items pending review',
      icon: 'Flag',
      color: 'warning',
      urgent: true
    }
  ];

  const getColorClasses = (color, urgent = false) => {
    const baseClasses = urgent 
      ? 'border-warning-200 bg-warning-50 hover:bg-warning-100' :'border-secondary-200 bg-background hover:bg-surface';
    
    const iconColorMap = {
      primary: 'text-primary-600',
      accent: 'text-accent-600',
      success: 'text-success-500',
      warning: 'text-warning-500'
    };

    return {
      card: baseClasses,
      icon: iconColorMap[color] || iconColorMap.primary
    };
  };

  return (
    <div className="bg-background border border-secondary-200 rounded-lg p-4 lg:p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={16} className="text-text-muted" />
      </div>
      
      <div className="space-y-3">
        {quickActions.map((action) => {
          const colors = getColorClasses(action.color, action.urgent);
          
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={`w-full text-left p-4 border rounded-lg transition-button focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${colors.card}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 ${action.urgent ? 'bg-warning-100' : ''}`}>
                  <Icon name={action.icon} size={20} className={colors.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary text-sm">
                      {action.title}
                    </h4>
                    {action.urgent && (
                      <span className="w-2 h-2 bg-warning-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-text-secondary text-xs mt-1">
                    {action.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0" />
              </div>
            </button>
          );
        })}
      </div>

      {/* System Health Indicator */}
      <div className="mt-6 pt-4 border-t border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-text-primary">System Status</span>
          </div>
          <span className="text-sm text-success">All systems operational</span>
        </div>
        <div className="mt-2 text-xs text-text-secondary">
          Last checked: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;