import React from 'react'
import { FaRegUser, FaRegCommentDots, FaPlus } from "react-icons/fa";
import { useState } from 'react';

const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const chats = [
        {
            id: 1, name: "Ekkarat Singkhala", role: "Junior Staff", image: "/profile1.jpg", messages: [
                { text: "Hello! How can I assist you today?", sender: "other" },
                { text: "I'm looking for dental implants...", sender: "user" },
                { text: "For dental implants, Mexico and Hungary are great options!", sender: "other" }
            ]
        },
        {
            id: 2, name: "Sondeth Singkhala", role: "Customer", image: "/profile2.jpg", messages: [
                { text: "Can you help me book an appointment?", sender: "user" },
                { text: "Of course! What procedure are you looking for?", sender: "other" }
            ]
        }
    ];
    const sendMessage = () => {
        if (message.trim() !== "" && selectedChat) {
            selectedChat.messages.push({ text: message, sender: "user" });
            setMessage("");
        }
    };
  return (
      <div><main className="flex-1 bg-gray-50 flex flex-col">
          {/* Top Right Profile */}
          <div className="p-4 flex justify-end border-b bg-white">
              <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                  <div>
                      <div className="font-semibold text-black">Ekkarat Singkhala</div>
                      <div className="text-sm text-black">Junior Staff</div>
                  </div>
              </div>
          </div>

          {/* Chat List */}
          <div className="flex flex-1">
              <div className="w-1/3 border-r bg-white p-5">
                  <div className="flex justify-between items-center">
                      <h3 className="text-black font-semibold">Customer Chat</h3>
                      <FaPlus size={18} className="text-teal-600 cursor-pointer" onClick={() => setShowPopup(true)} />
                  </div>
                  <ul className="mt-4 space-y-4">
                      {chats.map(chat => (
                          <li key={chat.id} className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${selectedChat?.id === chat.id ? 'bg-teal-100' : 'hover:bg-gray-100'}`} onClick={() => setSelectedChat(chat)}>
                              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                              <div>
                                  <div className="font-semibold text-black">{chat.name}</div>
                                  <div className="text-sm text-black">{chat.role}</div>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
              {/* Chat Window */}
              <div className="flex-1 flex flex-col">
                  {selectedChat ? (
                      <>
                          <div className="p-4 border-b bg-white flex items-center space-x-3">
                              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                              <div>
                                  <div className="font-semibold text-black">{selectedChat.name}</div>
                                  <div className="text-sm text-black">{selectedChat.role}</div>
                              </div>
                          </div>
                          <div className="flex-1 p-4 overflow-y-auto">
                              {selectedChat.messages.map((msg, index) => (
                                  <div key={index} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                      <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>{msg.text}</div>
                                  </div>
                              ))}
                          </div>
                          <div className="p-4 border-t bg-white flex items-center">
                              <input type="text" className="flex-1 p-2 border rounded-lg" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                              <button onClick={sendMessage} className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-lg">Send</button>
                          </div>
                      </>
                  ) : <div className="flex-1 flex items-center justify-center text-black">Select a chat to view</div>}
              </div>
          </div>
      </main></div>
  )
}

export default Chat