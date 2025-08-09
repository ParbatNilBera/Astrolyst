// src/socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/apiPath";

const SOCKET_URL = BASE_URL;
export const socket = io(SOCKET_URL, { autoConnect: false });

export function connectSocket(userId) {
  if (!userId) return;
  if (!socket.connected) {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("register", userId);
      console.log("socket connected", socket.id);
    });
  } else {
    socket.emit("register", userId);
  }
}
