import { io } from "socket.io-client";

const socket = io("https://nexus-production-121c.up.railway.app");

export default socket;