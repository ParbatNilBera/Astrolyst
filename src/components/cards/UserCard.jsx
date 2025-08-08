// import React from "react";

// const UserCard = ({ userData }) => {
//   if (!userData || !userData.user) {
//     return (
//       <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
//         <p className="text-gray-500">Loading user...</p>
//       </div>
//     );
//   }

//   const { name, email, role } = userData.user;

//   return (
//     <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
//       <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//       <p className="text-sm text-gray-600">Email: {email}</p>
//       <p className="text-sm text-gray-600">Role: {role}</p>
//     </div>
//   );
// };

// export default UserCard;

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // or any icon lib

const UserCard = ({ userData, onRemove }) => {
  if (!userData || !userData.user) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  const { name, email, role, _id } = userData.user;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 mb-3 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Email: {email}</p>
        <p className="text-sm text-gray-600">Role: {role}</p>
      </div>

      <button
        onClick={() => onRemove(_id)}
        className="text-red-500 hover:text-red-700"
        title="Remove Member"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserCard;
