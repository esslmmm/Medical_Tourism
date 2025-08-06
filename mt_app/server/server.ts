import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both origins
  credentials: true
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  connectTimeout: 60000,
  path: '/socket.io/',
  serveClient: true,
  cookie: true
});

// Types
interface Message {
  message_id: number;
  chat_id: number;
  sender_id: string | number;
  receiver_id?: number;
  message: string;
  message_type?: 'TEXT' | 'IMAGE' | 'FILE';
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
  joinedAt: Date;
  lastSeen: Date;
  rooms: Set<string>;
}

// Store active users and their rooms
const activeUsers = new Map<string | number, User>();
const userSockets = new Map<string, string | number>(); // socketId -> userId

// Helper functions
const getUserRoom = (userId: string | number): string => `user_${userId}`;
const getChatRoom = (chatId: number): string => `chat_${chatId}`;

// FIXED: Improved user management
const addUser = (userId: string | number, socketId: string): User => {
  // Remove existing user with different socket
  const existingUser = activeUsers.get(userId);
  if (existingUser && existingUser.socketId !== socketId) {
    console.log(`🔄 User ${userId} switching sockets: ${existingUser.socketId} -> ${socketId}`);
    userSockets.delete(existingUser.socketId);
  }

  const user: User = {
    userId,
    socketId,
    isOnline: true,
    joinedAt: new Date(),
    lastSeen: new Date(),
    rooms: new Set([getUserRoom(userId)])
  };
  
  activeUsers.set(userId, user);
  userSockets.set(socketId, userId);
  
  console.log(`👤 User ${userId} connected (Socket: ${socketId}). Total users: ${activeUsers.size}`);
  return user;
};

const removeUser = (socketId: string): string | number | null => {
  const userId = userSockets.get(socketId);
  if (!userId) return null;
  
  const user = activeUsers.get(userId);
  if (user) {
    user.isOnline = false;
    user.lastSeen = new Date();
    
    // Clean up after 5 minutes
    setTimeout(() => {
      if (activeUsers.get(userId)?.socketId === socketId) {
        activeUsers.delete(userId);
      }
    }, 300000);
  }
  
  userSockets.delete(socketId);
  console.log(`👤 User ${userId} disconnected (Socket: ${socketId}). Total users: ${activeUsers.size}`);
  return userId;
};

const isUserOnline = (userId: string | number): boolean => {
  const user = activeUsers.get(userId);
  return user?.isOnline || false;
};

const getUserBySocketId = (socketId: string): User | null => {
  const userId = userSockets.get(socketId);
  return userId ? activeUsers.get(userId) || null : null;
};

// FIXED: Main socket connection handler
io.on("connection", (socket: Socket) => {
  console.log(`🔌 New connection: ${socket.id} from ${socket.handshake.address}`);
  
  let currentUserId: string | number | null = null;

  // FIXED: Handle joinRoom event properly
  socket.on("joinRoom", (userId: string | number) => {
    try {
      if (!socket.connected) {
        console.error("❌ Socket not connected when trying to join room");
        return;
      }
      
      if (!userId) {
        console.error("❌ No userId provided");
        socket.emit("error", { message: "userId is required" });
        return;
      }

      console.log(`📥 User ${userId} joining room via socket ${socket.id}`);
      
      // Store current user ID
      currentUserId = userId;
      
      // Add user to tracking
      const user = addUser(userId, socket.id);
      
      // Join user room
      const userRoom = getUserRoom(userId);
      socket.join(userRoom);
      user.rooms.add(userRoom);
      
      console.log(`✅ User ${userId} joined room: ${userRoom}`);
      
      // Send connection confirmation
      socket.emit("connectionStatus", { 
        connected: true, 
        userId,
        socketId: socket.id,
        timestamp: new Date().toISOString()
      });
      
      // Notify others that user is online
      socket.broadcast.emit("userStatusChange", { 
        userId, 
        isOnline: true, 
        timestamp: new Date().toISOString() 
      });

    } catch (error) {
      console.error(`❌ Error in joinRoom for user ${userId}:`, error);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  // FIXED: Handle chat room joining
  socket.on("joinChat", (chatId: number) => {
    try {
      if (!chatId) {
        console.error("❌ No chatId provided");
        return;
      }

      const chatRoom = getChatRoom(chatId);
      socket.join(chatRoom);
      
      const user = getUserBySocketId(socket.id);
      if (user) {
        user.rooms.add(chatRoom);
      }
      
      console.log(`💬 Socket ${socket.id} joined chat room: ${chatRoom}`);
      
    } catch (error) {
      console.error(`❌ Error joining chat ${chatId}:`, error);
    }
  });

  // FIXED: Handle chat room leaving
  socket.on("leaveChat", (chatId: number) => {
    try {
      if (!chatId) return;
      
      const chatRoom = getChatRoom(chatId);
      socket.leave(chatRoom);
      
      const user = getUserBySocketId(socket.id);
      if (user) {
        user.rooms.delete(chatRoom);
      }
      
      console.log(`💬 Socket ${socket.id} left chat room: ${chatRoom}`);
      
    } catch (error) {
      console.error(`❌ Error leaving chat ${chatId}:`, error);
    }
  });

  // FIXED: Handle sending messages
  socket.on("sendMessage", (message: Message) => {
    handleMessage(socket, message);
  });

  // Handle alternative message event
  socket.on("sendMessageToUser", (message: Message) => {
    handleMessage(socket, message);
  });

  // FIXED: Centralized message handling
  function handleMessage(socket: Socket, message: Message) {
    try {
      if (!socket.connected) {
        console.error("❌ Socket not connected when trying to send message");
        return;
      }

      console.log("📨 Received message:", {
        messageId: message.message_id,
        from: message.sender_id,
        to: message.receiver_id,
        chat: message.chat_id,
        type: message.message_type || 'TEXT',
        preview: message.message_type === 'TEXT' 
          ? message.message.substring(0, 30) + (message.message.length > 30 ? "..." : "")
          : `[${message.message_type}] ${message.file_name || message.message}`
      });

      // Validate required fields
      if (!message.sender_id || !message.chat_id || !message.message_id) {
        console.error("❌ Invalid message format - missing required fields");
        socket.emit("messageError", { 
          error: "sender_id, chat_id, and message_id are required",
          message_id: message.message_id 
        });
        return;
      }

      // Validate file messages
      if (message.message_type && message.message_type !== 'TEXT' && !message.file_url) {
        console.error("❌ File URL missing for file message");
        socket.emit("messageError", { 
          error: "file_url is required for file messages",
          message_id: message.message_id 
        });
        return;
      }

      // Get rooms to send to
      const chatRoom = getChatRoom(message.chat_id);
      const senderRoom = getUserRoom(message.sender_id);
      
      // Send to chat room and ensure delivery
      io.in(chatRoom).fetchSockets().then((sockets) => {
        console.log(`📤 Sending message to ${sockets.length} sockets in room ${chatRoom}`);
        io.to(chatRoom).emit("receiveMessage", message);
      });
      
      // Also send to sender's room for confirmation
      io.in(senderRoom).fetchSockets().then((sockets) => {
        console.log(`📤 Sending confirmation to sender room ${senderRoom}`);
        io.to(senderRoom).emit("receiveMessage", message);
      });
      
      // If receiver_id is specified, also send to their room
      if (message.receiver_id && message.receiver_id !== message.sender_id) {
        const receiverRoom = getUserRoom(message.receiver_id);
        io.to(receiverRoom).emit("receiveMessage", message);
        
        console.log(`✅ Message sent to rooms: ${chatRoom}, ${senderRoom}, ${receiverRoom}`);
      } else {
        console.log(`✅ Message sent to rooms: ${chatRoom}, ${senderRoom}`);
      }

      // Send delivery confirmation
      socket.emit("messageDelivered", { 
        message_id: message.message_id,
        delivered: true,
        timestamp: new Date().toISOString()
      });

      // Log file messages
      if (message.message_type && message.message_type !== 'TEXT') {
        console.log(`📎 File message delivered: ${message.file_name} (${message.file_type})`);
      }

    } catch (error) {
      console.error("❌ Error handling message:", error);
      socket.emit("messageError", { 
        error: "Failed to process message",
        message_id: message.message_id 
      });
    }
  }

  // Handle typing indicators
  socket.on("typing", (data: { chatId: number; userId: string | number; isTyping: boolean }) => {
    try {
      if (!data.chatId || !data.userId) return;
      
      const chatRoom = getChatRoom(data.chatId);
      socket.to(chatRoom).emit("userTyping", data);
      
    } catch (error) {
      console.error("❌ Error handling typing:", error);
    }
  });

  // Handle message read receipts
  socket.on("messageRead", (data: { messageId: number; userId: string | number; chatId: number }) => {
    try {
      if (!data.messageId || !data.userId || !data.chatId) return;
      
      const chatRoom = getChatRoom(data.chatId);
      socket.to(chatRoom).emit("messageReadReceipt", data);
      
    } catch (error) {
      console.error("❌ Error handling message read:", error);
    }
  });

  // Handle user status requests
  socket.on("getUserStatus", (userId: string | number, callback) => {
    try {
      if (typeof callback !== 'function') return;
      
      const user = activeUsers.get(userId);
      callback({
        isOnline: user?.isOnline || false,
        lastSeen: user?.lastSeen || null,
        joinedAt: user?.joinedAt || null
      });
      
    } catch (error) {
      console.error("❌ Error getting user status:", error);
      if (typeof callback === 'function') {
        callback({ isOnline: false, lastSeen: null });
      }
    }
  });

  // Handle getting online users
  socket.on("getOnlineUsers", (callback) => {
    try {
      if (typeof callback !== 'function') return;
      
      const onlineUsers = Array.from(activeUsers.values())
        .filter(user => user.isOnline)
        .map(user => ({
          userId: user.userId,
          joinedAt: user.joinedAt,
          lastSeen: user.lastSeen
        }));
      
      callback(onlineUsers);
      
    } catch (error) {
      console.error("❌ Error getting online users:", error);
      if (typeof callback === 'function') {
        callback([]);
      }
    }
  });

  // Handle ping/pong for connection health
  socket.on("ping", (callback) => {
    try {
      if (typeof callback === 'function') {
        callback("pong");
      }
    } catch (error) {
      console.error("❌ Error handling ping:", error);
    }
  });

  // FIXED: Enhanced disconnect handling
  socket.on("disconnect", (reason) => {
    console.log(`❌ Socket ${socket.id} disconnected: ${reason}`);
    
    try {
      const userId = removeUser(socket.id);
      
      if (userId) {
        // Notify others about user going offline
        socket.broadcast.emit("userStatusChange", { 
          userId, 
          isOnline: false, 
          timestamp: new Date().toISOString() 
        });
      }
      
    } catch (error) {
      console.error("❌ Error handling disconnect:", error);
    }
  });

  // Handle connection errors
  socket.on("error", (error) => {
    console.error(`🚨 Socket error for ${socket.id}:`, error);
  });

  // Send initial connection acknowledgment
  socket.emit("connected", {
    socketId: socket.id,
    timestamp: new Date().toISOString(),
    message: "Connected to chat server"
  });

  // When a new chat is created (add this to your chat creation API)
socket.on("newChatCreated", (chatData) => {
  console.log('New chat created:', chatData);
  
  // Emit to all staff members
  io.emit("chatRoomAdded", chatData);
  
  // Or emit only to online staff members
  // io.to("staff-room").emit("chatRoomAdded", chatData);
});

// When a chat status changes (pending to active)
socket.on("chatStatusChanged", (chatData) => {
  console.log('Chat status changed:', chatData);
  
  // Emit to all relevant users
  io.emit("chatStatusUpdated", chatData);
});

});

// FIXED: Enhanced error handling
io.engine.on("connection_error", (err) => {
  console.error("🚨 Engine connection error:");
  console.error("  - Request:", err.req?.url);
  console.error("  - Code:", err.code);
  console.error("  - Message:", err.message);
  console.error("  - Context:", err.context);
});

// Handle WebSocket upgrade errors
server.on('upgrade', (request, socket, head) => {
  socket.on('error', (err) => {
    console.error('🚨 WebSocket upgrade error:', err);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const onlineUsers = Array.from(activeUsers.values()).filter(u => u.isOnline);
  
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      activeConnections: io.engine.clientsCount,
      activeUsers: onlineUsers.length,
      totalUsers: activeUsers.size
    },
    users: onlineUsers.map(u => ({
      userId: u.userId,
      socketId: u.socketId,
      joinedAt: u.joinedAt,
      rooms: Array.from(u.rooms)
    }))
  });
});

// Get active users endpoint
app.get("/api/active-users", (req, res) => {
  try {
    const onlineUsers = Array.from(activeUsers.values())
      .filter(user => user.isOnline)
      .map(user => ({
        userId: user.userId,
        socketId: user.socketId,
        joinedAt: user.joinedAt,
        lastSeen: user.lastSeen,
        rooms: Array.from(user.rooms)
      }));
    
    res.json({ 
      success: true,
      count: onlineUsers.length, 
      users: onlineUsers,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ Error getting active users:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

// FIXED: More frequent cleanup and better logging
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
}, 300000); // Run every 5 minutes (more frequent)

// FIXED: Better error handling
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  // Don't exit the process, just log the error
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