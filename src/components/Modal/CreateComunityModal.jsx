// const CreateComunityModal = ({ newCommunity, setNewCommunity }) => {
//   return (
//     <div className="p-8 space-y-6">
//       <div>
//         <label className="block text-sm font-bold text-gray-700 mb-3">
//           Community Name
//         </label>
//         <input
//           type="text"
//           placeholder="Enter a catchy community name"
//           value={newCommunity.name}
//           onChange={(e) =>
//             setNewCommunity({ ...newCommunity, name: e.target.value })
//           }
//           className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 text-lg"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-bold text-gray-700 mb-3">
//           Description
//         </label>
//         <textarea
//           placeholder="Describe what makes your community special..."
//           rows="4"
//           value={newCommunity.description}
//           onChange={(e) =>
//             setNewCommunity({
//               ...newCommunity,
//               description: e.target.value,
//             })
//           }
//           className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 text-lg resize-none"
//         ></textarea>
//       </div>

//       <div>
//         <label className="block text-sm font-bold text-gray-700 mb-3">
//           Visibility
//         </label>
//         <select
//           value={newCommunity.visibility}
//           onChange={(e) =>
//             setNewCommunity({
//               ...newCommunity,
//               visibility: e.target.value,
//             })
//           }
//           className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 text-lg bg-white"
//         >
//           <option value="public">Public - Anyone can join</option>
//           <option value="private">Private - Invite only</option>
//           <option value="protected">Protected - Request to join</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default CreateComunityModal;

import React from "react";
import {
  FiUsers,
  FiFileText,
  FiEye,
  FiGlobe,
  FiLock,
  FiShield,
} from "react-icons/fi";

const CreateComunityModal = ({ newCommunity, setNewCommunity }) => {
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case "public":
        return <FiGlobe className="w-4 h-4" />;
      case "private":
        return <FiLock className="w-4 h-4" />;
      case "protected":
        return <FiShield className="w-4 h-4" />;
      default:
        return <FiGlobe className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto border border-yellow-100">
      <div className="space-y-6">
        {/* Community Name */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FiUsers className="w-4 h-4 text-yellow-500" />
            Community Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter a catchy community name"
              value={newCommunity.name}
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 text-gray-900 placeholder-gray-400 group-hover:border-yellow-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Description */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FiFileText className="w-4 h-4 text-yellow-500" />
            Description
          </label>
          <div className="relative">
            <textarea
              placeholder="Describe what makes your community special..."
              rows="3"
              value={newCommunity.description}
              onChange={(e) =>
                setNewCommunity({
                  ...newCommunity,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none group-hover:border-yellow-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Visibility */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FiEye className="w-4 h-4 text-yellow-500" />
            Visibility
          </label>
          <div className="relative">
            <select
              value={newCommunity.visibility}
              onChange={(e) =>
                setNewCommunity({
                  ...newCommunity,
                  visibility: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 text-gray-900 appearance-none cursor-pointer group-hover:border-yellow-300"
            >
              <option value="public">🌍 Public - Anyone can join</option>
              <option value="private">🔒 Private - Invite only</option>
              <option value="restricted">🛡️ Protected - Request to join</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {getVisibilityIcon(newCommunity.visibility)}
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComunityModal;
