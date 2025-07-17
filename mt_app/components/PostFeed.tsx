'use client';

import React, { useState, useEffect } from 'react';
import SkeletonCard from './SkeletonCard';
import PostCard from './PostCard';

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

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API call
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data
      const mockPosts: Post[] = [
        {
          id: 1,
          title: "Beautiful sunset at the beach",
          content: "Had an amazing evening watching the sunset. The colors were absolutely breathtaking and I couldn't resist sharing this moment with everyone.",
          author: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5d4?w=100&h=100&fit=crop&crop=face",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          likes: 24,
          comments: 5
        },
        {
          id: 2,
          title: "New coffee shop discovery",
          content: "Found this amazing little coffee shop downtown. Their latte art is incredible and the atmosphere is perfect for working or just relaxing.",
          author: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop",
          likes: 18,
          comments: 3
        },
        {
          id: 3,
          title: "Weekend hiking adventure",
          content: "Completed a 10-mile hike today! The trail was challenging but the views from the summit made every step worth it. Nature therapy at its finest.",
          author: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
          likes: 42,
          comments: 8
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        // Show skeleton cards while loading
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        // Show actual posts when loaded
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default PostFeed;