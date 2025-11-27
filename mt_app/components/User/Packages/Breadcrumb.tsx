import { 
  ShareIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const Breadcrumb = () => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const pageUrl = window.location.href; // Get current page URL
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy!', err);
      });
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 p-4 text-sm text-gray-600">
        <HomeIcon className="w-4 h-4" />
        <span className="text-gray-600">home</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-600">Medical Tourism Package</span>
        <span className="text-gray-400">›</span>
        <span className="text-teal-400">Package Details</span>

        <div className="ml-auto flex gap-4 relative">
          <button className="flex items-center gap-2 text-teal-500">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="text-xs font-bold">Ask</span>
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-2 text-teal-500"
              onClick={handleShareClick}
            >
              <ShareIcon className="w-5 h-5" />
              <span className="text-xs font-bold">Share</span>
            </button>
            {/* Tooltip */}
            {(copied) && (
              <div className="absolute -down-7 right-0 bg-green-500 text-white text-xs mt-2 px-2 py-1 rounded">
                Link copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
