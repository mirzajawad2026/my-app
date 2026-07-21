import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const res = await axios.get("http://localhost:3000/take-post");
      setPosts(res.data.post);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <i className="fas fa-instagram text-purple-600"></i>
          Feed
        </h3>

        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {posts.length} posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-2">📷</div>
          <h3 className="text-sm font-semibold text-gray-600">
            No posts yet
          </h3>
          <p className="text-xs text-gray-400">
            Be the first to share!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <img
                src={post.image}
                alt="post"
                className="w-full h-auto max-h-[500px] object-cover"
              />

            </div>

            <div className="px-4 py-3">
              <p className="text-sm text-gray-800">{post.caption}</p>
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default Feed;