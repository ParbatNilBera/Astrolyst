// import React, { useState } from "react";
// import { API_PATH } from "../../utils/apiPath";

// const SearchModal = ({ isOpen, onClose }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     console.log("Searching for:", searchTerm);
//     // Here you can call API to get matching users
//     // For now, let's mock some data
//     setResults([
//       { _id: 1, name: "John Doe" },
//       { _id: 2, name: "Jane Smith" },
//     ]);
//   };

//   const handleSelectUser = (user) => {
//     console.log("Selected user:", user);
//     // You can trigger API to add user to community
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Search User</h2>

//         {/* Search input */}
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Search user..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded-md px-3 py-2 w-full"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>

//         {/* Search results */}
//         <div className="max-h-48 overflow-y-auto">
//           {results.length === 0 ? (
//             <p className="text-gray-500 text-center">No results found</p>
//           ) : (
//             results.map((user) => (
//               <div
//                 key={user._id}
//                 onClick={() => handleSelectUser(user)}
//                 className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
//               >
//                 {user.name}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Close button */}
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchModal;

import React, { useEffect, useState } from "react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const SearchModal = ({ isOpen, onClose, communityId, onUserAdded }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingUserId, setAddingUserId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all users when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchAllUsers();
    }
  }, [isOpen]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(API_PATH.USER.GET_USER);
      const usersList = response.data.data || [];
      setAllUsers(usersList);
      setFilteredUsers(usersList);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  // Filter users when typing
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(
        allUsers.filter((user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allUsers]);

  const handleSelectUser = async (user) => {
    setAddingUserId(user._id);
    try {
      await axiosInstance.post(API_PATH.COMUNITY.ADD_COMUNITY_MEMBERS, {
        communityId,
        targetUserId: user._id,
      });
      onUserAdded(user); // update Members list
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add user to community.");
    } finally {
      setAddingUserId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Member</h2>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mb-4"
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Users list */}
        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md flex justify-between items-center"
              >
                <span>{user.name}</span>
                {addingUserId === user._id && (
                  <span className="text-sm text-gray-400">Adding...</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Close button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
