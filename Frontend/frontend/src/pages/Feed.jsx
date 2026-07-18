import React, { useEffect, useState } from 'react';
import axios from "axios"
const Feed = () => {
  // Sample posts data - only image and caption
  const [posts, setPosts] = useState([
    {
      _id: 1,
      image: 'https://picsum.photos/seed/1/600/400',
      caption: 'Beautiful sunset at the beach 🌅',
   
    }
  ]);
  useEffect(function() {

    axios.get("http://localhost:3000/take-post").then((res)=>{
      setPosts(res.data.post);
      console.log(res.data.post);
      
      
    })
  }, [])

  // Delete a post
  const deletePost = (postId) => {
    if (window.confirm('Delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <i className="fas fa-instagram text-purple-600"></i>
          Feed
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {posts.length} posts
        </span>
      </div>

      {/* Show posts */}
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Post Image */}
          <div className="relative">
            <img 
              src={post.image} 
              alt={post.caption} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
            
            {/* Delete button */}
            <button 
              onClick={() => deletePost(post.id)}
              className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            >
              <i className="fas fa-trash-alt text-xs"></i>
            </button>
          </div>

          {/* Post Caption */}
          <div className="px-4 py-3">
            <p className="text-sm text-gray-800">{post.caption}</p>
            <p className="text-xs text-gray-400 mt-1">{post.timestamp}</p>
          </div>
        </div>
      ))}

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-2">📷</div>
          <h3 className="text-sm font-semibold text-gray-600">No posts yet</h3>
          <p className="text-xs text-gray-400">Be the first to share!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;