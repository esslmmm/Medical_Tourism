import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  image: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {/* Author info */}
      <div className="flex items-center mb-4">
        <img 
          src={post.avatar} 
          alt={post.author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{post.author}</h3>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
      </div>
      
      {/* Image */}
      <img 
        src={post.image} 
        alt="Post image"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <span>👍</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
            <span>💬</span>
            <span>{post.comments}</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;