import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PayoutHistory = ({ payoutHistory, dateRange, onDateRangeChange }) => {
  const [sortField, setSortField] = useState('paymentDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-600';
      case 'pending':
        return 'bg-warning-100 text-warning-600';
      case 'processing':
        return 'bg-accent-100 text-accent-600';
      case 'overdue':
        return 'bg-error-100 text-error-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  const filteredHistory = payoutHistory.filter(payout => {
    const matchesStatus = filterStatus === 'all' || payout.status === filterStatus;
    const paymentDate = new Date(payout.paymentDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const matchesDateRange = paymentDate >= startDate && paymentDate <= endDate;
    return matchesStatus && matchesDateRange;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'paymentDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = sortedHistory.slice(startIndex, startIndex + itemsPerPage);

  const totalEarnings = filteredHistory.reduce((sum, payout) => sum + payout.totalEarnings, 0);
  const totalArticles = filteredHistory.reduce((sum, payout) => sum + payout.articleCount, 0);

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortDirection === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary-600" />
      : <Icon name="ArrowDown" size={14} className="text-primary-600" />;
  };

  return (
    <div className="bg-surface rounded-lg border border-secondary-200">
      {/* Header */}
      <div className="p-6 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Payout History</h2>
          <div className="flex items-center space-x-4">
            {/* Date Range */}
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => onDateRangeChange({ ...dateRange, startDate: e.target.value })}
                className="px-3 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="text-text-muted">to</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => onDateRangeChange({ ...dateRange, endDate: e.target.value })}
                className="px-3 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Total Earnings</span>
            </div>
            <p className="text-xl font-bold text-primary-700 mt-1">${totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-accent-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} className="text-accent-600" />
              <span className="text-sm font-medium text-accent-600">Total Articles</span>
            </div>
            <p className="text-xl font-bold text-accent-700 mt-1">{totalArticles}</p>
          </div>
          <div className="bg-success-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-600">Avg. Rate</span>
            </div>
            <p className="text-xl font-bold text-success-700 mt-1">
              ${totalArticles > 0 ? (totalEarnings / totalArticles).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('creatorName')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Creator</span>
                  <SortIcon field="creatorName" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('period')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Period</span>
                  <SortIcon field="period" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('articleCount')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Articles</span>
                  <SortIcon field="articleCount" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('baseRate')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Rate</span>
                  <SortIcon field="baseRate" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('bonusRate')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Bonus</span>
                  <SortIcon field="bonusRate" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('totalEarnings')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Earnings</span>
                  <SortIcon field="totalEarnings" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('paymentDate')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Payment Date</span>
                  <SortIcon field="paymentDate" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors"
                >
                  <span>Status</span>
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {paginatedHistory.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center">
                  <Icon name="FileX" size={48} className="text-secondary-300 mx-auto mb-4" />
                  <p className="text-text-secondary">No payout records found</p>
                </td>
              </tr>
            ) : (
              paginatedHistory.map((payout) => (
                <tr key={payout.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{payout.creatorName}</div>
                    <div className="text-sm text-text-secondary">{payout.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">{payout.period}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{payout.articleCount}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">${payout.baseRate}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{payout.bonusRate}%</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    ${payout.totalEarnings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">
                    {new Date(payout.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-text-muted hover:text-primary-600 transition-colors"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      <button
                        className="p-1 text-text-muted hover:text-accent-600 transition-colors"
                        title="Download Receipt"
                      >
                        <Icon name="Download" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-secondary-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedHistory.length)} of {sortedHistory.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-button"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-button ${
                      currentPage === page
                        ? 'bg-primary text-white' :'text-text-secondary border border-secondary-200 hover:bg-secondary-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-button"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutHistory;