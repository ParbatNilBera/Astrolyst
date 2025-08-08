// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATH } from "../../../utils/apiPath";
// import UserCard from "../../../components/cards/UserCard";
// import SearchModal from "../../../components/cards/SearchModal";

// const Members = ({ communityId }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

//   useEffect(() => {
//     fetchCommunityUsers();
//   }, [communityId]);

//   const fetchCommunityUsers = async () => {
//     try {
//       const response = await axiosInstance.get(
//         API_PATH.POST.GET_COMUNITY_USER(communityId)
//       );
//       setUsers(response.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch users.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUserAdded = (newUser) => {
//     setUsers((prev) => [...prev, newUser]);
//   };

//   if (loading) return <p className="text-center">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="w-screen px-4 mx-auto mt-6">
//       {/* Add User Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setIsSearchModalOpen(true)}
//           className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
//         >
//           Add User
//         </button>
//       </div>

//       {/* User Cards */}
//       {users.length === 0 ? (
//         <p className="text-center">No users found.</p>
//       ) : (
//         users.map((userData) => (
//           <UserCard key={userData._id} userData={userData} />
//         ))
//       )}

//       {/* Search Modal */}
//       <SearchModal
//         isOpen={isSearchModalOpen}
//         onClose={() => setIsSearchModalOpen(false)}
//         communityId={communityId}
//         onUserAdded={handleUserAdded}
//       />
//     </div>
//   );
// };

// export default Members;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import UserCard from "../../../components/cards/UserCard";
import SearchModal from "../../../components/cards/SearchModal";

const Members = ({ communityId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    fetchCommunityUsers();
  }, [communityId]);

  const fetchCommunityUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATH.POST.GET_COMUNITY_USER(communityId)
      );
      setUsers(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleRemoveMember = async (targetUserId) => {
    try {
      await axiosInstance.delete(
        API_PATH.COMUNITY.REMOVE_MEMBER(communityId, targetUserId)
      );

      // Remove user from UI
      setUsers((prev) => prev.filter((u) => u?.user?._id !== targetUserId));
    } catch (err) {
      console.error("Failed to remove member:", err);
      alert("Failed to remove member.");
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-screen px-4 mx-auto mt-6">
      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Add User
        </button>
      </div>

      {/* User Cards */}
      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        users.map((userData) => (
          <UserCard
            key={userData._id}
            userData={userData}
            onRemove={handleRemoveMember}
          />
        ))
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        communityId={communityId}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};

export default Members;
