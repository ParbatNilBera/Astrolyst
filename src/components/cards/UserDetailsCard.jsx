// import React from "react";

// const UserDetailsCard = ({
//   user,
//   clearUser,
//   setIsMobileMenuOpen,
//   handleLogout,
// }) => {
//   return (
//     <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
//       <div className="mb-2">
//         <p className="text-sm font-semibold text-gray-900">{user.name}</p>
//         <p className="text-xs text-gray-600">{user.email}</p>
//       </div>
//       <button
//         className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
//         onClick={() => {
//           clearUser();
//           setIsMobileMenuOpen(false);
//           handleLogout();
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default UserDetailsCard;

import React from "react";

const UserDetailsCard = ({
  user,
  clearUser,
  setIsMobileMenuOpen,
  handleLogout,
}) => {
  return (
    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
      <div className="mb-4">
        <p className="text-lg font-semibold text-yellow-900 truncate">
          {user.name}
        </p>
        <p className="text-sm text-yellow-700 truncate">{user.email}</p>
      </div>
      <button
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition shadow-md"
        onClick={() => {
          clearUser();
          setIsMobileMenuOpen(false);
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDetailsCard;
