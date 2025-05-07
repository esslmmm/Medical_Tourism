import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Type for incoming message
interface Message {
  message_id: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
}

io.on("connection", (socket: Socket) => {
  console.log("🔌 A user connected");

  socket.on("sendMessage", (msg: Message) => {
    console.log("📨 Message received:", msg);
    io.emit("receiveMessage", msg); // Broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("✅ Socket.IO server running at http://localhost:3001");
});
