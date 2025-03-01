import React, { useState } from "react";
import SidePanel from "./components/SidePanel";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";

const App = () => {
  const [messages, setMessages] = useState([]); // Store chat messages

  const handleSendMessage = async (userMessage) => {
    // Add the user's message to the chat
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);

    // Send message to backend and await response (replace with actual API call)
    const botResponse = await fetchBotResponse(userMessage);
    setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
  };

  const fetchBotResponse = async (message) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.reply || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "There was an error connecting to the server.";
    }
  };

  return (
    <div id="root" className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidePanel />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="header fixed top-0 w-full h-16 bg-white shadow-md z-10 flex items-center px-4">
          <h1 className="text-xl font-semibold">Guest Chat</h1>
        </header>

        {/* Chat Messages */}
        <div className="chat-conversation flex-1 overflow-y-auto mt-16 mb-16 p-4 bg-gray-50">
          <ChatMessages messages={messages} />
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
