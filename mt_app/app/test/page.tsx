import React from 'react';
import RefreshButton from '../../components/RefreshButton';
import PostFeed from '../../components/PostFeed';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Social Feed
        </h1>
        
        {/* Refresh button to demo loading */}
        <RefreshButton />
        
        {/* Content */}
        <PostFeed />
      </div>
    </div>
  );
}