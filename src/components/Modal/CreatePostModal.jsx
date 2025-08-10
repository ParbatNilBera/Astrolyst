import React from "react";
import { X, Edit3, FileText } from "lucide-react";
const CreatePostModal = ({
  postTitle,
  setPostTitle,
  content,
  setContent,
  loading,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Create New Post
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Post Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-yellow-600" />
            <label className="text-sm font-semibold text-gray-800">
              Post Title
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter an engaging title..."
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  postTitle ? "bg-green-400" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Edit3 className="w-4 h-4 text-yellow-600" />
            <label className="text-sm font-semibold text-gray-800">
              Content
            </label>
          </div>
          <div className="relative">
            <textarea
              rows={4}
              placeholder="Share your thoughts with the world..."
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="absolute bottom-3 right-3">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  content ? "bg-green-400" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all duration-200 active:scale-95 ${
              loading
                ? "bg-gradient-to-r from-yellow-300 to-orange-300 cursor-wait opacity-80"
                : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-xl"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                "Create Post"
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
