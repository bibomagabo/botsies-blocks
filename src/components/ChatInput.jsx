import { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState(''); // State for input field

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input); // Pass input to parent handler
      setInput(''); // Clear input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(); // Trigger send on Enter key
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update state
        onKeyDown={handleKeyDown} // Handle Enter key
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend} // Trigger send on click
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
}
