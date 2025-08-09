// src/socket/socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/apiPath";

export const socket = io(BASE_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export function connectSocket(userId) {
  if (!userId) return;

  if (!socket.connected) {
    socket.connect();
  }

  socket.once("connect", () => {
    socket.emit("register", userId);
    console.log("✅ Socket connected:", socket.id, "User:", userId);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
  });

  socket.io.on("reconnect", () => {
    console.log("🔄 Socket reconnected, re-registering user...");
    socket.emit("register", userId);
  });
}
