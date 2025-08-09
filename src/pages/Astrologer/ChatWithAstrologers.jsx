// import { useEffect, useState } from "react";
// import {
//   FaUserCircle,
//   FaComments,
//   FaPhone,
//   FaStar,
//   FaGlobe,
//   FaCheckCircle,
// } from "react-icons/fa";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../utils/apiPath";
// import { useNavigate } from "react-router-dom";
// import ChatIcon from "../../components/ChatIcon";

// const ChatWithAstrologers = () => {
//   const navigate = useNavigate();
//   const [astrologerData, setAstrologerData] = useState(null);
//   const [openChats, setOpenChats] = useState(false);
//   useEffect(() => {
//     const fetchAllAstrologer = async () => {
//       const response = await axiosInstance.get(
//         API_PATH.CALL.GET_ACTIVE_ASTROLOGER
//       );
//       console.log(response.data.data);
//       setAstrologerData(response.data.data);
//     };
//     fetchAllAstrologer();
//   }, []);

//   const handleChatClick = (astrologerId, astrologerName) => {
//     console.log(`Starting chat with ${astrologerName} (ID: ${astrologerId})`);
//     navigate(`/chat/${astrologerId}`);
//     // Add your chat functionality here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Find Your Astrologer
//             </h1>
//             <p className="text-gray-600">
//               Connect with experienced astrologers for guidance and insights
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <ChatIcon open={openChats} setOpen={setOpenChats} />
//           </div>
//         </div>
//       </div>

//       {/* Astrologer Cards Grid */}
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {astrologerData?.map((astrologer) => (
//             <div
//               key={astrologer._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
//             >
//               {/* Card Header */}
//               <div className="p-6 pb-4">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <FaUserCircle className="text-gray-400 text-4xl" />
//                     <div>
//                       <div className="flex items-center space-x-2">
//                         <h3 className="text-lg font-bold text-gray-900">
//                           {astrologer.name}
//                         </h3>
//                         {astrologer.isApprovedByAdmin && (
//                           <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
//                             <FaCheckCircle className="mr-1 text-xs" />
//                             Verified
//                           </div>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600">
//                         {astrologer.location}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {astrologer.gender} • {astrologer.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Experience */}
//                 <div className="flex items-center space-x-2 mb-4">
//                   <FaStar className="text-yellow-500 text-sm" />
//                   <span className="text-sm text-gray-700 font-medium">
//                     {astrologer.experience} years experience
//                   </span>
//                 </div>

//                 {/* Pricing */}
//                 <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-3">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-1">
//                       <FaComments className="text-yellow-600 text-sm" />
//                       <span className="text-sm text-gray-700">
//                         ₹{astrologer.pricing.chatPerMin}/min
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <FaPhone className="text-yellow-600 text-sm" />
//                       <span className="text-sm text-gray-700">
//                         ₹{astrologer.pricing.callPerMin}/min
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Languages */}
//                 <div className="mb-4">
//                   <div className="flex items-center space-x-1 mb-2">
//                     <FaGlobe className="text-gray-500 text-sm" />
//                     <span className="text-xs text-gray-600 font-medium">
//                       Languages:
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-1">
//                     {astrologer?.languages?.map((language, index) => (
//                       <span
//                         key={index}
//                         className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
//                       >
//                         {language}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Expertise */}
//                 <div className="mb-6">
//                   <span className="text-xs text-gray-600 font-medium mb-2 block">
//                     Expertise:
//                   </span>
//                   <div className="flex flex-wrap gap-1">
//                     {astrologer?.expertise?.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Card Footer */}
//               <div className="px-6 pb-6">
//                 <button
//                   onClick={() =>
//                     handleChatClick(astrologer._id, astrologer.name)
//                   }
//                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 shadow-md hover:shadow-lg"
//                 >
//                   <FaComments className="inline mr-2" />
//                   Start Chat
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Empty State (if no astrologers) */}
//       {astrologerData?.length === 0 && (
//         <div className="max-w-7xl mx-auto text-center py-12">
//           <FaUserCircle className="text-gray-300 text-6xl mx-auto mb-4" />
//           <h3 className="text-xl text-gray-600 mb-2">
//             No Astrologers Available
//           </h3>
//           <p className="text-gray-500">
//             Please check back later for available astrologers.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWithAstrologers;

import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaComments,
  FaPhone,
  FaStar,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import ChatIcon from "../../components/ChatIcon";

const ChatWithAstrologers = () => {
  const navigate = useNavigate();
  const [astrologerData, setAstrologerData] = useState(null);
  const [openChats, setOpenChats] = useState(false);
  useEffect(() => {
    const fetchAllAstrologer = async () => {
      const response = await axiosInstance.get(
        API_PATH.CALL.GET_ACTIVE_ASTROLOGER
      );
      setAstrologerData(response.data.data);
    };
    fetchAllAstrologer();
  }, []);

  const handleChatClick = (astrologerId, astrologerName) => {
    navigate(`/chat/${astrologerId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-extrabold text-yellow-900 tracking-tight mb-3 drop-shadow-md">
            Find Your Astrologer
          </h1>
          <p className="text-yellow-800 text-lg leading-relaxed">
            Connect with experienced astrologers for guidance and insights
          </p>
        </div>
        <div>
          <ChatIcon open={openChats} setOpen={setOpenChats} />
        </div>
      </div>

      {/* Astrologer Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {astrologerData?.map((astrologer) => (
          <div
            key={astrologer._id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-yellow-300 overflow-hidden flex flex-col"
          >
            {/* Card Header */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start space-x-4 mb-5">
                <div className="flex-shrink-0 text-yellow-600">
                  <FaUserCircle className="text-6xl drop-shadow-sm" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold text-yellow-900 tracking-wide">
                      {astrologer.name}
                    </h3>
                    {astrologer.isApprovedByAdmin && (
                      <div className="flex items-center bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm select-none">
                        <FaCheckCircle className="mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-yellow-700 mt-1 font-medium">
                    {astrologer.location}
                  </p>
                  <p className="text-xs text-yellow-600 mt-0.5">
                    {astrologer.gender} • {astrologer.email}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center space-x-2 mb-5">
                <FaStar className="text-yellow-500 text-lg" />
                <span className="text-yellow-800 font-semibold">
                  {astrologer.experience} years experience
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-4 mb-6 shadow-inner">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <FaComments className="text-yellow-600 text-lg" />
                    <span className="text-yellow-900 font-semibold">
                      ₹{astrologer.pricing.chatPerMin}/min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-yellow-600 text-lg" />
                    <span className="text-yellow-900 font-semibold">
                      ₹{astrologer.pricing.callPerMin}/min
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FaGlobe className="text-yellow-700 text-base" />
                  <span className="text-yellow-900 font-semibold text-sm">
                    Languages
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {astrologer?.languages?.map((language, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-6 flex-grow">
                <span className="text-yellow-900 font-semibold text-sm mb-3 inline-block">
                  Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {astrologer?.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => handleChatClick(astrologer._id, astrologer.name)}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-60 flex items-center justify-center space-x-2"
              >
                <FaComments className="text-lg" />
                <span>Start Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no astrologers) */}
      {astrologerData?.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20 text-yellow-800 select-none">
          <FaUserCircle className="mx-auto text-yellow-300 text-8xl mb-6 drop-shadow-md" />
          <h3 className="text-2xl font-semibold mb-3">
            No Astrologers Available
          </h3>
          <p className="text-yellow-700 text-lg max-w-md mx-auto">
            Please check back later for available astrologers.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWithAstrologers;
