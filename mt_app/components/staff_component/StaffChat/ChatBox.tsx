"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  PaperClipIcon, 
  PaperAirplaneIcon, 
  MagnifyingGlassIcon,
  PhoneIcon,
  VideoCameraIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { 
  CheckIcon, 
  CheckCircleIcon,
  UserCircleIcon, 
  XMarkIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ExclamationCircleIcon,
  BellIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";
import io, { Socket } from "socket.io-client";
import { useUserId } from "../../../hooks/useUserId";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatFileSize } from "@/utils/fileUtils";

// Interfaces remain the same...
interface Chat {
  chat_id: number | undefined;
  topic: string;
  customerId: number;
  staffId: number;
  timestamp: string;
  messages: Message[];
  user_chat_user2_idTouser: user;
  user_chat_user1_idTouser: user;
}

interface user {
  name: string;
  email: string;
  image: string;
}

interface Message {
  message_id: number;
  chat_id: number | undefined;
  sender_id: string | number;
  message: string;
  timestamp: string;
  message_type?: 'TEXT' | 'IMAGE' | 'FILE';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  users_messages_receiver_idTousers?: Receiver;
}

interface Receiver {
  id: number;
  name: string;
  email: string;
  role: string;
}

// NEW: Notification interface
interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  chatId?: number;
}

const ChatApp: React.FC = () => {
  const { userId, isLoading, isAuthenticated } = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  
  // NEW: Notification state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newChatCount, setNewChatCount] = useState<number>(0);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, isUploading, uploadProgress, error } = useFileUpload();
  const [activeTab, setActiveTab] = useState('active');
  
  // Track connection state
  const isConnecting = useRef(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // NEW: Notification helper function
  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', chatId?: number) => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
      chatId
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);

    // Play notification sound (optional)
    if (type === 'info' && message.includes('New chat')) {
      // You can add audio notification here
      // new Audio('/notification.mp3').play().catch(() => {});
    }
  };

  const fetchWaitingChats = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/admin/chats`);
      if (!res.ok) throw new Error("Failed to fetch waiting chats");
      const data = await res.json();
      console.log('Fetched chats:', data.chats);
      setChats(data.chats || []);
    } catch (error) {
      console.error("Error fetching waiting chats:", error);
    }
  }, [userId]);

  // FIXED: Initialize socket connection
  const initializeSocket = useCallback(() => {
    if (!userId || isConnecting.current) return;
    
    console.log('Initializing socket connection for user:', userId);
    isConnecting.current = true;

    // Clean up existing socket
    if (socket.current) {
      socket.current.removeAllListeners();
      socket.current.disconnect();
      socket.current = null;
    }

    // Create new socket connection
    socket.current = io("http://localhost:3001", {
      transports: ['websocket', 'polling'],
      upgrade: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 20000,
      query: {
        userId: userId.toString()
      }
    });

    // Connection event handlers
    socket.current.on("connect", () => {
      console.log('✅ Socket connected:', socket.current?.id);
      setIsConnected(true);
      isConnecting.current = false;
      reconnectAttempts.current = 0;
      
      // Join user room
      socket.current?.emit("joinRoom", userId);
    });

    socket.current.on("disconnect", (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      isConnecting.current = false;
      
      // Don't auto-reconnect if it was a manual disconnect
      if (reason === 'io client disconnect') {
        return;
      }
    });

    socket.current.on("connect_error", (error) => {
      console.error('🚨 Socket connection error:', error);
      setIsConnected(false);
      isConnecting.current = false;
      reconnectAttempts.current++;
      
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    socket.current.on("connectionStatus", (status) => {
      console.log('📊 Connection status:', status);
    });

    return socket.current;
  }, [userId]);

  // FIXED: Message handler with better error handling
  const handleReceiveMessage = useCallback((newMessage: Message) => {
    console.log('📨 Received message:', newMessage);
    
    if (!newMessage.message_id || !newMessage.chat_id) {
      console.warn('Invalid message received:', newMessage);
      return;
    }

    // Update messages if this is the selected chat
    if (selectedChat && Number(newMessage.chat_id) === Number(selectedChat.chat_id)) {
      setMessages((prev) => {
        const exists = prev.some(msg => msg.message_id === newMessage.message_id);
        if (exists) {
          console.log('Message already exists, skipping...');
          return prev;
        }
        console.log('Adding message to current chat');
        return [...prev, newMessage];
      });
    }

    // Update chat list
    setChats((prevChats) => {
      return prevChats.map(chat => {
        if (Number(chat.chat_id) === Number(newMessage.chat_id)) {
          const filteredMessages = chat.messages.filter(msg => msg.message_id !== newMessage.message_id);
          return {
            ...chat,
            messages: [newMessage, ...filteredMessages],
            timestamp: newMessage.timestamp
          };
        }
        return chat;
      });
    });
  }, [selectedChat?.chat_id]);

  // NEW: Handle new chat room added
  // const handleNewChatAdded = useCallback((newChat: Chat) => {
  //   console.log('🆕 New chat room added:', newChat);
    
  //   setChats((prevChats) => {
  //     // Check if chat already exists to avoid duplicates
  //     const exists = prevChats.find(chat => chat.chat_id === newChat.chat_id);
  //     if (exists) return prevChats;
      
  //     // Add new chat to the beginning of the list
  //     return [newChat, ...prevChats];
  //   });
    
  //   // Show notification for new pending chat
  //   if (newChat.staffId === null) {
  //     showNotification(
  //       `New chat request from ${newChat.user_chat_user1_idTouser?.name || 'Customer'}`, 
  //       'info',
  //       newChat.chat_id
  //     );
      
  //     // Increment new chat counter
  //     setNewChatCount(prev => prev + 1);
      
  //     // Auto switch to pending tab if user is on active tab
  //     if (activeTab === 'active') {
  //       setTimeout(() => {
  //         setActiveTab('pending');
  //       }, 1000);
  //     }
  //   }
  // }, [activeTab]);

  // NEW: Handle chat status updates
  const handleChatStatusUpdate = useCallback((updatedChat: Partial<Chat>) => {
    console.log('📝 Chat status updated:', updatedChat);
    
    setChats((prevChats) => {
      return prevChats.map(chat => 
        chat.chat_id === updatedChat.chat_id 
          ? { ...chat, ...updatedChat }
          : chat
      );
    });
    
    // If chat was just assigned to current user
    if (updatedChat.staffId === Number(userId)) {
      showNotification('Chat assigned to you!', 'success');
    }
  }, [userId]);

  // Socket setup effect
  useEffect(() => {
    if (!userId || !isAuthenticated) return;

    const socketInstance = initializeSocket();
    if (!socketInstance) return;

    // Existing message listener
    socketInstance.on("receiveMessage", handleReceiveMessage);

    // NEW: Listen for new chat rooms
    // socketInstance.on("chatRoomAdded", handleNewChatAdded);

    // NEW: Listen for chat status updates
    socketInstance.on("chatStatusUpdated", handleChatStatusUpdate);

    // NEW: Listen for chat assignments
    socketInstance.on("chatAssigned", (assignmentData) => {
      console.log('👥 Chat assigned:', assignmentData);
      handleChatStatusUpdate(assignmentData);
    });

    // Set up other event listeners
    socketInstance.on("userStatusChange", (data) => {
      console.log('👤 User status changed:', data);
    });

    socketInstance.on("messageDelivered", (data) => {
      console.log('✅ Message delivered:', data);
    });

    socketInstance.on("messageError", (error) => {
      console.error('❌ Message error:', error);
      showNotification(`Message error: ${error.error}`, 'error');
    });

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up socket connection');
      if (socketInstance) {
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
      }
      socket.current = null;
      setIsConnected(false);
      isConnecting.current = false;
    };
  }, [userId, isAuthenticated, initializeSocket, handleReceiveMessage, handleChatStatusUpdate]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch chats on mount
  useEffect(() => {
    if (userId && isAuthenticated) {
      fetchWaitingChats();
    }
  }, [userId, isAuthenticated, fetchWaitingChats]);

  // MODIFIED: Send message function (now handles chat assignment)
  const sendMessage = async () => {
    if (!message.trim() || !userId || isSending || !selectedChat?.chat_id) {
      console.log('Cannot send message:', { 
        hasMessage: !!message.trim(), 
        hasUserId: !!userId, 
        isSending, 
        hasChat: !!selectedChat?.chat_id 
      });
      return;
    }

    if (!isConnected || !socket.current) {
      console.error("Socket not connected");
      showNotification("Connection lost. Please wait for reconnection.", 'error');
      return;
    }

    const messageText = message.trim();
    const tempId = Date.now();
    
    const tempMessage: Message = {
      message_id: tempId,
      chat_id: selectedChat.chat_id,
      sender_id: Number(userId),
      message: messageText,
      message_type: "TEXT",
      timestamp: new Date().toISOString(),
    };

    // Add message to UI immediately
    setMessages((prev) => [...prev, tempMessage]);
    setMessage("");
    setIsSending(true);

    try {
      // MODIFIED: Include staff assignment if this is a pending chat
      const payload: any = { 
        sender_id: Number(userId), 
        chat_id: selectedChat.chat_id,
        message_type: "TEXT",
        message: messageText,
      };

      // If this is a pending chat (staffId is null), assign it to current user
      if (selectedChat.staffId === null) {
        payload.assignStaff = true;
        payload.staffId = Number(userId);
        
        showNotification("Taking chat and sending message...", 'info');
      }

      const res = await fetch("/api/chats/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      const confirmedMessage: Message = {
        message_id: data.message_id,
        chat_id: selectedChat.chat_id,
        sender_id: Number(userId),
        message_type: "TEXT",
        message: messageText,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      // Update the temporary message with confirmed data
      setMessages((prev) =>
        prev.map((msg) =>
          msg.message_id === tempId ? confirmedMessage : msg
        )
      );

      // If chat was assigned, update local chat state
      if (selectedChat.staffId === null) {
        setSelectedChat(prev => prev ? { ...prev, staffId: Number(userId) } : null);
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.chat_id === selectedChat.chat_id 
              ? { ...chat, staffId: Number(userId) }
              : chat
          )
        );
        showNotification("Chat assigned to you successfully!", 'success');
      }

      // Send via socket
      if (socket.current && isConnected) {
        // Get recipient ID
        const recipientId = selectedChat.customerId === Number(userId) 
          ? selectedChat.staffId 
          : selectedChat.customerId;

        console.log('📤 Sending message via socket:', {
          sender: userId,
          recipient: recipientId,
          chat: selectedChat.chat_id
        });

        socket.current.emit("sendMessage", {
          ...confirmedMessage,
          receiver_id: recipientId
        });

        // If chat was just assigned, emit status change
        if (payload.assignStaff) {
          socket.current.emit("chatStatusChanged", {
            chat_id: selectedChat.chat_id,
            staffId: Number(userId),
            status: 'active'
          });
        }
      }

    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message on error
      setMessages((prev) => prev.filter(msg => msg.message_id !== tempId));
      setMessage(messageText);
      showNotification("Failed to send message. Please try again.", 'error');
    } finally {
      setIsSending(false);
    }
  };

  // FIXED: Select chat function
  const selectChat = useCallback((chat: Chat) => {
    console.log('Selecting chat:', chat.chat_id);
    setSelectedChat(chat);
    
    const sortedMessages = [...chat.messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    setMessages(sortedMessages);

    // Join chat room via socket
    if (socket.current && chat.chat_id) {
      socket.current.emit("joinChat", chat.chat_id);
    }

    // Reset new chat count when switching to pending tab
    if (activeTab === 'pending') {
      setNewChatCount(0);
    }
  }, [activeTab]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // MODIFIED: File upload function (now handles chat assignment)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file || !selectedChat?.chat_id || !userId) {
      console.log('Missing requirements for file upload');
      return;
    }

    if (!isConnected || !socket.current) {
      showNotification("Connection lost. Please wait for reconnection.", 'error');
      return;
    }

    // File size limit (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showNotification('File size must be less than 10MB', 'error');
      return;
    }

    try {
      console.log('📎 Starting file upload...');
      
      // Upload to Cloudinary first
      const uploadResult = await uploadFile(file);
      console.log('✅ File uploaded to Cloudinary:', uploadResult);

      // Determine message type
      let messageType: 'IMAGE' | 'FILE' = 'FILE';
      if (file.type.startsWith('image/')) messageType = 'IMAGE';

      // MODIFIED: Include staff assignment if this is a pending chat
      const messagePayload: any = {
        sender_id: Number(userId),
        chat_id: Number(selectedChat.chat_id),
        message: file.name,
        message_type: messageType,
        file_url: uploadResult.url,
        file_name: file.name,
        file_size: Number(file.size),
        file_type: file.type,
      };

      // If this is a pending chat, assign it to current user
      if (selectedChat.staffId === null) {
        messagePayload.assignStaff = true;
        messagePayload.staffId = Number(userId);
        
        showNotification("Taking chat and uploading file...", 'info');
      }

      // Save to database
      const res = await fetch("/api/chats/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messagePayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send file");

      const fileMessage: Message = {
        message_id: data.message_id,
        chat_id: Number(selectedChat.chat_id),
        sender_id: Number(userId),
        message: file.name,
        message_type: messageType,
        file_url: uploadResult.url,
        file_name: file.name,
        file_size: Number(file.size),
        file_type: file.type,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      // Update UI
      setMessages((prev) => [...prev, fileMessage]);

      // If chat was assigned, update local chat state
      if (selectedChat.staffId === null) {
        setSelectedChat(prev => prev ? { ...prev, staffId: Number(userId) } : null);
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.chat_id === selectedChat.chat_id 
              ? { ...chat, staffId: Number(userId) }
              : chat
          )
        );
        showNotification("Chat assigned to you successfully!", 'success');
      }

      // Send via socket
      if (socket.current && isConnected) {
        const recipientId = selectedChat.customerId === Number(userId) 
          ? selectedChat.staffId 
          : selectedChat.customerId;

        socket.current.emit("sendMessage", {
          ...fileMessage,
          receiver_id: recipientId
        });

        // If chat was just assigned, emit status change
        if (messagePayload.assignStaff) {
          socket.current.emit("chatStatusChanged", {
            chat_id: selectedChat.chat_id,
            staffId: Number(userId),
            status: 'active'
          });
        }
      }

      console.log('✅ File message sent successfully');

    } catch (error) {
      console.error("Error in file upload process:", error);
      showNotification("Failed to upload file. Please try again.", 'error');
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Rest of your component methods remain the same...
  const renderFileMessage = (msg: Message) => {
    const isOwn = String(msg.sender_id) === String(userId);
    
    if (msg.message_type === 'IMAGE') {
      return (
        <div className={`max-w-xs lg:max-w-md rounded-2xl overflow-hidden shadow-sm ${
          isOwn ? 'bg-blue-500' : 'bg-white border border-gray-200'
        }`}>
          <img 
            src={msg.file_url} 
            alt={msg.file_name || 'Image'}
            className="w-full h-auto max-h-64 object-cover"
            loading="lazy"
          />
          {msg.message !== msg.file_name && (
            <div className={`p-3 ${isOwn ? 'text-white' : 'text-gray-900'}`}>
              <p className="break-words">{msg.message}</p>
            </div>
          )}
          <div className={`px-3 pb-2 flex items-center justify-between ${
            isOwn ? 'text-blue-100' : 'text-gray-400'
          }`}>
            <span className="text-xs">
              {new Date(msg.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {isOwn && <CheckCircleIcon className="w-3 h-3" />}
          </div>
        </div>
      );
    }

    return (
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
        isOwn ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 border border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isOwn ? 'bg-blue-400' : 'bg-gray-100'}`}>
            <PaperClipIcon className={`h-5 w-5 ${isOwn ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{msg.file_name || msg.message}</p>
            {msg.file_size && (
              <p className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                {formatFileSize(msg.file_size)}
              </p>
            )}
          </div>
        </div>
        <div className={`flex items-center justify-between mt-2 ${
          isOwn ? 'text-blue-100' : 'text-gray-400'
        }`}>
          <a 
            href={msg.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-xs underline hover:no-underline ${
              isOwn ? 'text-blue-100 hover:text-white' : 'text-blue-500 hover:text-blue-700'
            }`}
          >
            Download
          </a>
          <div className="flex items-center space-x-1">
            <span className="text-xs">
              {new Date(msg.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {isOwn && <CheckCircleIcon className="w-3 h-3" />}
          </div>
        </div>
      </div>
    );
  };

  const getOtherUserName = (chat: Chat): string => {
    const isCurrentUserUser1 = chat.customerId === Number(userId);
    const otherUserId = isCurrentUserUser1 ? chat.staffId : chat.staffId;

    const otherUserName = isCurrentUserUser1
      ? chat.user_chat_user2_idTouser?.name
      : chat.user_chat_user1_idTouser?.name;

    return otherUserName || `User ${otherUserId ?? "unknown"}`;
  };

  // Separate chats into active and pending
  const filtered = chats.filter(chat => 
    !searchQuery || 
    chat.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.user_chat_user2_idTouser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChats = filtered.filter(chat => chat.staffId !== null);
  const pendingChats = filtered.filter(chat => chat.staffId === null);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleCloseChat = () => {
    // Leave chat room when closing
    if (socket.current && selectedChat?.chat_id) {
      socket.current.emit("leaveChat", selectedChat.chat_id);
    }
    
    setSelectedChat(null);
    setMessages([]);
    setMessage('');
  };

  // NEW: Notification Toast Component
  const NotificationToast = ({ notification }: { notification: Notification }) => {
    const bgColor = {
      success: 'bg-green-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500'
    }[notification.type];

    const icon = {
      success: <CheckCircleIcon className="w-5 h-5" />,
      info: <BellIcon className="w-5 h-5" />,
      warning: <ExclamationCircleIcon className="w-5 h-5" />,
      error: <XMarkIcon className="w-5 h-5" />
    }[notification.type];

    return (
      <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${bgColor} text-white transform transition-all duration-300 max-w-sm`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-xs opacity-75 mt-1">
              {notification.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <button 
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            className="ml-2 text-white hover:text-gray-200 flex-shrink-0"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your conversations...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access your messages</p>
        </div>
      </div>
    );
  }

    const renderChatItem = (chat: any) => {
    const lastMessage = chat.messages?.[0];
    const otherUserName = getOtherUserName(chat);
    const isSelected = selectedChat?.chat_id === chat.chat_id;
    const hasUnread = false;
    const isPending = chat.staffId === null;

    return (
      <div
        key={chat.chat_id}
        onClick={() => selectChat(chat)}
        className={`relative flex items-center p-4 mx-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
          isSelected ? 'bg-blue-50 border-r-4 border-blue-500' : ''
        }`}
      >
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isPending 
              ? 'bg-gradient-to-br from-orange-400 to-red-500' 
              : 'bg-gradient-to-br from-blue-400 to-purple-500'
          }`}>
            {isPending ? (
              <ClockIcon className="w-6 h-6 text-white" />
            ) : (
              <span className="text-white font-semibold text-lg">
                {otherUserName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
            isPending ? 'bg-orange-500' : isConnected ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
          
          {/* NEW: Animated pulse for new pending chats */}
          {isPending && (
            <div className="absolute -top-1 -right-1">
              <SparklesIcon className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
              {chat.topic || otherUserName}
            </h3>
            {lastMessage && (
              <span className="text-xs text-gray-500 ml-2">
                {formatTime(lastMessage.timestamp)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <p className={`text-sm truncate pr-2 ${
              hasUnread ? 'text-gray-900 font-medium' : 'text-gray-500'
            }`}>
              {lastMessage ? (
                <>
                  {String(lastMessage.sender_id) === String(userId) && (
                    <CheckIcon className="inline w-3 h-3 mr-1 text-blue-500" />
                  )}
                  {isPending && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 mr-2">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      Waiting
                    </span>
                  )}
                  {lastMessage.message_type === 'IMAGE' ? '📷 Image' : 
                   lastMessage.message_type === 'FILE' ? '📎 File' : 
                   lastMessage.message}
                </>
              ) : (
                <>
                  {isPending && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 mr-2">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      New Chat
                    </span>
                  )}
                  "No messages yet"
                </>
              )}
            </p>
            {hasUnread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            )}
          </div>
          
          {/* NEW: Action hint for pending chats */}
          {isPending && isSelected && (
            <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
              💡 Reply to this chat to take it and start helping the customer
            </div>
          )}
        </div>
      </div>
    );
  };

  const currentChats = activeTab === 'active' ? activeChats : pendingChats;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Notification Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <NotificationToast key={notification.id} notification={notification} />
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-gray-500">
                {isConnected ? 'Connected' : isConnecting.current ? 'Connecting...' : 'Offline'}
              </span>
              {/* NEW: New chat indicator */}
              {newChatCount > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {newChatCount}
                </div>
              )}
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => {
                setActiveTab('active');
                setNewChatCount(0);
              }}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
              Active ({activeChats.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('pending');
                setNewChatCount(0);
              }}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all relative ${
                activeTab === 'pending'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ClockIcon className="w-4 h-4 mr-2" />
              Pending ({pendingChats.length})
              {/* NEW: New chat indicator on tab */}
              {newChatCount > 0 && activeTab !== 'pending' && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {newChatCount > 9 ? '9+' : newChatCount}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {currentChats.length === 0 ? (
            <div className="p-6 text-center">
              <div className="mb-4">
                {activeTab === 'active' ? (
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                ) : (
                  <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                )}
              </div>
              <div className="text-gray-400 mb-2">
                {searchQuery 
                  ? "No matching conversations" 
                  : activeTab === 'active' 
                    ? "No active conversations" 
                    : "No pending conversations"
                }
              </div>
              {activeTab === 'pending' && !searchQuery && (
                <p className="text-xs text-gray-500 mt-2">
                  New chat requests will appear here automatically
                </p>
              )}
            </div>
          ) : (
            <div className="py-2">
              {currentChats.map(renderChatItem)}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{activeChats.length} active chats</span>
            <span>{pendingChats.length} pending chats</span>
          </div>
          {/* NEW: Real-time status indicator */}
          <div className="mt-2 flex items-center justify-center">
            <div className={`w-1 h-1 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-400">
              Real-time updates {isConnected ? 'active' : 'inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedChat.staffId === null 
                        ? 'bg-gradient-to-br from-orange-400 to-red-500'
                        : 'bg-gradient-to-br from-blue-400 to-purple-500'
                    }`}>
                      <span className="text-white font-semibold">
                        {getOtherUserName(selectedChat).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${
                      isConnected ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="ml-3">
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold text-gray-900">
                        {selectedChat.topic || getOtherUserName(selectedChat)}
                      </h2>
                      {/* NEW: Chat status indicator */}
                      {selectedChat.staffId === null && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isConnected ? 'text-green-500' : 'text-gray-400'}`}>
                      {isConnected ? 'Online' : 'Offline'}
                      {selectedChat.staffId === null && (
                        <span className="text-orange-500 ml-2">
                          • Reply to take this chat
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleCloseChat}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Close chat"
                  >
                    <XMarkIcon className="h-5 w-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8fafc' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      selectedChat.staffId === null 
                        ? 'bg-orange-100' 
                        : 'bg-gray-100'
                    }`}>
                      {selectedChat.staffId === null ? (
                        <ClockIcon className="w-8 h-8 text-orange-500" />
                      ) : (
                        <span className="text-2xl">💬</span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {selectedChat.staffId === null 
                        ? 'New Chat Request' 
                        : 'Start the conversation'
                      }
                    </h3>
                    <p className="text-gray-500">
                      {selectedChat.staffId === null 
                        ? 'Send a message to take this chat and start helping the customer'
                        : `Send a message to begin chatting with ${getOtherUserName(selectedChat)}`
                      }
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isOwn = String(msg.sender_id) === String(userId);
                  const prevMsg = messages[index - 1];
                  const showAvatar = !prevMsg || String(prevMsg.sender_id) !== String(msg.sender_id);
                  const showTimestamp = !prevMsg || 
                    new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 600000; // 10 minutes
                  
                  return (
                    <div key={msg.message_id || index}>
                      {showTimestamp && (
                        <div className="flex justify-center my-6">
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {new Date(msg.timestamp).toLocaleDateString() === new Date().toLocaleDateString()
                              ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : new Date(msg.timestamp).toLocaleDateString([], { 
                                  weekday: 'long', 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })
                            }
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex items-end space-x-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        {!isOwn && showAvatar && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-semibold">
                              {getOtherUserName(selectedChat).charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        
                        {!isOwn && !showAvatar && <div className="w-8" />}
                        
                        {msg.message_type && msg.message_type !== 'TEXT' ? (
                          renderFileMessage(msg)
                        ) : (
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                              isOwn
                                ? 'bg-blue-500 text-white rounded-br-md'
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                            }`}
                          >
                            <p className="break-words">{msg.message}</p>
                            <div className={`flex items-center justify-end mt-1 space-x-1 ${
                              isOwn ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                              <span className="text-xs">
                                {new Date(msg.timestamp).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                              {isOwn && (
                                <CheckCircleIcon className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-sm text-blue-700">Uploading file...</span>
                    <span className="text-xs text-blue-500">{uploadProgress}%</span>
                  </div>
                </div>
              )}
              
              {/* Connection Status Alert */}
              {!isConnected && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-800">
                    <ExclamationCircleIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {isConnecting.current ? 'Reconnecting...' : 'Connection lost. Messages may not be delivered.'}
                    </span>
                  </div>
                </div>
              )}

              {/* NEW: Pending Chat Notice */}
              {selectedChat.staffId === null && (
                <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center text-orange-800">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">This is a pending chat request</span>
                      <p className="text-xs text-orange-600 mt-1">
                        Send a message or file to take this chat and start helping the customer
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-end space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || !isConnected}
                  className={`p-2 rounded-full transition-colors ${
                    isUploading || !isConnected
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={selectedChat.staffId === null ? "Upload file to take chat" : "Upload file"}
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      !isConnected ? "Connecting..." :
                      selectedChat.staffId === null ? "Type a message to take this chat..." :
                      "Type a message..."
                    }
                    disabled={isSending || !isConnected || isUploading}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all max-h-32 disabled:opacity-50"
                    rows={1}
                    style={{ minHeight: '48px' }}
                  />
                  
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      disabled={isUploading || !isConnected}
                      className={`p-1 rounded transition-colors ${
                        isUploading || !isConnected
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <FaceSmileIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || isSending || !isConnected || isUploading}
                  className={`p-3 rounded-full transition-all ${
                    message.trim() && !isSending && isConnected && !isUploading
                      ? selectedChat.staffId === null
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  title={selectedChat.staffId === null ? "Send message to take chat" : "Send message"}
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Chat Support</h2>
              <p className="text-gray-600 mb-6">
                Select a conversation from the sidebar to start messaging. New chat requests will appear automatically in the pending tab.
              </p>
              {pendingChats.length > 0 && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-center text-orange-800">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {pendingChats.length} customer{pendingChats.length !== 1 ? 's' : ''} waiting for help
                    </span>
                  </div>
                </div>
              )}
              {!isConnected && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-center text-yellow-800">
                    <ExclamationCircleIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {isConnecting.current ? 'Connecting to chat server...' : 'Offline - Please check your connection'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;