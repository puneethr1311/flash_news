import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import KPICard from './components/KPICard';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActionPanel from './components/QuickActionPanel';
import RecentActivity from './components/RecentActivity';
import DataTable from './components/DataTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [isExporting, setIsExporting] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Mock admin user data
  const adminUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.admin@newshub.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  };

  // Mock KPI data
  const kpiData = [
    {
      title: "Total Articles",
      value: "12,847",
      change: "+8.2%",
      trend: "up",
      icon: "FileText",
      color: "primary"
    },
    {
      title: "Active Users",
      value: "3,421",
      change: "+12.5%",
      trend: "up",
      icon: "Users",
      color: "success"
    },
    {
      title: "Monthly Revenue",
      value: "$24,680",
      change: "+5.7%",
      trend: "up",
      icon: "DollarSign",
      color: "accent"
    },
    {
      title: "Pending Payouts",
      value: "$8,420",
      change: "-2.1%",
      trend: "down",
      icon: "CreditCard",
      color: "warning"
    }
  ];

  // Mock chart data
  const chartData = {
    userEngagement: [
      { name: 'Mon', users: 2400, articles: 1200 },
      { name: 'Tue', users: 1398, articles: 980 },
      { name: 'Wed', users: 9800, articles: 2100 },
      { name: 'Thu', users: 3908, articles: 1800 },
      { name: 'Fri', users: 4800, articles: 2400 },
      { name: 'Sat', users: 3800, articles: 1600 },
      { name: 'Sun', users: 4300, articles: 1900 }
    ],
    contentPerformance: [
      { name: 'Technology', value: 35, color: '#3b82f6' },
      { name: 'Business', value: 25, color: '#10b981' },
      { name: 'Sports', value: 20, color: '#f59e0b' },
      { name: 'Entertainment', value: 12, color: '#ef4444' },
      { name: 'Politics', value: 8, color: '#8b5cf6' }
    ],
    revenue: [
      { month: 'Jan', revenue: 18000, payouts: 12000 },
      { month: 'Feb', revenue: 22000, payouts: 15000 },
      { month: 'Mar', revenue: 19000, payouts: 13500 },
      { month: 'Apr', revenue: 25000, payouts: 17000 },
      { month: 'May', revenue: 28000, payouts: 19000 },
      { month: 'Jun', revenue: 24680, payouts: 16800 }
    ]
  };

  // Mock recent activity data
  const recentActivities = [
    {
      id: 1,
      type: "user_registration",
      message: "New user registered: john.doe@email.com",
      timestamp: new Date(Date.now() - 300000),
      icon: "UserPlus",
      color: "success"
    },
    {
      id: 2,
      type: "content_published",
      message: "Article published: \'AI Revolution in Healthcare'",
      timestamp: new Date(Date.now() - 600000),
      icon: "FileText",
      color: "primary"
    },
    {
      id: 3,
      type: "payout_processed",
      message: "Payout processed: $1,250 to author Mike Chen",
      timestamp: new Date(Date.now() - 900000),
      icon: "CreditCard",
      color: "accent"
    },
    {
      id: 4,
      type: "system_alert",
      message: "High server load detected - Auto-scaling initiated",
      timestamp: new Date(Date.now() - 1200000),
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      id: 5,
      type: "content_moderation",
      message: "Content flagged for review: \'Breaking News Update'",
      timestamp: new Date(Date.now() - 1500000),
      icon: "Flag",
      color: "error"
    }
  ];

  // Mock data table data
  const tableData = [
    {
      id: 1,
      author: "John Smith",
      articles: 24,
      views: 45600,
      earnings: 1240.50,
      status: "active",
      lastActive: "2024-01-15"
    },
    {
      id: 2,
      author: "Emma Wilson",
      articles: 18,
      views: 32100,
      earnings: 890.25,
      status: "active",
      lastActive: "2024-01-14"
    },
    {
      id: 3,
      author: "Mike Chen",
      articles: 31,
      views: 67800,
      earnings: 1850.75,
      status: "pending",
      lastActive: "2024-01-13"
    },
    {
      id: 4,
      author: "Sarah Davis",
      articles: 15,
      views: 28900,
      earnings: 720.00,
      status: "active",
      lastActive: "2024-01-12"
    },
    {
      id: 5,
      author: "Alex Rodriguez",
      articles: 22,
      views: 41200,
      earnings: 1120.30,
      status: "inactive",
      lastActive: "2024-01-10"
    }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: "System health check completed successfully",
        type: "info",
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = async (format) => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Exporting data in ${format} format...`);
    setIsExporting(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'configure-payouts': navigate('/payout-management');
        break;
      case 'generate-reports': handleExport('pdf');
        break;
      case 'manage-users': console.log('Opening user management...');
        break;
      case 'content-moderation': console.log('Opening content moderation...');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} onLogout={handleLogout} />
      <AdminSidebar 
        user={adminUser} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  Admin Dashboard
                </h1>
                <p className="text-text-secondary mt-1">
                  Comprehensive oversight and analytics for NewsHub platform
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                {/* Date Range Selector */}
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="px-3 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                
                {/* Export Button */}
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={isExporting}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-button hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isExporting ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Download" size={16} />
                      <span>Export</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Notifications */}
          {notifications.length > 0 && (
            <div className="mb-6">
              <div className="bg-accent-100 border border-accent-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Bell" size={16} className="text-accent-600" />
                  <span className="text-sm font-medium text-accent-600">Recent System Activity</span>
                </div>
                <p className="text-sm text-text-secondary">
                  {notifications[0]?.message}
                </p>
              </div>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AnalyticsChart
              title="User Engagement Trends"
              type="line"
              data={chartData.userEngagement}
              dateRange={selectedDateRange}
            />
            <AnalyticsChart
              title="Content Performance"
              type="pie"
              data={chartData.contentPerformance}
              dateRange={selectedDateRange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <AnalyticsChart
                title="Revenue & Payouts"
                type="bar"
                data={chartData.revenue}
                dateRange={selectedDateRange}
              />
            </div>

            {/* Quick Actions Panel */}
            <QuickActionPanel onAction={handleQuickAction} />
          </div>

          {/* Recent Activity and Data Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <RecentActivity activities={recentActivities} />
            </div>

            {/* Data Table */}
            <div className="lg:col-span-2">
              <DataTable
                title="Top Content Creators"
                data={tableData}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;