"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPaperclip } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import { useUserId } from "../../../hooks/useUserId";

interface Chat {
  chat_id: number;
  user1_id: number;
  user2_id: number;
  timestamp: string;
  messages: Message[];
}

interface Message {
  message_id: number;
  chat_id: number;
  sender_id?: string;
  receiver_id: number;
  message: string;
  timestamp: string;
  users_messages_receiver_idTousers?: Receiver;
}

interface Receiver {
  user_id: number;
  name: string;
  email: string;
  nationality: string;
  contact_info: string;
  role: string;
}

const ChatApp: React.FC = () => {
  const { userId, isLoading, isAuthenticated } = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>(null);

  // Socket setup
  useEffect(() => {
    socket.current = io("http://localhost:3001");

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Listen for incoming messages
  // Inside useEffect AFTER socket.current is set and selectedChat is set
useEffect(() => {
  if (!socket.current || !selectedChat) return;

  const handleReceive = (newMessage: Message) => {
    if (newMessage.chat_id === selectedChat.chat_id) {
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  socket.current.on("receiveMessage", handleReceive);

  return () => {
    socket.current.off("receiveMessage", handleReceive);
  };
}, [selectedChat]);

  // Scroll to bottom on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chats from API
  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await fetch(`/api/chats/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch chats");
        const data = await res.json();
        setChats(data.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    if (userId) fetchChats();
  }, [userId]);

  // Select chat
  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages([...chat.messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ));
  };

  // Send a message
  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const receiverId =
      selectedChat?.user1_id === Number(userId)
        ? selectedChat.user2_id
        : selectedChat.user1_id;

    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender_id: userId, receiver_id: receiverId, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      const newMessage: Message = {
        message_id: data.message_id,
        chat_id: selectedChat.chat_id,
        sender_id: userId,
        receiver_id: receiverId,
        message: message,
        timestamp: new Date().toISOString(),
      };

      // setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Emit via socket
      socket.current.emit("sendMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  

  return (
    <div className="flex h-screen bg-gray-300">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg border p-4 rounded-lg m-2">
        <input
          type="text"
          placeholder="Search name"
          className="w-full p-2 border rounded-lg"
        />
        <h3 className="text-lg font-bold my-3">Chats</h3>
        <ul>
          {chats.map((chat) => {
            const lastMessage = chat.messages[0] || null;
            return (
              <li
                key={chat.chat_id}
                onClick={() => selectChat(chat)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={`/img/image.png`}
                  className="w-10 h-10 rounded-full"
                  alt="User Avatar"
                />
                <div className="ml-3 flex-1">
                  <h4 className="font-semibold">Chat {chat.chat_id}</h4>
                  <p className="text-sm text-gray-500 truncate w-32">
                    {lastMessage ? lastMessage.message : "No messages yet"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Chat */}
      <div className="w-3/4 flex flex-col m-2">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b bg-white flex items-center rounded-t-lg">
              <img
                src={`/img/image.png`}
                className="w-10 h-10 rounded-full"
                alt="Chat User"
              />
              <h2 className="ml-3 font-bold text-lg">
                {selectedChat.messages[0]?.users_messages_receiver_idTousers?.name || "Unknown"}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg mb-1 ${
                      msg.sender_id === userId
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-300 text-black rounded-bl-none"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-[10px] text-gray-200 mt-1 block text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex items-center gap-4">
          <FaPaperclip size={22} className="text-gray-500 cursor-pointer" />
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
          >
            <IoSend size={20} />
          </button>
        </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
