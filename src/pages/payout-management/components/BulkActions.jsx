import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ 
  selectedCreators, 
  creators, 
  onRateUpdate, 
  onPaymentProcess, 
  onClearSelection 
}) => {
  const [showRateModal, setShowRateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bulkRate, setBulkRate] = useState(50);
  const [bulkBonus, setBulkBonus] = useState(10);

  const selectedCreatorData = creators.filter(creator => 
    selectedCreators.includes(creator.id)
  );

  const totalSelectedEarnings = selectedCreatorData.reduce(
    (sum, creator) => sum + creator.totalEarnings, 0
  );

  const handleBulkRateUpdate = () => {
    onRateUpdate(bulkRate, bulkBonus);
    setShowRateModal(false);
    setBulkRate(50);
    setBulkBonus(10);
  };

  const handleBulkPayment = () => {
    onPaymentProcess(selectedCreators);
    setShowPaymentModal(false);
  };

  return (
    <>
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary-600" />
              <span className="font-medium text-primary-700">
                {selectedCreators.length} creator{selectedCreators.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="text-sm text-primary-600">
              Total earnings: ${totalSelectedEarnings.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRateModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-button text-sm"
            >
              <Icon name="DollarSign" size={16} />
              <span>Update Rates</span>
            </button>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-button text-sm"
            >
              <Icon name="CreditCard" size={16} />
              <span>Process Payment</span>
            </button>

            <button
              onClick={onClearSelection}
              className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-button text-sm"
            >
              <Icon name="X" size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Selected Creators Preview */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCreatorData.slice(0, 5).map((creator) => (
            <div
              key={creator.id}
              className="flex items-center space-x-2 bg-background rounded-full px-3 py-1 text-sm"
            >
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-600">
                  {creator.name.charAt(0)}
                </span>
              </div>
              <span className="text-text-primary">{creator.name}</span>
            </div>
          ))}
          {selectedCreatorData.length > 5 && (
            <div className="flex items-center space-x-2 bg-background rounded-full px-3 py-1 text-sm">
              <span className="text-text-secondary">
                +{selectedCreatorData.length - 5} more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Rate Update Modal */}
      {showRateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900 bg-opacity-50">
          <div className="bg-background rounded-lg shadow-modal max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="DollarSign" size={20} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Bulk Rate Update</h3>
            </div>

            <p className="text-text-secondary mb-6">
              Update payout rates for {selectedCreators.length} selected creator{selectedCreators.length !== 1 ? 's' : ''}. 
              This will affect future earnings calculations.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Base Rate (per article)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">$</span>
                  <input
                    type="number"
                    value={bulkRate}
                    onChange={(e) => setBulkRate(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="1000"
                    step="5"
                    className="w-full pl-8 pr-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Performance Bonus
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={bulkBonus}
                    onChange={(e) => setBulkBonus(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="50"
                    step="1"
                    className="w-full pr-8 pl-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">%</span>
                </div>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <div className="text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-text-muted">Effective Rate:</span>
                    <span className="font-medium text-text-primary">
                      ${(bulkRate * (1 + bulkBonus / 100)).toFixed(2)} per article
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Creators Affected:</span>
                    <span className="font-medium text-text-primary">{selectedCreators.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowRateModal(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-button"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkRateUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-button"
              >
                Update Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900 bg-opacity-50">
          <div className="bg-background rounded-lg shadow-modal max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Process Bulk Payment</h3>
            </div>

            <p className="text-text-secondary mb-6">
              Process payments for {selectedCreators.length} selected creator{selectedCreators.length !== 1 ? 's' : ''}. 
              This action cannot be undone.
            </p>

            <div className="bg-surface rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Total Amount:</span>
                  <span className="font-medium text-text-primary">${totalSelectedEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Processing Fee:</span>
                  <span className="font-medium text-text-primary">$0.00</span>
                </div>
                <div className="flex justify-between border-t border-secondary-200 pt-2 font-medium">
                  <span className="text-text-primary">Net Amount:</span>
                  <span className="text-text-primary">${totalSelectedEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning-700">Important Notice</p>
                  <p className="text-warning-600 mt-1">
                    Payments will be processed immediately and cannot be reversed. 
                    Please verify all details before confirming.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-button"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkPayment}
                className="px-4 py-2 text-sm font-medium text-white bg-success-600 rounded-lg hover:bg-success-700 transition-button"
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;