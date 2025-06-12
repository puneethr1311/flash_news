import React from 'react';

const LoadingSkeleton = () => {
  const SkeletonCard = () => (
    <div className="bg-background border border-secondary-200 rounded-lg overflow-hidden shadow-card animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-secondary-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-5 bg-secondary-200 rounded-full w-20"></div>
          <div className="h-4 bg-secondary-200 rounded w-16"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2 mb-2">
          <div className="h-5 bg-secondary-200 rounded w-full"></div>
          <div className="h-5 bg-secondary-200 rounded w-3/4"></div>
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-secondary-200 rounded w-full"></div>
          <div className="h-4 bg-secondary-200 rounded w-full"></div>
          <div className="h-4 bg-secondary-200 rounded w-2/3"></div>
        </div>
        
        {/* Author & Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary-200 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-4 bg-secondary-200 rounded w-20"></div>
              <div className="h-3 bg-secondary-200 rounded w-16"></div>
            </div>
          </div>
          <div className="h-4 bg-secondary-200 rounded w-12"></div>
        </div>
        
        {/* Tags */}
        <div className="flex space-x-1 mt-3 pt-3 border-t border-secondary-200">
          <div className="h-6 bg-secondary-200 rounded-full w-12"></div>
          <div className="h-6 bg-secondary-200 rounded-full w-16"></div>
          <div className="h-6 bg-secondary-200 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="h-8 bg-secondary-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-5 bg-secondary-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="h-10 bg-secondary-200 rounded-lg w-32 animate-pulse"></div>
          <div className="h-10 bg-secondary-200 rounded-lg w-10 animate-pulse"></div>
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="mb-6 p-4 border border-secondary-200 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="h-8 bg-secondary-200 rounded-lg w-20 animate-pulse"></div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 bg-secondary-200 rounded-full w-20 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;