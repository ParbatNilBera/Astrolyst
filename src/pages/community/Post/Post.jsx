// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATH } from "../../../utils/apiPath";
// import CreatePostModal from "../../../components/Modal/CreatePostModal";
// import PostCard from "../../../components/cards/PostCards";

// const Post = ({ communityId }) => {
//   const [postDetails, setPostDetails] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [postTitle, setPostTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchPost = async () => {
//     try {
//       const response = await axiosInstance.get(
//         API_PATH.POST.GET_POSTS_BY_ID(communityId)
//       );
//       if (response) {
//         console.log("hay Guys", response.data.data);
//         setPostDetails(response.data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [communityId]);

//   const handleCreatePost = async () => {
//     if (!postTitle.trim() || !content.trim()) return;

//     setLoading(true);
//     try {
//       await axiosInstance.post(API_PATH.POST.CREATE_POST, {
//         communityId,
//         postTitle,
//         content,
//       });
//       setShowModal(false);
//       setPostTitle("");
//       setContent("");
//       fetchPost(); // Refresh post list
//     } catch (err) {
//       console.error("Error creating post:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-6 px-4 w-screen">
//       {/* Create Post Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
//         >
//           Create Post
//         </button>
//       </div>
//       {/* Posts List */}
//       <div>
//         {postDetails.length === 0 ? (
//           <p className="text-center text-gray-600 text-lg">
//             No posts available.
//           </p>
//         ) : (
//           postDetails.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//               onLike={() => console.log("Liked post:", post._id)}
//               onDislike={() => console.log("Disliked post:", post._id)}
//               onComment={() => console.log("Comment clicked for:", post._id)}
//             />
//           ))
//         )}
//       </div>
//       {/* Modal */}
//       {showModal && (
//         <CreatePostModal
//           postTitle={postTitle}
//           setPostTitle={setPostTitle}
//           content={content}
//           setContent={setContent}
//           loading={loading}
//           onClose={() => {
//             setShowModal(false);
//             setPostTitle("");
//             setContent("");
//           }}
//           onSubmit={handleCreatePost}
//         />
//       )}
//     </div>
//   );
// };

// export default Post;

import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import CreatePostModal from "../../../components/Modal/CreatePostModal";
import PostCard from "../../../components/cards/PostCards";
import { UserContext } from "../../../Context/UserContext";

const Post = ({ communityId }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [canPost, setCanPost] = useState(false); // NEW state
  const { user } = useContext(UserContext);

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

  const fetchCommunityAndPermissions = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATH.COMUNITY.GET_COMUNITY_BY_ID(communityId)
      );
      console.log("community details res", res.data);

      const { visibility, members } = res.data.data;

      // Get current user id (assuming your auth middleware sets this)
      const currentUserId = user._id;
      console.log("user id is as follows", currentUserId);

      console.log(members, currentUserId);

      // Find the member entry for the current user
      const currentMember = members?.find((m) => m.user === currentUserId);

      if (visibility === "public") {
        setCanPost(true);
      } else {
        if (
          currentMember?.isModerator ||
          currentMember?.role === "astrologer"
        ) {
          setCanPost(true);
        } else {
          setCanPost(false);
        }
      }
    } catch (err) {
      console.error("Error fetching community details:", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCommunityAndPermissions();
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
        {canPost && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Create Post
          </button>
        )}
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
        <CreatePostModal
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          content={content}
          setContent={setContent}
          loading={loading}
          onClose={() => {
            setShowModal(false);
            setPostTitle("");
            setContent("");
          }}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};

export default Post;
