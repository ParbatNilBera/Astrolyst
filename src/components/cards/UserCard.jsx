// import React, { useContext, useState, useRef, useEffect } from "react";
// import { UserContext } from "../../Context/UserContext";
// import {
//   MoreVertical,
//   ArrowUpCircle,
//   ArrowDownCircle,
//   Trash2,
// } from "lucide-react";

// const UserCard = ({
//   currentMember,
//   userData,
//   onRemove,
//   onPromote,
//   onDemote,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const { user } = useContext(UserContext);

//   const handleToggle = () => setIsOpen((prev) => !prev);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!userData || !userData.user) {
//     return (
//       <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
//         <p className="text-gray-500">Loading user...</p>
//       </div>
//     );
//   }
//   console.log(userData);
//   const { name, email, role, _id } = userData.user;

//   return (
//     <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3 flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//         <p className="text-sm text-gray-600">Email: {email}</p>
//         <p className="text-sm text-gray-600">Role: {role}</p>
//       </div>

//       {currentMember?.isModerator && (
//         <div className="relative inline-block text-left" ref={menuRef}>
//           {/* Dots Button */}
//           <button
//             onClick={handleToggle}
//             className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
//           >
//             <MoreVertical size={18} />
//           </button>

//           {/* Dropdown Menu */}
//           {isOpen && (
//             <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//               <div className="py-1">
//                 {role === "user" ? (
//                   <button
//                     onClick={() => {
//                       onPromote?.(_id);
//                       setIsOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     <ArrowUpCircle size={16} /> Promote to Admin
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       onDemote?.(_id);
//                       setIsOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
//                   >
//                     <ArrowDownCircle size={16} /> Demote to Member
//                   </button>
//                 )}

//                 <button
//                   onClick={() => {
//                     onRemove(_id);
//                     setIsOpen(false);
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                 >
//                   <Trash2 size={16} /> Remove User
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default UserCard;

// import React, { useContext, useState, useRef, useEffect } from "react";
// import { UserContext } from "../../Context/UserContext";
// import {
//   MoreVertical,
//   ArrowUpCircle,
//   ArrowDownCircle,
//   Trash2,
// } from "lucide-react";

// const UserCard = ({
//   currentMember,
//   userData,
//   onRemove,
//   onPromote,
//   onDemote,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const { user } = useContext(UserContext);

//   const handleToggle = () => setIsOpen((prev) => !prev);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!userData || !userData.user) {
//     return (
//       <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
//         <p className="text-gray-500">Loading user...</p>
//       </div>
//     );
//   }

//   const { name, email, role, _id } = userData.user;
//   const isModerator = userData.isModerator;

//   return (
//     <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3 flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//         <p className="text-sm text-gray-600">Email: {email}</p>
//         <p className="text-sm text-gray-600">
//           Role: {isModerator ? "Moderator" : role}
//         </p>
//       </div>

//       {currentMember?.isModerator && (
//         <div className="relative inline-block text-left" ref={menuRef}>
//           {/* Dots Button */}
//           <button
//             onClick={handleToggle}
//             className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
//           >
//             <MoreVertical size={18} />
//           </button>

//           {/* Dropdown Menu */}
//           {isOpen && (
//             <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//               <div className="py-1">
//                 {!isModerator ? (
//                   <button
//                     onClick={() => {
//                       onPromote?.(_id);
//                       setIsOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     <ArrowUpCircle size={16} /> Promote to Moderator
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       onDemote?.(_id);
//                       setIsOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
//                   >
//                     <ArrowDownCircle size={16} /> Demote to Member
//                   </button>
//                 )}

//                 <button
//                   onClick={() => {
//                     onRemove(_id);
//                     setIsOpen(false);
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                 >
//                   <Trash2 size={16} /> Remove User
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCard;

import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  MoreVertical,
  ArrowUpCircle,
  ArrowDownCircle,
  Trash2,
} from "lucide-react";

const UserCard = ({
  currentMember,
  userData,
  onRemove,
  onPromote,
  onDemote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useContext(UserContext);

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userData || !userData.user) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  const { name, email, role, _id } = userData.user;
  const isModerator = userData.isModerator;

  // Permissions for current logged-in user
  const canPromoteDemote =
    currentMember?.isModerator && currentMember?.role === "astrologer";

  const canRemove = !isModerator && role !== "astrologer"; // can't remove mods or astrologers

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Email: {email}</p>
        <p className="text-sm text-gray-600">
          Role: {isModerator ? "Moderator" : role}
        </p>
      </div>

      {(canPromoteDemote || canRemove) && (
        <div className="relative inline-block text-left" ref={menuRef}>
          {/* Dots Button */}
          <button
            onClick={handleToggle}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                {/* Promote / Demote */}
                {canPromoteDemote &&
                  (!isModerator ? (
                    <button
                      onClick={() => {
                        onPromote?.(_id);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ArrowUpCircle size={16} /> Promote to Moderator
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onDemote?.(_id);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      <ArrowDownCircle size={16} /> Demote to Member
                    </button>
                  ))}

                {/* Remove */}
                {canRemove && (
                  <button
                    onClick={() => {
                      onRemove(_id);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} /> Remove User
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
