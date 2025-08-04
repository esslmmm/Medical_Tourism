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
  XMarkIcon
} from "@heroicons/react/24/solid";
import io, { Socket } from "socket.io-client";
import { useUserId } from "../../../hooks/useUserId";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatFileSize } from "@/utils/fileUtils";
import TopicInputModal from "./TopicInputModal"; // Import the separated component

interface Chat {
  chat_id: number | undefined;
  topic: string;
  user1_id: number;
  user2_id: number;
  timestamp: string;
  messages: Message[];
}

interface Message {
  message_id: number;
  chat_id: number | undefined;
  topic: string;
  sender_id: string | number;
  receiver_id: number | undefined;
  message: string;
  timestamp: string;
  message_type?: 'TEXT' | 'IMAGE' | 'FILE' ;
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

const ChatApp: React.FC = () => {
  const { userId, isLoading, isAuthenticated } = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newChatId, setNewChatId] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [showTopicInput, setShowTopicInput] = useState(false);
  const socket = useRef<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, isUploading, uploadProgress, error } = useFileUpload();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typeofproblem: '',
  });

  // Socket setup
  useEffect(() => {
    if (!userId) return;

    socket.current = io("http://localhost:3001", {
      transports: ['websocket'],
      upgrade: true,
    });

    socket.current.on("connect", () => {
      setIsConnected(true);
      socket.current?.emit("joinRoom", userId);
    });

    socket.current.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  // Handle incoming messages
  const handleReceiveMessage = useCallback((newMessage: Message) => {
    if (selectedChat && newMessage.chat_id === selectedChat.chat_id) {
      setMessages((prev) => {
        const exists = prev.some(msg => msg.message_id === newMessage.message_id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    }

    setChats((prevChats) => 
      prevChats.map(chat => {
        if (chat.chat_id === newMessage.chat_id) {
          return {
            ...chat,
            messages: [newMessage, ...chat.messages.filter(msg => msg.message_id !== newMessage.message_id)]
          };
        }
        return chat;
      })
    );
  }, [selectedChat]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.current?.off("receiveMessage", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chats
  useEffect(() => {
    async function fetchChats() {
      if (!userId) return;
      
      try {
        const res = await fetch(`/api/chats`);
        if (!res.ok) throw new Error("Failed to fetch chats");
        const data = await res.json();
        setChats(data.chats || []);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    fetchChats();
  }, [userId]);

  // Select chat
  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
    const sortedMessages = [...chat.messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    setMessages(sortedMessages);
  };

  // Send message function - Updated to use formData.typeofproblem
  const sendMessage = async () => {
    if (!message.trim() || !userId || isSending) return;

    const receiverId = selectedChat?.user1_id === Number(userId) 
      ? selectedChat?.user2_id 
      : selectedChat?.user1_id;

    const tempMessage: Message = {
      message_id: Date.now(),
      topic: formData.typeofproblem || 'general', // Fixed: Use formData.typeofproblem with fallback
      chat_id: selectedChat?.chat_id,
      sender_id: Number(userId),
      receiver_id: receiverId,
      message: message.trim(),
      message_type: "TEXT",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    const messageToSend = message.trim();
    setMessage("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sender_id: Number(userId), 
          receiver_id: Number(receiverId), 
          message_type: "TEXT",
          message: messageToSend,
          topic: formData.typeofproblem || 'general' // Include topic in API call
        }),
      });

      const data = await res.json();
      // const NewChat = data.chat_id;
      // setNewChatId(NewChat);
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      const confirmedMessage: Message = {
        message_id: data.message_id,
        chat_id: selectedChat?.chat_id,
        topic: formData.typeofproblem || 'general',
        sender_id: Number(userId),
        receiver_id: Number(receiverId),
        message_type: "TEXT",
        message: messageToSend,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) =>
        prev.map((msg) =>
          msg.message_id === tempMessage.message_id ? confirmedMessage : msg
        )
      );

      if (socket.current && isConnected) {
        socket.current.emit("sendMessage", confirmedMessage);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter(msg => msg.message_id !== tempMessage.message_id));
      setMessage(messageToSend);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat || !userId) return;

    // File size limit (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    try {
      // Upload to Cloudinary
      const uploadResult = await uploadFile(file);

      // Determine message type based on file type
      let messageType: 'IMAGE' | 'FILE' = 'FILE';
      if (file.type.startsWith('image/')) messageType = 'IMAGE';

      const receiverId = selectedChat.user1_id === Number(userId) 
        ? selectedChat.user2_id 
        : selectedChat.user1_id;

      // Send file message
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sender_id: Number(userId), 
          receiver_id: Number(receiverId), 
          message: file.name,
          message_type: messageType,
          file_url: uploadResult.url,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          topic: formData.typeofproblem || 'general'
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send file");

      const fileMessage: Message = {
        message_id: data.message_id,
        chat_id: selectedChat.chat_id,
        topic: formData.typeofproblem || 'general',
        sender_id: Number(userId),
        receiver_id: Number(receiverId),
        message: file.name,
        message_type: messageType,
        file_url: uploadResult.url,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, fileMessage]);

      if (socket.current && isConnected) {
        socket.current.emit("sendMessage", fileMessage);
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Render file message
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

    // File message (documents, etc.)
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
    const otherUserId = chat.user1_id === Number(userId) ? chat.user2_id : chat.user1_id;
    const lastMessage = chat.messages[0];
    return lastMessage?.users_messages_receiver_idTousers?.name || `User ${otherUserId}`;
  };

  const filteredChats = chats.filter(chat => 
    getOtherUserName(chat).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (chat.messages[0]?.message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Handler functions for the modal
  const handleStartNewChat = () => {
    // setSelectedChat(newChatId);

    setShowTopicInput(true);
    setMessage('');
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setMessage('');
  };

  // Handler for modal submission
  const handleModalSubmit = () => {
    sendMessage();
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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-gray-500">
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-400 mb-2">
                {searchQuery ? "No matching conversations" : "No conversations yet"}
              </div>
              <p className="text-sm text-gray-500">
                {searchQuery ? "Try a different search term" : "Start a new conversation to begin chatting"}
              </p>
            </div>
          ) : (
            <div className="py-2">
              {filteredChats.map((chat) => {
                const lastMessage = chat.messages[0];
                const otherUserName = getOtherUserName(chat);
                const isSelected = selectedChat?.chat_id === chat.chat_id;
                const hasUnread = false; // You can implement unread logic here
                
                return (
                  <div
                    key={chat.chat_id}
                    onClick={() => selectChat(chat)}
                    className={`flex items-center p-4 mx-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      isSelected ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {otherUserName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                          {chat.topic}
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
                              {lastMessage.message_type === 'IMAGE' ? '📷 Image' : 
                                lastMessage.message_type === 'FILE' ? '📎 File' : 
                                lastMessage.message}
                            </>
                          ) : (
                            "No messages yet"
                          )}
                        </p>
                        {hasUnread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Topic Input Modal */}
        <TopicInputModal
          show={showTopicInput}
          onClose={() => setShowTopicInput(false)}
          message={message}
          setMessage={setMessage}
          isSending={isSending}
          isConnected={isConnected}
          isUploading={isUploading}
          onSubmit={handleModalSubmit}
          formData={formData}
          setFormData={setFormData}
        />

        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {getOtherUserName(selectedChat).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-900">
                      {selectedChat.topic}
                    </h2>
                    <p className="text-sm text-green-500">Online</p>
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
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💬</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Start the conversation</h3>
                    <p className="text-gray-500">Send a message to begin chatting with {getOtherUserName(selectedChat)}</p>
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
                        
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                            isOwn
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                          }`}
                        >
                          {msg.message_type && msg.message_type !== 'TEXT' ? (
                            renderFileMessage(msg)
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
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
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isSending || !isConnected || isUploading}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all max-h-32"
                    rows={1}
                    style={{ minHeight: '48px' }}
                  />
                  
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      disabled={isUploading}
                      className={`p-1 rounded transition-colors ${
                        isUploading 
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
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Chat</h2>
              <p className="text-gray-600 mb-6">
                Select a conversation from the sidebar to start messaging, or create a new chat to connect with someone.
              </p>
              <button 
                onClick={handleStartNewChat}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;