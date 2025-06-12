import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = ({ user, isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/payout-management';

  const adminNavItems = [
    {
      label: 'Dashboard Overview',
      path: '/admin-dashboard',
      icon: 'BarChart3',
      description: 'Analytics and insights'
    },
    {
      label: 'Payout Management',
      path: '/payout-management',
      icon: 'CreditCard',
      description: 'Financial operations'
    },
  ];

  const quickActions = [
    {
      label: 'Export Data',
      icon: 'Download',
      action: 'export',
      description: 'Download reports'
    },
    {
      label: 'User Analytics',
      icon: 'Users',
      action: 'analytics',
      description: 'View user metrics'
    },
    {
      label: 'System Health',
      icon: 'Activity',
      action: 'health',
      description: 'Monitor system status'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'export':
        console.log('Exporting data...');
        break;
      case 'analytics': console.log('Opening analytics...');
        break;
      case 'health': console.log('Checking system health...');
        break;
      default:
        break;
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (!isAdmin || !isAdminPage) {
    return null;
  }

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-secondary-200 transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:block hidden`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="font-heading font-semibold text-text-primary">Administration</h2>
                <p className="text-sm text-text-secondary">System Management</p>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg transition-button hover:bg-secondary-100"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                Navigation
              </h3>
            )}
            {adminNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-button flex items-center ${
                  isCollapsed ? 'justify-center' : 'space-x-3'
                } ${
                  isActivePath(item.path)
                    ? 'bg-primary-100 text-primary-600 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon name={item.icon} size={20} />
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-text-muted">{item.description}</div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 space-y-1">
            {!isCollapsed && (
              <h3 className="px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                Quick Actions
              </h3>
            )}
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-button flex items-center ${
                  isCollapsed ? 'justify-center' : 'space-x-3'
                } text-text-secondary hover:text-text-primary hover:bg-secondary-100`}
                title={isCollapsed ? action.label : ''}
              >
                <Icon name={action.icon} size={18} />
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-text-muted">{action.description}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-secondary-200">
          {!isCollapsed ? (
            <div className="bg-accent-100 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={16} className="text-accent-600" />
                <span className="text-sm font-medium text-accent-600">Admin Access</span>
              </div>
              <p className="text-xs text-text-secondary">
                You have full administrative privileges for system management and financial operations.
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-accent-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;