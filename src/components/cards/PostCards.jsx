// import React, { useContext, useState } from "react";
// import {
//   FaUserCircle,
//   FaThumbsUp,
//   FaThumbsDown,
//   FaComment,
// } from "react-icons/fa";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../utils/apiPath";
// import { UserContext } from "../../Context/UserContext";

// const PostCard = ({ post }) => {
//   const { user } = useContext(UserContext);
//   // Local state so UI updates instantly
//   const [likesCount, setLikesCount] = useState(post.likes.length);
//   const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);
//   // const [likedByUser, setLikedByUser] = useState(post.likedByUser || false);
//   // const [dislikedByUser, setDislikedByUser] = useState(
//   //   post.dislikedByUser || false
//   // );

//   const [likedByUser, setLikedByUser] = useState(
//     post.likes.some((like) => like._id === user._id)
//   );
//   const [dislikedByUser, setDislikedByUser] = useState(
//     post.dislikes.some((dislike) => dislike._id === user._id)
//   );

//   console.log("My id 0", user._id);
//   console.log("post ", post);

//   const formatNumber = (num) => {
//     return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
//   };

//   const handleLike = async () => {
//     try {
//       // Optimistic UI update
//       if (likedByUser) {
//         setLikesCount(likesCount - 1);
//         setLikedByUser(false);
//       } else {
//         setLikesCount(likesCount + 1);
//         setLikedByUser(true);

//         // If previously disliked, remove that
//         if (dislikedByUser) {
//           setDislikesCount(dislikesCount - 1);
//           setDislikedByUser(false);
//         }
//       }

//       // API request
//       await axiosInstance.put(API_PATH.POST.LIKE_POST(post._id));
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       // Optimistic UI update
//       if (dislikedByUser) {
//         setDislikesCount(dislikesCount - 1);
//         setDislikedByUser(false);
//       } else {
//         setDislikesCount(dislikesCount + 1);
//         setDislikedByUser(true);

//         // If previously liked, remove that
//         if (likedByUser) {
//           setLikesCount(likesCount - 1);
//           setLikedByUser(false);
//         }
//       }

//       // API request
//       await axiosInstance.put(API_PATH.POST.DISLIKE_POST(post._id));
//     } catch (error) {
//       console.error("Error disliking post:", error);
//     }
//   };

//   const handleComment = () => {
//     console.log("Comment clicked for post:", post._id);
//     // Could open a comment modal here
//   };

//   return (
//     <div className="bg-white border border-yellow-400 shadow-md rounded-lg p-5 mb-6">
//       {/* Post Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <FaUserCircle className="text-black text-2xl" />
//           <div>
//             <h3 className="text-sm font-semibold text-black">
//               {post.author.name}
//             </h3>
//             <p className="text-xs text-gray-500">
//               {new Date(post.createdAt).toDateString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Post Body */}
//       <div>
//         <h2 className="text-xl font-bold text-yellow-500 mb-2">
//           {post.postTitle}
//         </h2>
//         <p className="text-sm text-gray-700">{post.content}</p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-6 mt-4 text-gray-600">
//         <button
//           onClick={handleLike}
//           className={`flex items-center gap-1 hover:text-blue-600 ${
//             likedByUser ? "text-blue-600" : ""
//           }`}
//         >
//           <FaThumbsUp /> {formatNumber(likesCount)}
//         </button>
//         <button
//           onClick={handleDislike}
//           className={`flex items-center gap-1 hover:text-red-600 ${
//             dislikedByUser ? "text-red-600" : ""
//           }`}
//         >
//           <FaThumbsDown /> {formatNumber(dislikesCount)}
//         </button>
//         <button
//           onClick={handleComment}
//           className="flex items-center gap-1 hover:text-green-600"
//         >
//           <FaComment />
//           {post.comments.length}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useContext, useState } from "react";
import {
  FaUserCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../Context/UserContext";
import CommentModal from "./CommentModal"; // import modal

const PostCard = ({ post }) => {
  const { user } = useContext(UserContext);

  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);
  const [likedByUser, setLikedByUser] = useState(
    post.likes.some((like) => like._id === user._id)
  );
  const [dislikedByUser, setDislikedByUser] = useState(
    post.dislikes.some((dislike) => dislike._id === user._id)
  );

  // Comment modal state
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
  };

  const handleLike = async () => {
    try {
      if (likedByUser) {
        setLikesCount(likesCount - 1);
        setLikedByUser(false);
      } else {
        setLikesCount(likesCount + 1);
        setLikedByUser(true);
        if (dislikedByUser) {
          setDislikesCount(dislikesCount - 1);
          setDislikedByUser(false);
        }
      }
      await axiosInstance.put(API_PATH.POST.LIKE_POST(post._id));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (dislikedByUser) {
        setDislikesCount(dislikesCount - 1);
        setDislikedByUser(false);
      } else {
        setDislikesCount(dislikesCount + 1);
        setDislikedByUser(true);
        if (likedByUser) {
          setLikesCount(likesCount - 1);
          setLikedByUser(false);
        }
      }
      await axiosInstance.put(API_PATH.POST.DISLIKE_POST(post._id));
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  return (
    <>
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
            className={`flex items-center gap-1 hover:text-blue-600 ${
              likedByUser ? "text-blue-600" : ""
            }`}
          >
            <FaThumbsUp /> {formatNumber(likesCount)}
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 hover:text-red-600 ${
              dislikedByUser ? "text-red-600" : ""
            }`}
          >
            <FaThumbsDown /> {formatNumber(dislikesCount)}
          </button>
          <button
            onClick={handleComment}
            className="flex items-center gap-1 hover:text-green-600"
          >
            <FaComment />
            {post.comments.length}
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />
    </>
  );
};

export default PostCard;
