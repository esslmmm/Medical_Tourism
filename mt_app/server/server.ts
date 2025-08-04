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
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Types
interface Message {
  message_id: number;
  chat_id: number;
  sender_id: string | number;
  receiver_id: number;
  message: string;
  message_type?: 'TEXT' | 'IMAGE' | 'File';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  timestamp: string;
}

interface User {
  userId: string | number;
  socketId: string;
  isOnline: boolean;
  lastSeen: Date;
}

// Store active users and their rooms
const activeUsers = new Map<string | number, User>();
const userRooms = new Map<string, string | number>(); // socketId -> userId

// Helper functions
const getUserRoom = (userId: string | number): string => `user_${userId}`;
const getChatRoom = (chatId: number): string => `chat_${chatId}`;

const addUser = (userId: string | number, socketId: string) => {
  const user: User = {
    userId,
    socketId,
    isOnline: true,
    lastSeen: new Date()
  };
  
  activeUsers.set(userId, user);
  userRooms.set(socketId, userId);
  
  console.log(`👤 User ${userId} joined (Socket: ${socketId}). Total users: ${activeUsers.size}`);
};

const removeUser = (socketId: string) => {
  const userId = userRooms.get(socketId);
  if (userId) {
    const user = activeUsers.get(userId);
    if (user) {
      user.isOnline = false;
      user.lastSeen = new Date();
      // Keep user info for a while (don't delete immediately)
      setTimeout(() => {
        activeUsers.delete(userId);
      }, 300000); // Remove after 5 minutes
    }
    userRooms.delete(socketId);
    console.log(`👤 User ${userId} left (Socket: ${socketId}). Total users: ${activeUsers.size}`);
  }
};

const isUserOnline = (userId: string | number): boolean => {
  const user = activeUsers.get(userId);
  return user ? user.isOnline : false;
};

// Socket connection handling
io.on("connection", (socket: Socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  // Handle user joining
  socket.on("joinRoom", (userId: string | number) => {
    if (!userId) {
      console.error("❌ No userId provided for joinRoom");
      return;
    }

    // Remove user from previous socket if exists
    const existingUser = activeUsers.get(userId);
    if (existingUser && existingUser.socketId !== socket.id) {
      io.to(existingUser.socketId).disconnectSockets();
    }

    addUser(userId, socket.id);
    
    // Join user-specific room
    const userRoom = getUserRoom(userId);
    socket.join(userRoom);
    
    // Emit user status
    socket.emit("connectionStatus", { connected: true, userId });
    
    // Notify others about user coming online (optional)
    socket.broadcast.emit("userStatusChange", { 
      userId, 
      isOnline: true, 
      timestamp: new Date().toISOString() 
    });
  });

  // Handle joining specific chat rooms
  socket.on("joinChat", (chatId: number) => {
    if (!chatId) {
      console.error("❌ No chatId provided for joinChat");
      return;
    }

    const chatRoom = getChatRoom(chatId);
    socket.join(chatRoom);
    console.log(`💬 Socket ${socket.id} joined chat room: ${chatRoom}`);
  });

  // Handle leaving chat rooms
  socket.on("leaveChat", (chatId: number) => {
    if (!chatId) return;
    
    const chatRoom = getChatRoom(chatId);
    socket.leave(chatRoom);
    console.log(`💬 Socket ${socket.id} left chat room: ${chatRoom}`);
  });

  // Handle sending messages
  socket.on("sendMessage", (message: Message) => {
    try {
      console.log("📨 Message received:", {
        from: message.sender_id,
        to: message.receiver_id,
        chat: message.chat_id,
        type: message.message_type || 'TEXT',
        content: message.message_type === 'TEXT' 
          ? message.message.substring(0, 50) + (message.message.length > 50 ? "..." : "")
          : `[${message.message_type?.toUpperCase()}] ${message.file_name || message.message}`
      });

      // Validate message
      if (!message.sender_id || !message.receiver_id || !message.chat_id) {
        console.error("❌ Invalid message format:", message);
        socket.emit("messageError", { error: "Invalid message format" });
        return;
      }

      // For file messages, validate file_url
      if (message.message_type && message.message_type !== 'TEXT' && !message.file_url) {
        console.error("❌ File URL missing for file message:", message);
        socket.emit("messageError", { error: "File URL is required for file messages" });
        return;
      }

      // Send to specific users instead of broadcasting to everyone
      const senderRoom = getUserRoom(message.sender_id);
      const receiverRoom = getUserRoom(message.receiver_id);
      const chatRoom = getChatRoom(message.chat_id);

      // Send to sender (confirmation)
      io.to(senderRoom).emit("receiveMessage", message);
      
      // Send to receiver (if different from sender)
      if (String(message.sender_id) !== String(message.receiver_id)) {
        io.to(receiverRoom).emit("receiveMessage", message);
      }

      // Also send to chat room (for group chat functionality if needed)
      socket.to(chatRoom).emit("receiveMessage", message);

      // Send delivery confirmation
      socket.emit("messageDelivered", { 
        message_id: message.message_id,
        delivered: isUserOnline(message.receiver_id),
        timestamp: new Date().toISOString(),
        message_type: message.message_type || 'text'
      });

      // Log file upload success
      if (message.message_type && message.message_type !== 'TEXT') {
        console.log(`📎 File message delivered: ${message.file_name} (${message.file_type})`);
      }

      console.log(`✅ Message delivered to rooms: ${senderRoom}, ${receiverRoom}, ${chatRoom}`);

    } catch (error) {
      console.error("❌ Error handling message:", error);
      socket.emit("messageError", { error: "Failed to process message" });
    }
  });

  // Handle typing indicators
  socket.on("typing", (data: { chatId: number; userId: string | number; isTyping: boolean }) => {
    const chatRoom = getChatRoom(data.chatId);
    socket.to(chatRoom).emit("userTyping", data);
  });

  // Handle message read receipts
  socket.on("messageRead", (data: { messageId: number; userId: string | number; chatId: number }) => {
    const chatRoom = getChatRoom(data.chatId);
    socket.to(chatRoom).emit("messageReadReceipt", data);
  });

  // Handle user status requests
  socket.on("getUserStatus", (userId: string | number, callback) => {
    const isOnline = isUserOnline(userId);
    const user = activeUsers.get(userId);
    callback({
      isOnline,
      lastSeen: user?.lastSeen || null
    });
  });

  // Handle getting online users
  socket.on("getOnlineUsers", (callback) => {
    const onlineUsers = Array.from(activeUsers.values())
      .filter(user => user.isOnline)
      .map(user => ({
        userId: user.userId,
        lastSeen: user.lastSeen
      }));
    callback(onlineUsers);
  });

  // Handle heartbeat/ping
  socket.on("ping", (callback) => {
    callback("pong");
  });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log(`❌ Socket ${socket.id} disconnected: ${reason}`);
    
    const userId = userRooms.get(socket.id);
    if (userId) {
      // Notify others about user going offline
      socket.broadcast.emit("userStatusChange", { 
        userId, 
        isOnline: false, 
        timestamp: new Date().toISOString() 
      });
    }
    
    removeUser(socket.id);
  });

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error(`🚨 Connection error for ${socket.id}:`, error);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    activeConnections: io.engine.clientsCount,
    activeUsers: activeUsers.size
  });
});

// Get active users endpoint
app.get("/api/active-users", (req, res) => {
  const onlineUsers = Array.from(activeUsers.values())
    .filter(user => user.isOnline)
    .map(user => ({
      userId: user.userId,
      lastSeen: user.lastSeen
    }));
  
  res.json({ 
    count: onlineUsers.length, 
    users: onlineUsers 
  });
});

// Periodic cleanup of inactive users
setInterval(() => {
  const now = new Date();
  let cleaned = 0;
  
  for (const [userId, user] of activeUsers.entries()) {
    if (!user.isOnline && now.getTime() - user.lastSeen.getTime() > 1800000) { // 30 minutes
      activeUsers.delete(userId);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`🧹 Cleaned up ${cleaned} inactive users. Active users: ${activeUsers.size}`);
  }
}, 600000); // Run every 10 minutes

// Error handling
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`✅ Socket.IO server running at http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`👥 Active users endpoint: http://localhost:${PORT}/api/active-users`);
});