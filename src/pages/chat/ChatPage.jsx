// import { useContext, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../utils/apiPath";
// import { socket } from "../../socket/socket";
// import toast from "react-hot-toast";
// import { UserContext } from "../../Context/UserContext";

// export default function ChatPage() {
//   const { astrologerId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef(null);
//   const isInitialLoad = useRef(true);

//   const { user } = useContext(UserContext);
//   const userId = user?._id;

//   // Register user on socket connect/reconnect
//   useEffect(() => {
//     if (!userId) return;

//     if (!socket.connected) {
//       socket.connect();
//     }

//     const registerUser = () => {
//       socket.emit("register", userId);
//       console.log("✅ Registered user on socket:", userId);
//     };

//     socket.on("connect", registerUser);

//     return () => {
//       socket.off("connect", registerUser);
//       // ❌ Removed socket.disconnect() so socket persists across pages
//     };
//   }, [userId]);

//   // Fetch existing messages
//   useEffect(() => {
//     if (!userId) return;
//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(
//           `${API_PATH.CHAT.GET_CHAT}/${userId}/${astrologerId}`
//         );
//         const data = res?.data || [];
//         // ✅ Normalize message text
//         const normalized = data.map((msg) => ({
//           ...msg,
//           text: msg.text || msg.message,
//         }));
//         setMessages(normalized);
//       } catch (err) {
//         console.error("fetch chat error:", err);
//         setMessages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();
//   }, [userId, astrologerId]);

//   // Socket listeners for incoming & sent messages
//   useEffect(() => {
//     if (!userId) return;

//     const onReceive = (msg) => {
//       msg.text = msg.text || msg.message; // normalize
//       if (
//         (msg.sender?._id === astrologerId && msg.receiver?._id === userId) ||
//         (msg.sender?._id === userId && msg.receiver?._id === astrologerId)
//       ) {
//         setMessages((prev) => {
//           if (prev.some((m) => m._id === msg._id)) return prev; // avoid duplicates
//           return [...prev, msg];
//         });
//       }
//     };

//     const onSent = (msg) => {
//       msg.text = msg.text || msg.message; // normalize
//       setMessages((prev) => {
//         const replaced = prev.map((m) =>
//           m._id?.startsWith("temp-") &&
//           m.text === msg.text &&
//           m.sender?._id === userId
//             ? msg
//             : m
//         );
//         // extra duplicate check
//         if (replaced.some((m) => m._id === msg._id)) return replaced;
//         return [...replaced, msg];
//       });
//     };

//     socket.on("receive_message", onReceive);
//     socket.on("message_sent", onSent);

//     return () => {
//       socket.off("receive_message", onReceive);
//       socket.off("message_sent", onSent);
//     };
//   }, [userId, astrologerId]);

//   // Auto-scroll on new messages (skip first load)
//   useEffect(() => {
//     if (isInitialLoad.current) {
//       isInitialLoad.current = false;
//       return;
//     }
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // sending messages
//   const sendMessage = () => {
//     toast.success("hi");
//     console.log(`message`, text, `userid`, userId);
//     if (!text.trim() || !userId) return;

//     const tempId = `temp-${Date.now()}`;
//     const optimistic = {
//       _id: tempId,
//       sender: { _id: userId, name: user?.name },
//       receiver: { _id: astrologerId },
//       text,
//       createdAt: new Date().toISOString(),
//       pending: true,
//     };

//     setMessages((prev) => [...prev, optimistic]);

//     const payload = {
//       senderId: userId,
//       receiverId: astrologerId,
//       text,
//     };

//     socket.emit("send_message", payload, (ack) => {
//       if (ack?.status !== "ok") {
//         setMessages((prev) =>
//           prev.map((m) =>
//             m._id === tempId ? { ...m, pending: false, failed: true } : m
//           )
//         );
//       }
//     });

//     setText("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md flex flex-col h-[80vh]">
//         {/* Header */}
//         <div className="p-4 border-b flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">Chat with Astrologer</h2>
//             <p className="text-sm text-gray-500">
//               Astrologer ID: {astrologerId}
//             </p>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="p-4 overflow-auto flex-1">
//           {loading ? (
//             <div className="text-center text-sm text-gray-500">Loading...</div>
//           ) : messages.length === 0 ? (
//             <div className="text-center text-gray-500">
//               No messages yet. Say hi 👋
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {messages.map((m) => {
//                 const isMe = String(m.sender?._id) === String(userId);
//                 return (
//                   <div
//                     key={m._id}
//                     className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[70%] px-4 py-2 rounded-lg break-words ${
//                         isMe
//                           ? "bg-yellow-400 text-black"
//                           : "bg-gray-100 text-gray-900"
//                       }`}
//                     >
//                       <div className="text-sm">{m.text}</div>
//                       <div className="text-xs text-gray-600 mt-1 text-right">
//                         {new Date(m.createdAt).toLocaleTimeString()}
//                         {m.pending && " • sending..."}
//                         {m.failed && " • failed"}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={scrollRef} />
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t">
//           <div className="flex gap-2">
//             <input
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 border rounded-lg px-3 py-2"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") sendMessage();
//               }}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { socket } from "../../socket/socket";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function ChatPage() {
  const { astrologerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const isInitialLoad = useRef(true);

  const { user } = useContext(UserContext);
  const userId = user?._id;

  // Register user on socket connect/reconnect
  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const registerUser = () => {
      socket.emit("register", userId);
      console.log("✅ Registered user on socket:", userId);
    };

    socket.on("connect", registerUser);

    return () => {
      socket.off("connect", registerUser);
      // socket persists across pages - no disconnect here
    };
  }, [userId]);

  // Fetch existing messages
  useEffect(() => {
    if (!userId) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `${API_PATH.CHAT.GET_CHAT}/${userId}/${astrologerId}`
        );
        const data = res?.data || [];
        const normalized = data.map((msg) => ({
          ...msg,
          text: msg.text || msg.message,
        }));
        setMessages(normalized);
      } catch (err) {
        console.error("fetch chat error:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [userId, astrologerId]);

  // Socket listeners for incoming & sent messages
  useEffect(() => {
    if (!userId) return;

    const onReceive = (msg) => {
      msg.text = msg.text || msg.message;
      if (
        (msg.sender?._id === astrologerId && msg.receiver?._id === userId) ||
        (msg.sender?._id === userId && msg.receiver?._id === astrologerId)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    };

    const onSent = (msg) => {
      msg.text = msg.text || msg.message;
      setMessages((prev) => {
        const replaced = prev.map((m) =>
          m._id?.startsWith("temp-") &&
          m.text === msg.text &&
          m.sender?._id === userId
            ? msg
            : m
        );
        if (replaced.some((m) => m._id === msg._id)) return replaced;
        return [...replaced, msg];
      });
    };

    socket.on("receive_message", onReceive);
    socket.on("message_sent", onSent);

    return () => {
      socket.off("receive_message", onReceive);
      socket.off("message_sent", onSent);
    };
  }, [userId, astrologerId]);

  // Auto-scroll on new messages (skip first load)
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const sendMessage = () => {
    if (!text.trim() || !userId) return;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      sender: { _id: userId, name: user?.name },
      receiver: { _id: astrologerId },
      text,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((prev) => [...prev, optimistic]);

    const payload = {
      senderId: userId,
      receiverId: astrologerId,
      text,
    };

    socket.emit("send_message", payload, (ack) => {
      if (ack?.status !== "ok") {
        setMessages((prev) =>
          prev.map((m) =>
            m._id === tempId ? { ...m, pending: false, failed: true } : m
          )
        );
        toast.error("Failed to send message");
      }
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">
        {/* Header */}
        <header className="p-5 border-b border-yellow-300">
          <h2 className="text-2xl font-semibold text-gray-900">
            Chat with Astrologer
          </h2>
          <p className="text-sm text-yellow-700 mt-1">
            Astrologer ID: {astrologerId}
          </p>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-yellow-100 bg-yellow-50">
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-yellow-600 font-medium">
              No messages yet. Say hi 👋
            </p>
          ) : (
            messages.map((m) => {
              const isMe = String(m.sender?._id) === String(userId);
              return (
                <div
                  key={m._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-5 py-3 rounded-2xl break-words shadow-sm ${
                      isMe
                        ? "bg-yellow-400 text-black rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{m.text}</p>
                    <div className="text-xs mt-1 text-gray-600 text-right select-none">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {m.pending && " • sending..."}
                      {m.failed && " • failed"}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </main>

        {/* Input */}
        <footer className="p-4 border-t border-yellow-300 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-yellow-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              aria-label="Type a message"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg px-6 py-2 shadow-md transition-colors"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
