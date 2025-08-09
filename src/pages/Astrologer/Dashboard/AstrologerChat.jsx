// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATH } from "../../../utils/apiPath";
// import { UserContext } from "../../../Context/UserContext";

// export default function AstrologerChatList() {
//   const { user } = useContext(UserContext);
//   const astrologerId = user._id;

//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await axiosInstance.post(API_PATH.CHAT.GET_ASTRO_CHATS, {
//           astrologerId,
//         });
//         console.log(res.data); // see data shape
//         setChats(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchChats();
//   }, [astrologerId]);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-4">All Chats</h2>
//       {chats.length === 0 ? (
//         <div>No chats yet.</div>
//       ) : (
//         chats.map((chat) => (
//           <Link
//             key={chat.user}
//             to={`/astrologer/chat/${chat.user}`} // now uses userId directly
//             className="block p-3 border-b hover:bg-gray-100"
//           >
//             <div className="font-medium">{chat.user}</div>{" "}
//             {/* placeholder until you fetch user name */}
//             <div className="text-sm text-gray-500">{chat.lastMessage}</div>
//           </Link>
//         ))
//       )}
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import { UserContext } from "../../../Context/UserContext";
import { FaUserCircle, FaComments } from "react-icons/fa";

export default function AstrologerChatList() {
  const { user } = useContext(UserContext);
  const astrologerId = user._id;

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axiosInstance.post(API_PATH.CHAT.GET_ASTRO_CHATS, {
          astrologerId,
        });
        setChats(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChats();
  }, [astrologerId]);

  return (
    <div className="p-6  mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-extrabold text-yellow-900 mb-6 border-b border-yellow-300 pb-3">
        All Chats
      </h2>

      {chats.length === 0 ? (
        <div className="text-center text-yellow-700 py-16 flex flex-col items-center space-y-4">
          <FaComments className="text-6xl text-yellow-400 animate-pulse" />
          <p className="text-lg font-medium">No chats yet.</p>
          <p className="text-yellow-600 max-w-xs text-center">
            When users start chatting, you will see conversations here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-yellow-200">
          {chats.map((chat) => (
            <li key={chat.user}>
              <Link
                to={`/astrologer/chat/${chat.user}`}
                className="flex items-center gap-4 p-4 hover:bg-yellow-50 rounded-lg transition"
              >
                <FaUserCircle className="text-yellow-500 text-4xl flex-shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-yellow-900 truncate">
                    {/* TODO: Replace chat.user with username if available */}
                    User ID: {chat.user}
                  </span>
                  <span
                    className="text-sm text-yellow-700 truncate"
                    title={chat.lastMessage}
                  >
                    {chat.lastMessage || "No messages yet."}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
