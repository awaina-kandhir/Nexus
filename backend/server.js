import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
dotenv.config();

connectDB();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://nexus-flax-mu.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexus-flax-mu.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
import path from "path";
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.send("Nexus Backend is Running...");
});

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.id} joined room ${roomId}`);

    // Notify others that someone joined
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);

    console.log(`${socket.id} left room ${roomId}`);
  });

  // WebRTC Offer
  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data);
  });

  // WebRTC Answer
  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data);
  });

  // ICE Candidates
  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

socket.on("disconnect", () => {
  console.log("User Disconnected:", socket.id);
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});