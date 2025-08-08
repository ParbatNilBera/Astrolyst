import React from "react";
import {
  FaUserCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
} from "react-icons/fa";

const PostCard = ({ post }) => {
  const handleLike = () => {
    console.log("Liked post:", post._id);
    // Additional logic here
  };

  const handleDislike = () => {
    console.log("Disliked post:", post._id);
    // Additional logic here
  };

  const handleComment = () => {
    console.log("Comment clicked for post:", post._id);
    // Additional logic here
  };

  return (
    <div className="bg-white border border-yellow-400 shadow-md rounded-lg p-5 mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-black text-2xl" />
          <div>
            <h3 className="text-sm font-semibold text-black">
              {post.author.name}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Post Body */}
      <div>
        <h2 className="text-xl font-bold text-yellow-500 mb-2">
          {post.postTitle}
        </h2>
        <p className="text-sm text-gray-700">{post.content}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-4 text-gray-600">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          <FaThumbsUp /> Like
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center gap-1 hover:text-red-600"
        >
          <FaThumbsDown /> Dislike
        </button>
        <button
          onClick={handleComment}
          className="flex items-center gap-1 hover:text-green-600"
        >
          <FaComment /> Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
