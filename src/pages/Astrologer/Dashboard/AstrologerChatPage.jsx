// import { useContext, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { socket } from "../../../socket/socket";
// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATH } from "../../../utils/apiPath";
// import { UserContext } from "../../../Context/UserContext";
// export default function AstrologerChatPage() {
//   const { userId } = useParams();
//   const { user } = useContext(UserContext);
//   const astrologerId = user?._id;

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const scrollRef = useRef(null);

//   // Register astrologer on connect
//   useEffect(() => {
//     if (!astrologerId) return;
//     socket.on("connect", () => {
//       socket.emit("register", astrologerId);
//     });
//   }, [astrologerId]);
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);
//   // Load messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       console.log(astrologerId, userId);
//       try {
//         const res = await axiosInstance.get(
//           `${API_PATH.CHAT.GET_CHAT}/${userId}/${astrologerId}`
//         );
//         console.log(res.data);
//         setMessages(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchMessages();
//   }, [userId, astrologerId]);

//   // // Receive messages
//   // useEffect(() => {
//   //   socket.on("receive_message", (msg) => {
//   //     if (
//   //       (msg.sender?._id === userId && msg.receiver?._id === astrologerId) ||
//   //       (msg.sender?._id === astrologerId && msg.receiver?._id === userId)
//   //     ) {
//   //       setMessages((prev) => [...prev, msg]);
//   //     }
//   //   });
//   // }, [userId, astrologerId]);

//   useEffect(() => {
//     const handleReceiveMessage = (msg) => {
//       if (
//         (msg.sender?._id === userId && msg.receiver?._id === astrologerId) ||
//         (msg.sender?._id === astrologerId && msg.receiver?._id === userId)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     socket.on("receive_message", handleReceiveMessage);

//     return () => {
//       socket.off("receive_message", handleReceiveMessage);
//     };
//   }, [userId, astrologerId]);

//   // const sendMessage = () => {
//   //   console.log(text);
//   //   if (!text.trim()) return;

//   //   socket.emit("send_message", {
//   //     senderId: astrologerId,
//   //     receiverId: userId,
//   //     text: text,
//   //   });
//   //   setText("");
//   // };

//   const sendMessage = () => {
//     if (!text.trim()) return;

//     const newMsg = {
//       sender: { _id: astrologerId },
//       receiver: { _id: userId },
//       text: text,
//     };

//     socket.emit("send_message", {
//       senderId: astrologerId,
//       receiverId: userId,
//       text: text,
//     });

//     // Add the message locally
//     setMessages((prev) => [...prev, newMsg]);

//     setText("");
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-1 overflow-auto p-4">
//         {messages.map((m, i) => {
//           const isMe = String(m.sender?._id) === String(astrologerId);
//           return (
//             <div
//               key={i}
//               className={`flex mb-2 ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 max-w-xs break-words rounded-2xl ${
//                   isMe
//                     ? "bg-yellow-400 text-black rounded-br-none"
//                     : "bg-gray-200 text-black rounded-bl-none"
//                 }`}
//               >
//                 {m.text}
//               </div>
//             </div>
//           );
//         })}

//         <div ref={scrollRef} />
//       </div>
//       <div className="p-4 border-t flex gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border flex-1 rounded px-2"
//           placeholder="Type a reply..."
//         />
//         <button onClick={sendMessage} className="bg-yellow-400 px-4 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../../socket/socket";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import { UserContext } from "../../../Context/UserContext";

export default function AstrologerChatPage() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const astrologerId = user?._id;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // Register astrologer on connect
  useEffect(() => {
    if (!astrologerId) return;
    socket.on("connect", () => {
      socket.emit("register", astrologerId);
    });
  }, [astrologerId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_PATH.CHAT.GET_CHAT}/${userId}/${astrologerId}`
        );
        setMessages(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [userId, astrologerId]);

  // Receive messages via socket
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      if (
        (msg.sender?._id === userId && msg.receiver?._id === astrologerId) ||
        (msg.sender?._id === astrologerId && msg.receiver?._id === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [userId, astrologerId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMsg = {
      sender: { _id: astrologerId },
      receiver: { _id: userId },
      text: text,
    };

    socket.emit("send_message", {
      senderId: astrologerId,
      receiverId: userId,
      text: text,
    });

    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen bg-yellow-50">
      {/* Messages container */}
      <div className="flex-1 overflow-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-yellow-100">
        {messages.map((m, i) => {
          const isMe = String(m.sender?._id) === String(astrologerId);
          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-5 py-3 max-w-xs break-words rounded-2xl shadow-sm ${
                  isMe
                    ? "bg-yellow-400 text-black rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        <div ref={scrollRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-yellow-300 p-4 bg-white flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-yellow-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          placeholder="Type a reply..."
          autoFocus
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold rounded-lg px-6 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
