import React from 'react';

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            } p-3 rounded-lg max-w-xs`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;