import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';

import CreatorDirectory from './components/CreatorDirectory';
import PayoutConfiguration from './components/PayoutConfiguration';
import PayoutHistory from './components/PayoutHistory';
import ExportOptions from './components/ExportOptions';
import BulkActions from './components/BulkActions';

const PayoutManagement = () => {
  const navigate = useNavigate();
  const [user] = useState({
    id: 1,
    name: "Admin User",
    email: "admin@newshub.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const mockCreators = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      articleCount: 45,
      totalEarnings: 2250.00,
      currentRate: 50.00,
      status: "active",
      joinDate: "2023-01-15",
      lastPayment: "2024-01-15",
      contentTypes: ["Technology", "Business"],
      performanceBonus: 15,
      paymentStatus: "paid"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      articleCount: 32,
      totalEarnings: 1920.00,
      currentRate: 60.00,
      status: "active",
      joinDate: "2023-03-20",
      lastPayment: "2024-01-15",
      contentTypes: ["Health", "Lifestyle"],
      performanceBonus: 20,
      paymentStatus: "pending"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      articleCount: 28,
      totalEarnings: 1540.00,
      currentRate: 55.00,
      status: "active",
      joinDate: "2023-02-10",
      lastPayment: "2024-01-10",
      contentTypes: ["Travel", "Food"],
      performanceBonus: 10,
      paymentStatus: "paid"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      articleCount: 52,
      totalEarnings: 3120.00,
      currentRate: 60.00,
      status: "active",
      joinDate: "2022-11-05",
      lastPayment: "2024-01-15",
      contentTypes: ["Sports", "Entertainment"],
      performanceBonus: 25,
      paymentStatus: "processing"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      articleCount: 38,
      totalEarnings: 2090.00,
      currentRate: 55.00,
      status: "inactive",
      joinDate: "2023-04-12",
      lastPayment: "2023-12-15",
      contentTypes: ["Finance", "Business"],
      performanceBonus: 12,
      paymentStatus: "overdue"
    }
  ];

  const mockPayoutHistory = [
    {
      id: 1,
      creatorId: 1,
      creatorName: "Sarah Johnson",
      period: "January 2024",
      articleCount: 12,
      baseRate: 50.00,
      bonusRate: 15,
      totalEarnings: 690.00,
      paymentDate: "2024-01-15",
      status: "paid",
      transactionId: "TXN-2024-001"
    },
    {
      id: 2,
      creatorId: 2,
      creatorName: "Michael Chen",
      period: "January 2024",
      articleCount: 8,
      baseRate: 60.00,
      bonusRate: 20,
      totalEarnings: 576.00,
      paymentDate: "2024-01-15",
      status: "pending",
      transactionId: "TXN-2024-002"
    },
    {
      id: 3,
      creatorId: 3,
      creatorName: "Emily Rodriguez",
      period: "January 2024",
      articleCount: 10,
      baseRate: 55.00,
      bonusRate: 10,
      totalEarnings: 605.00,
      paymentDate: "2024-01-10",
      status: "paid",
      transactionId: "TXN-2024-003"
    },
    {
      id: 4,
      creatorId: 4,
      creatorName: "David Thompson",
      period: "January 2024",
      articleCount: 15,
      baseRate: 60.00,
      bonusRate: 25,
      totalEarnings: 1125.00,
      paymentDate: "2024-01-15",
      status: "processing",
      transactionId: "TXN-2024-004"
    },
    {
      id: 5,
      creatorId: 5,
      creatorName: "Lisa Wang",
      period: "December 2023",
      articleCount: 6,
      baseRate: 55.00,
      bonusRate: 12,
      totalEarnings: 369.60,
      paymentDate: "2023-12-15",
      status: "overdue",
      transactionId: "TXN-2023-045"
    }
  ];

  const [creators, setCreators] = useState(mockCreators);
  const [payoutHistory, setPayoutHistory] = useState(mockPayoutHistory);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/news-dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedCreators.length > 0) {
      setShowBulkActions(true);
    } else {
      setShowBulkActions(false);
    }
  }, [selectedCreators]);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleCreatorSelect = (creator) => {
    setSelectedCreator(creator);
  };

  const handleCreatorSelection = (creatorIds) => {
    setSelectedCreators(creatorIds);
  };

  const handleRateUpdate = (creatorId, newRate, bonusRate) => {
    setCreators(prev => prev.map(creator => 
      creator.id === creatorId 
        ? { ...creator, currentRate: newRate, performanceBonus: bonusRate }
        : creator
    ));
    
    if (selectedCreator && selectedCreator.id === creatorId) {
      setSelectedCreator(prev => ({ 
        ...prev, 
        currentRate: newRate, 
        performanceBonus: bonusRate 
      }));
    }
  };

  const handleBulkRateUpdate = (rate, bonusRate) => {
    setCreators(prev => prev.map(creator => 
      selectedCreators.includes(creator.id)
        ? { ...creator, currentRate: rate, performanceBonus: bonusRate }
        : creator
    ));
    setSelectedCreators([]);
  };

  const handlePaymentProcess = (creatorIds) => {
    const updatedHistory = payoutHistory.map(payout => 
      creatorIds.includes(payout.creatorId) && payout.status === 'pending'
        ? { ...payout, status: 'processing', paymentDate: new Date().toISOString().split('T')[0] }
        : payout
    );
    setPayoutHistory(updatedHistory);
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || creator.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalEarnings = creators.reduce((sum, creator) => sum + creator.totalEarnings, 0);
  const activeCreators = creators.filter(creator => creator.status === 'active').length;
  const pendingPayments = payoutHistory.filter(payout => payout.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <AdminSidebar 
        user={user} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">Payout Management</h1>
                <p className="text-text-secondary mt-1">Configure creator compensation and manage financial reports</p>
              </div>
              <div className="flex items-center space-x-4">
                <ExportOptions 
                  dateRange={dateRange}
                  creators={filteredCreators}
                  payoutHistory={payoutHistory}
                />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-surface rounded-lg p-6 border border-secondary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Earnings</p>
                    <p className="text-2xl font-bold text-text-primary">${totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <Icon name="DollarSign" size={24} className="text-success-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Icon name="TrendingUp" size={16} className="text-success-500 mr-1" />
                  <span className="text-success-600">+12.5% from last month</span>
                </div>
              </div>

              <div className="bg-surface rounded-lg p-6 border border-secondary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Active Creators</p>
                    <p className="text-2xl font-bold text-text-primary">{activeCreators}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Icon name="UserPlus" size={16} className="text-primary-500 mr-1" />
                  <span className="text-primary-600">3 new this month</span>
                </div>
              </div>

              <div className="bg-surface rounded-lg p-6 border border-secondary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Pending Payments</p>
                    <p className="text-2xl font-bold text-text-primary">{pendingPayments}</p>
                  </div>
                  <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-warning-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Icon name="AlertCircle" size={16} className="text-warning-500 mr-1" />
                  <span className="text-warning-600">Requires attention</span>
                </div>
              </div>

              <div className="bg-surface rounded-lg p-6 border border-secondary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Avg. Rate</p>
                    <p className="text-2xl font-bold text-text-primary">
                      ${(creators.reduce((sum, c) => sum + c.currentRate, 0) / creators.length).toFixed(0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={24} className="text-accent-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Icon name="TrendingUp" size={16} className="text-accent-500 mr-1" />
                  <span className="text-accent-600">Per article rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <BulkActions
              selectedCreators={selectedCreators}
              creators={creators}
              onRateUpdate={handleBulkRateUpdate}
              onPaymentProcess={handlePaymentProcess}
              onClearSelection={() => setSelectedCreators([])}
            />
          )}

          {/* Main Content - Dual Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel - Creator Directory (40%) */}
            <div className="lg:col-span-2">
              <CreatorDirectory
                creators={filteredCreators}
                selectedCreators={selectedCreators}
                selectedCreator={selectedCreator}
                searchTerm={searchTerm}
                filterStatus={filterStatus}
                onCreatorSelect={handleCreatorSelect}
                onCreatorSelection={handleCreatorSelection}
                onSearchChange={setSearchTerm}
                onFilterChange={setFilterStatus}
              />
            </div>

            {/* Right Panel - Payout Configuration (60%) */}
            <div className="lg:col-span-3">
              {selectedCreator ? (
                <PayoutConfiguration
                  creator={selectedCreator}
                  onRateUpdate={handleRateUpdate}
                />
              ) : (
                <div className="bg-surface rounded-lg border border-secondary-200 p-8 text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="UserCheck" size={32} className="text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">Select a Creator</h3>
                  <p className="text-text-secondary">
                    Choose a creator from the directory to configure their payout rates and view detailed analytics.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payout History Table */}
          <div className="mt-8">
            <PayoutHistory
              payoutHistory={payoutHistory}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayoutManagement;