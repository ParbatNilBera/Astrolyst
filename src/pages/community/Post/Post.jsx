import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import PostCard from "../../../components/cards/PostCards";

const Post = ({ communityId }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATH.POST.GET_POSTS_BY_ID(communityId)
      );
      if (response) {
        setPostDetails(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [communityId]);

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await axiosInstance.post(API_PATH.POST.CREATE_POST, {
        communityId,
        postTitle,
        content,
      });
      setShowModal(false);
      setPostTitle("");
      setContent("");
      fetchPost(); // Refresh post list
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-6 px-4 w-screen">
      {/* Create Post Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Create Post
        </button>
      </div>

      {/* Posts List */}
      <div>
        {postDetails.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No posts available.
          </p>
        ) : (
          postDetails.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={() => console.log("Liked post:", post._id)}
              onDislike={() => console.log("Disliked post:", post._id)}
              onComment={() => console.log("Comment clicked for:", post._id)}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-yellow-200/40 bg-opacity-400 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">
              Create New Post
            </h2>

            {/* Post Title */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Title
              </label>
              <input
                type="text"
                placeholder="Enter post title"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                rows={4}
                placeholder="Write your content..."
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPostTitle("");
                  setContent("");
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  loading
                    ? "bg-yellow-300 cursor-wait"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
