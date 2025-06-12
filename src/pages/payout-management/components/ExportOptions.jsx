import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportOptions = ({ dateRange, creators, payoutHistory }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    setShowExportMenu(false);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    switch (format) {
      case 'pdf': console.log('Exporting PDF report...');
        // Mock PDF generation
        break;
      case 'csv': console.log('Exporting CSV data...');
        // Mock CSV generation
        break;
      case 'sheets': console.log('Exporting to Google Sheets...');
        // Mock Google Sheets integration
        break;
      default:
        break;
    }

    setIsExporting(false);
  };

  const exportOptions = [
    {
      id: 'pdf',
      label: 'PDF Report',
      description: 'Comprehensive financial report',
      icon: 'FileText',
      color: 'text-error-600'
    },
    {
      id: 'csv',
      label: 'CSV Data',
      description: 'Raw data for analysis',
      icon: 'Table',
      color: 'text-success-600'
    },
    {
      id: 'sheets',
      label: 'Google Sheets',
      description: 'Live collaborative document',
      icon: 'Sheet',
      color: 'text-accent-600'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportMenu(!showExportMenu)}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-button disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Icon name="ChevronDown" size={16} />
          </>
        )}
      </button>

      {showExportMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-modal border border-secondary-200 py-2 z-50 animate-slide-down">
          <div className="px-4 py-2 border-b border-secondary-200">
            <h3 className="font-medium text-text-primary">Export Options</h3>
            <p className="text-xs text-text-secondary mt-1">
              Data from {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="py-2">
            {exportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleExport(option.id)}
                className="w-full text-left px-4 py-3 hover:bg-surface transition-button flex items-start space-x-3"
              >
                <Icon name={option.icon} size={20} className={option.color} />
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{option.label}</div>
                  <div className="text-xs text-text-secondary">{option.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="px-4 py-2 border-t border-secondary-200">
            <div className="text-xs text-text-muted">
              <div className="flex justify-between mb-1">
                <span>Creators:</span>
                <span>{creators.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Records:</span>
                <span>{payoutHistory.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
};

export default ExportOptions;