import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CreatorDirectory = ({
  creators,
  selectedCreators,
  selectedCreator,
  searchTerm,
  filterStatus,
  onCreatorSelect,
  onCreatorSelection,
  onSearchChange,
  onFilterChange
}) => {
  const handleCreatorClick = (creator) => {
    onCreatorSelect(creator);
  };

  const handleCheckboxChange = (creatorId) => {
    const isSelected = selectedCreators.includes(creatorId);
    if (isSelected) {
      onCreatorSelection(selectedCreators.filter(id => id !== creatorId));
    } else {
      onCreatorSelection([...selectedCreators, creatorId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCreators.length === creators.length) {
      onCreatorSelection([]);
    } else {
      onCreatorSelection(creators.map(creator => creator.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-600';
      case 'inactive':
        return 'bg-secondary-100 text-secondary-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getPaymentStatusColor = (status) => {
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

  return (
    <div className="bg-surface rounded-lg border border-secondary-200">
      {/* Header */}
      <div className="p-6 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Content Creators</h2>
          <span className="text-sm text-text-secondary">{creators.length} creators</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between">
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {creators.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              {selectedCreators.length === creators.length ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>
      </div>

      {/* Creator List */}
      <div className="max-h-96 overflow-y-auto">
        {creators.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="text-secondary-300 mx-auto mb-4" />
            <p className="text-text-secondary">No creators found</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                  selectedCreator?.id === creator.id
                    ? 'border-primary-200 bg-primary-50' :'border-transparent hover:border-secondary-200 hover:bg-secondary-50'
                }`}
                onClick={() => handleCreatorClick(creator)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCreators.includes(creator.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(creator.id);
                      }}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-text-primary truncate">
                        {creator.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(creator.status)}`}>
                        {creator.status}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary truncate mb-2">{creator.email}</p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-text-secondary">
                          {creator.articleCount} articles
                        </span>
                        <span className="text-text-secondary">
                          ${creator.currentRate}/article
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full ${getPaymentStatusColor(creator.paymentStatus)}`}>
                        {creator.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">
                        ${creator.totalEarnings.toLocaleString()}
                      </span>
                      <div className="flex items-center text-xs text-text-muted">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {new Date(creator.lastPayment).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDirectory;