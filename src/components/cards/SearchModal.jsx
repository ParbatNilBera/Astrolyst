// import React, { useEffect, useState } from "react";
// import { API_PATH } from "../../utils/apiPath";
// import axiosInstance from "../../utils/axiosInstance";

// import { Search, X, UserPlus, Loader2 } from "lucide-react";

// const SearchModal = ({ isOpen, onClose, communityId, onUserAdded }) => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [addingUserId, setAddingUserId] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch all users when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       fetchAllUsers();
//     }
//   }, [isOpen]);

//   const fetchAllUsers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axiosInstance.get(API_PATH.USER.GET_USER);
//       const usersList = response.data.data || [];
//       setAllUsers(usersList);
//       setFilteredUsers(usersList);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter users when typing
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredUsers(allUsers);
//     } else {
//       setFilteredUsers(
//         allUsers.filter((user) =>
//           user.name?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm, allUsers]);

//   const handleSelectUser = async (user) => {
//     setAddingUserId(user._id);
//     try {
//       await axiosInstance.post(API_PATH.COMUNITY.ADD_COMUNITY_MEMBERS, {
//         communityId,
//         targetUserId: user._id,
//       });
//       onUserAdded(user); // update Members list
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add user to community.");
//     } finally {
//       setAddingUserId(null);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <UserPlus className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900">Add Member</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Search input */}
//         <div className="p-6 border-b border-gray-100 flex-shrink-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search user..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm m-4">
//             {error}
//           </div>
//         )}

//         {/* Users list */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-1">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" />
//               <p className="text-gray-500 text-sm">Loading users...</p>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                 <Search className="w-5 h-5 text-gray-400" />
//               </div>
//               <p className="text-gray-500 text-sm">No users found</p>
//             </div>
//           ) : (
//             filteredUsers.map((user) => (
//               <div
//                 key={user._id}
//                 onClick={() => handleSelectUser(user)}
//                 className="group p-3 hover:bg-blue-50 cursor-pointer rounded-xl transition-all duration-200 flex justify-between items-center border border-transparent hover:border-blue-100"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
//                     {user.name}
//                   </span>
//                 </div>
//                 {addingUserId === user._id && (
//                   <div className="flex items-center gap-2 text-blue-600">
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span className="text-sm">Adding...</span>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
//           <div className="flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-6 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     // <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//     //   <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md transform transition-all duration-300 ease-out">
//     //     {/* Header */}
//     //     <div className="flex items-center justify-between p-6 border-b border-gray-100">
//     //       <div className="flex items-center gap-3">
//     //         <div className="p-2 bg-blue-50 rounded-lg">
//     //           <UserPlus className="w-5 h-5 text-blue-600" />
//     //         </div>
//     //         <h2 className="text-xl font-semibold text-gray-900">Add Member</h2>
//     //       </div>
//     //       <button
//     //         onClick={onClose}
//     //         className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//     //       >
//     //         <X className="w-5 h-5 text-gray-500" />
//     //       </button>
//     //     </div>

//     //     <div className="p-6">
//     //       {/* Search input */}
//     //       <div className="relative mb-6">
//     //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//     //         <input
//     //           type="text"
//     //           placeholder="Search user..."
//     //           value={searchTerm}
//     //           onChange={(e) => setSearchTerm(e.target.value)}
//     //           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//     //         />
//     //       </div>

//     //       {/* Error message */}
//     //       {error && (
//     //         <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//     //           {error}
//     //         </div>
//     //       )}

//     //       {/* Users list */}
//     //       <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//     //         {loading ? (
//     //           <div className="flex flex-col items-center justify-center py-8">
//     //             <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" />
//     //             <p className="text-gray-500 text-sm">Loading users...</p>
//     //           </div>
//     //         ) : filteredUsers.length === 0 ? (
//     //           <div className="flex flex-col items-center justify-center py-8">
//     //             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//     //               <Search className="w-5 h-5 text-gray-400" />
//     //             </div>
//     //             <p className="text-gray-500 text-sm">No users found</p>
//     //           </div>
//     //         ) : (
//     //           <div className="space-y-1">
//     //             {filteredUsers.map((user) => (
//     //               <div
//     //                 key={user._id}
//     //                 onClick={() => handleSelectUser(user)}
//     //                 className="group p-3 hover:bg-blue-50 cursor-pointer rounded-xl transition-all duration-200 flex justify-between items-center border border-transparent hover:border-blue-100"
//     //               >
//     //                 <div className="flex items-center gap-3">
//     //                   <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//     //                     {user.name.charAt(0).toUpperCase()}
//     //                   </div>
//     //                   <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
//     //                     {user.name}
//     //                   </span>
//     //                 </div>
//     //                 {addingUserId === user._id && (
//     //                   <div className="flex items-center gap-2 text-blue-600">
//     //                     <Loader2 className="w-4 h-4 animate-spin" />
//     //                     <span className="text-sm">Adding...</span>
//     //                   </div>
//     //                 )}
//     //               </div>
//     //             ))}
//     //           </div>
//     //         )}
//     //       </div>
//     //     </div>

//     //     {/* Footer */}
//     //     <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
//     //       <div className="flex justify-end">
//     //         <button
//     //           onClick={onClose}
//     //           className="px-6 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
//     //         >
//     //           Close
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default SearchModal;

import React, { useEffect, useState } from "react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { Search, X, UserPlus, Loader2 } from "lucide-react";

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

  // Filter users
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

  const handleAddUser = async (user) => {
    setAddingUserId(user._id);
    try {
      await axiosInstance.post(API_PATH.COMUNITY.ADD_COMUNITY_MEMBERS, {
        communityId,
        targetUserId: user._id,
      });
      onUserAdded(user);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Add Member</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm m-4">
            {error}
          </div>
        )}

        {/* Users list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-500 text-sm">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="p-3 flex justify-between items-center rounded-xl transition-all duration-200 border border-transparent hover:bg-blue-50 hover:border-blue-100"
              >
                {/* User info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>

                {/* Add button */}
                <button
                  onClick={() => handleAddUser(user)}
                  disabled={addingUserId === user._id}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {addingUserId === user._id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
