import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DataTable = ({ title, data, onExport }) => {
  const [sortField, setSortField] = useState('earnings');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    const statusColors = {
      active: 'bg-success-100 text-success border-success-200',
      pending: 'bg-warning-100 text-warning-500 border-warning-200',
      inactive: 'bg-secondary-100 text-secondary-600 border-secondary-200'
    };
    return statusColors[status] || statusColors.active;
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary-600" 
      />
    );
  };

  return (
    <div className="bg-background border border-secondary-200 rounded-lg shadow-card">
      {/* Table Header */}
      <div className="p-4 lg:p-6 border-b border-secondary-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-text-primary mb-2 sm:mb-0">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onExport('csv')}
              className="px-3 py-2 text-sm border border-secondary-200 rounded-lg transition-button hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center space-x-2"
            >
              <Icon name="Download" size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => onExport('pdf')}
              className="px-3 py-2 text-sm bg-primary text-white rounded-lg transition-button hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center space-x-2"
            >
              <Icon name="FileText" size={14} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('author')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <span>Author</span>
                  <SortIcon field="author" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('articles')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <span>Articles</span>
                  <SortIcon field="articles" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('views')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <span>Views</span>
                  <SortIcon field="views" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('earnings')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <span>Earnings</span>
                  <SortIcon field="earnings" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-surface transition-colors">
                <td className="p-4">
                  <div className="font-medium text-text-primary">{row.author}</div>
                </td>
                <td className="p-4 text-text-secondary">{row.articles}</td>
                <td className="p-4 text-text-secondary">{row.views.toLocaleString()}</td>
                <td className="p-4">
                  <span className="font-medium text-text-primary">
                    ${row.earnings.toFixed(2)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(row.status)}`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-text-secondary text-sm">{row.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-secondary-200">
        {paginatedData.map((row) => (
          <div key={row.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-text-primary">{row.author}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(row.status)}`}>
                {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Articles:</span>
                <span className="ml-1 font-medium text-text-primary">{row.articles}</span>
              </div>
              <div>
                <span className="text-text-secondary">Views:</span>
                <span className="ml-1 font-medium text-text-primary">{row.views.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-text-secondary">Earnings:</span>
                <span className="ml-1 font-medium text-text-primary">${row.earnings.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-text-secondary">Last Active:</span>
                <span className="ml-1 font-medium text-text-primary">{row.lastActive}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-secondary-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-secondary-200 rounded-lg transition-button hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Icon name="ChevronLeft" size={14} />
                <span>Previous</span>
              </button>
              <span className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-secondary-200 rounded-lg transition-button hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <span>Next</span>
                <Icon name="ChevronRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;