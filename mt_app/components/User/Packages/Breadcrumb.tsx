import { 
  ShareIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';

const Breadcrumb = () => {
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
           <div className="ml-auto flex gap-4">
          <button className="flex items-center gap-2 text-teal-500">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="text-xs font-bold">Ask</span>
          </button>
          <button className="flex items-center gap-2 text-teal-500">
            <ShareIcon className="w-5 h-5" />
            <span className="text-xs font-bold">Share</span>
          </button>
            </div>
           </div>
    </div>
  )
}
export default Breadcrumb