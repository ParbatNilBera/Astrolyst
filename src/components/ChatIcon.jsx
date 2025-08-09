// // src/components/ChatIcon.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { FaComments } from "react-icons/fa";
// // import axiosInstance from "../utils/axiosInstance";
// import { API_PATH } from "../utils/apiPath";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";

// export default function ChatIcon() {
//   const [open, setOpen] = useState(false);
//   const [convs, setConvs] = useState([]);
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     if (!user) return;
//     const fetchConvs = async () => {
//       try {
//         const res = await axiosInstance.post(API_PATH.CHAT.GET_CONVERSATIONS, {
//           userId: user._id,
//         });
//         setConvs(res.data || []);
//       } catch (err) {
//         console.error("fetch conversations error", err);
//       }
//     };
//     fetchConvs();
//     // optionally poll or use socket to refresh conversations when new message arrives
//   }, [user]);

//   return (
//     <div className="relative">
//       <button
//         className="p-2 rounded-full bg-yellow-400"
//         onClick={() => setOpen((v) => !v)}
//       >
//         <FaComments />
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
//           <div className="p-3 border-b font-medium">Chats</div>
//           <div className="max-h-64 overflow-auto">
//             {convs.length === 0 && (
//               <div className="p-3 text-sm text-gray-500">No conversations</div>
//             )}
//             {convs.map((c) => {
//               const other = c.user;
//               const last = c.lastMessage;
//               return (
//                 <div
//                   key={other._id}
//                   className="p-3 hover:bg-gray-50 cursor-pointer"
//                   onClick={() => {
//                     setOpen(false);
//                     navigate(`/chat/${other._id}`);
//                   }}
//                 >
//                   <div className="flex justify-between">
//                     <div className="font-medium">{other.name}</div>
//                     <div className="text-xs text-gray-500">
//                       {new Date(last.createdAt).toLocaleTimeString()}
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-600 truncate">
//                     {last.text}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { API_PATH } from "../utils/apiPath";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function ChatIcon() {
  const [open, setOpen] = useState(false);
  const [convs, setConvs] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const fetchConvs = async () => {
      try {
        const res = await axiosInstance.post(API_PATH.CHAT.GET_CONVERSATIONS, {
          userId: user._id,
        });
        setConvs(res.data || []);
      } catch (err) {
        console.error("fetch conversations error", err);
      }
    };
    fetchConvs();
  }, [user]);

  return (
    <div className="relative">
      <button
        className="p-3 rounded-full bg-yellow-400 text-white shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle chat conversations"
        title="Chats"
      >
        <FaComments className="text-xl" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-yellow-300 rounded-xl shadow-2xl z-50">
          <div className="p-4 border-b border-yellow-200 font-semibold text-yellow-900 text-lg">
            Chats
          </div>
          <div className="max-h-64 overflow-y-auto">
            {convs.length === 0 && (
              <div className="p-4 text-center text-sm text-yellow-700">
                No conversations
              </div>
            )}
            {convs.map((c) => {
              const other = c.user;
              const last = c.lastMessage;
              return (
                <div
                  key={other._id}
                  className="p-4 hover:bg-yellow-50 cursor-pointer transition-colors rounded-b-md last:rounded-b-xl"
                  onClick={() => {
                    setOpen(false);
                    navigate(`/chat/${other._id}`);
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-semibold text-yellow-900 truncate">
                      {other.name}
                    </div>
                    <div className="text-xs text-yellow-600 select-none whitespace-nowrap">
                      {new Date(last.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-sm text-yellow-800 truncate">
                    {last.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
