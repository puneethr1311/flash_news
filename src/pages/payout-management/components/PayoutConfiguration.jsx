import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PayoutConfiguration = ({ creator, onRateUpdate }) => {
  const [baseRate, setBaseRate] = useState(creator.currentRate);
  const [bonusRate, setBonusRate] = useState(creator.performanceBonus);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setBaseRate(creator.currentRate);
    setBonusRate(creator.performanceBonus);
    setHasChanges(false);
  }, [creator]);

  useEffect(() => {
    const hasRateChanges = baseRate !== creator.currentRate || bonusRate !== creator.performanceBonus;
    setHasChanges(hasRateChanges);
  }, [baseRate, bonusRate, creator]);

  const mockEarningsData = [
    { month: 'Jul', earnings: 450, articles: 9 },
    { month: 'Aug', earnings: 520, articles: 10 },
    { month: 'Sep', earnings: 380, articles: 8 },
    { month: 'Oct', earnings: 640, articles: 12 },
    { month: 'Nov', earnings: 590, articles: 11 },
    { month: 'Dec', earnings: 720, articles: 14 }
  ];

  const mockContentTypeData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Business', value: 25, color: '#10b981' },
    { name: 'Health', value: 20, color: '#f59e0b' },
    { name: 'Lifestyle', value: 20, color: '#ef4444' }
  ];

  const calculateProjectedEarnings = () => {
    const effectiveRate = baseRate * (1 + bonusRate / 100);
    return creator.articleCount * effectiveRate;
  };

  const calculateRateImpact = () => {
    const currentEarnings = creator.totalEarnings;
    const projectedEarnings = calculateProjectedEarnings();
    const difference = projectedEarnings - currentEarnings;
    const percentageChange = ((difference / currentEarnings) * 100);
    return { difference, percentageChange };
  };

  const handleSaveChanges = () => {
    if (hasChanges) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpdate = () => {
    onRateUpdate(creator.id, baseRate, bonusRate);
    setShowConfirmation(false);
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    setBaseRate(creator.currentRate);
    setBonusRate(creator.performanceBonus);
    setHasChanges(false);
  };

  const rateImpact = calculateRateImpact();

  return (
    <div className="space-y-6">
      {/* Creator Profile Header */}
      <div className="bg-surface rounded-lg border border-secondary-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-text-primary">{creator.name}</h2>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                creator.status === 'active' ?'bg-success-100 text-success-600' :'bg-secondary-100 text-secondary-600'
              }`}>
                {creator.status}
              </span>
            </div>
            <p className="text-text-secondary mb-3">{creator.email}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Articles</span>
                <p className="font-medium text-text-primary">{creator.articleCount}</p>
              </div>
              <div>
                <span className="text-text-muted">Total Earnings</span>
                <p className="font-medium text-text-primary">${creator.totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-text-muted">Join Date</span>
                <p className="font-medium text-text-primary">{new Date(creator.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-text-muted">Last Payment</span>
                <p className="font-medium text-text-primary">{new Date(creator.lastPayment).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Configuration */}
      <div className="bg-surface rounded-lg border border-secondary-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Rate Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Rate */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Base Rate (per article)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">$</span>
              <input
                type="number"
                value={baseRate}
                onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="1000"
                step="5"
                className="w-full pl-8 pr-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">Minimum: $10, Maximum: $1000</p>
          </div>

          {/* Performance Bonus */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Performance Bonus
            </label>
            <div className="relative">
              <input
                type="number"
                value={bonusRate}
                onChange={(e) => setBonusRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="50"
                step="1"
                className="w-full pr-8 pl-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">%</span>
            </div>
            <p className="text-xs text-text-muted mt-1">Additional percentage based on performance</p>
          </div>
        </div>

        {/* Rate Preview */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="font-medium text-text-primary mb-3">Rate Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Effective Rate</span>
              <p className="font-medium text-text-primary">
                ${(baseRate * (1 + bonusRate / 100)).toFixed(2)} per article
              </p>
            </div>
            <div>
              <span className="text-text-muted">Projected Monthly</span>
              <p className="font-medium text-text-primary">
                ${(calculateProjectedEarnings() / 6).toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-text-muted">Impact</span>
              <p className={`font-medium ${rateImpact.difference >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                {rateImpact.difference >= 0 ? '+' : ''}${rateImpact.difference.toFixed(2)} 
                ({rateImpact.percentageChange >= 0 ? '+' : ''}{rateImpact.percentageChange.toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              onClick={handleResetChanges}
              className="px-4 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-button"
            >
              Reset Changes
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-button"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-surface rounded-lg border border-secondary-200 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Earnings Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockEarningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Type Distribution */}
        <div className="bg-surface rounded-lg border border-secondary-200 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Content Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockContentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockContentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {mockContentTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Types */}
      <div className="bg-surface rounded-lg border border-secondary-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Content Categories</h3>
        <div className="flex flex-wrap gap-2">
          {creator.contentTypes.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900 bg-opacity-50">
          <div className="bg-background rounded-lg shadow-modal max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Confirm Rate Update</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to update the payout rates for {creator.name}? This will affect future earnings calculations.
            </p>

            <div className="bg-surface rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Base Rate:</span>
                  <span className="text-text-primary">${creator.currentRate} → ${baseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Performance Bonus:</span>
                  <span className="text-text-primary">{creator.performanceBonus}% → {bonusRate}%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-muted">Effective Rate:</span>
                  <span className="text-text-primary">
                    ${(creator.currentRate * (1 + creator.performanceBonus / 100)).toFixed(2)} → 
                    ${(baseRate * (1 + bonusRate / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-button"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-button"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutConfiguration;