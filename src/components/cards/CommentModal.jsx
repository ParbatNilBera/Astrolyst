import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import PostCard from "./PostCards";
import { Send, X } from "lucide-react";
import { UserContext } from "../../Context/UserContext";

const CommentModal = ({ isOpen, onClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  useEffect(() => {
    if (!post?._id) return;
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATH.POST.GET_COMMENT_BY_POST(post._id)
        );
        if (res?.data?.comments) {
          setComments(res.data.comments);
        }
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [post]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    try {
      // Send comment to backend
      const res = await axiosInstance.post(
        API_PATH.POST.ADD_COMMENT(post._id),
        { text: newComment }
      );

      // Use API returned comment if available
      const addedComment = res?.data?.comment || {
        _id: Date.now().toString(),
        text: newComment,
        createdAt: new Date(),
        user: {
          name: user?.name || "Unknown User",
          email: user?.email || "No Email",
        },
      };

      // Update UI instantly
      setComments((prev) => [...prev, addedComment]);

      setNewComment("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl flex flex-col max-h-[90vh] shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Post Discussion
            </h2>
            <p className="text-sm text-gray-500">Join the conversation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Post */}
        <div className="p-5 border-b bg-gray-50">
          <PostCard post={post} />
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white rounded-lg border p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                    {getInitials(comment.user.name)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {comment.user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {comment.user.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">
              💬 No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="2"
            />
            <button
              onClick={handleSendComment}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Send size={16} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
