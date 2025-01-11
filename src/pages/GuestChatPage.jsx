import { useState } from 'react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { fetchChatResponse } from '../services/chatService'; // Import API service
import SidePanel from '../components/SidePanel'; // Import the SidePanel component

export default function GuestChatPage() {
  const [messages, setMessages] = useState([]); // Store chat logs
  const [chatCount, setChatCount] = useState(0); // Count chat sessions

  // Handle sending messages
  const handleSendMessage = async (message) => {
    if (chatCount < 3) {
      const guestMessage = { text: message, sender: 'guest' };
      setMessages((prev) => [...prev, guestMessage]);

      try {
        const response = await fetchChatResponse(message); // API call
        const botMessage = { text: response.response, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]); // Add bot response
      } catch (error) {
        alert(error.message); // Handle API error
      }

      setChatCount(chatCount + 1); // Increment chat count
    } else {
      alert('Guest chat limit reached. Please register for more access.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Side Panel */}
      <SidePanel />

      {/* Main Chat Section */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b bg-white dark:bg-gray-800">
          <h1 className="text-lg font-bold">Guest Chat</h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              G
            </div>
            <span className="font-medium">Guest</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto">
          <ChatMessages messages={messages} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white dark:bg-gray-800">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
