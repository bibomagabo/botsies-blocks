import { useState } from 'react';
import { fetchGPTResponse } from '../services/api'; // Import API function
import { IoAttachOutline } from 'react-icons/io5'; // Import paperclip icon

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState(''); // Chat input text
  const [messages, setMessages] = useState([]); // Message history
const [files, setFiles] = useState([]); // Store multiple files (max 3)

// Handle file upload - Supports multiple files (Max: 3)
const handleFileUpload = (e) => {
  const uploadedFiles = Array.from(e.target.files); // Convert to Array

  // Enforce limit: Max 3 files
  if (files.length + uploadedFiles.length > 3) {
    alert('You can only upload up to 3 files.');
    return;
  }

  // Append uploaded files
  setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
};

// Remove file - Allows deleting specific files
const handleRemoveFile = (index) => {
  setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove by index
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enforce 3-message limit
    if (messages.length >= 6) { // 3 pairs of messages (user + assistant)
        alert('Guest chat limit reached. Please refresh or log in to continue.');
        return;
    }

    if (!input.trim()) {
        return; // Stop processing empty input
    }

    // Add user input to messages
    setMessages([...messages, { role: 'user', content: input }]); // Add user message
    setInput(''); // Clear input field

    try {
        // Call GPT API and get a response
        const response = await fetchGPTResponse(input); // Call API

        // Append assistant response to messages
        setMessages(prev => [
            ...prev,
            { role: 'assistant', content: response.response || 'No response from API.' }
        ]);
    } catch (error) {
        console.error('Error fetching GPT response:', error); // Log errors
        alert('An error occurred while processing your request. Please try again later.'); // Show alert

        setMessages(prev => [
            ...prev,
            { role: 'assistant', content: 'Something went wrong. Try again later!' } // Fallback message
        ]);
    }
  };

  return (
    <>
      {/* Chat Messages Display */}
	<div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[75%] ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white self-end text-right ml-auto'  // User messages to the right
                : 'bg-gray-200 text-black self-start text-left mr-auto' // Assistant messages to the left
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

  <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-2 border-t bg-white dark:bg-gray-800 sticky bottom-0">
         {/* File Upload Button */}
          <label className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center space-x-1">
              <IoAttachOutline size={24} />
              <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden" // Hidden actual input
              />
          </label>
{/* File Upload Display */}
<div className="flex space-x-2">
  {files.map((file, index) => (
    <div
      key={index}
      className="relative group cursor-pointer text-blue-500 bg-blue-100 border border-blue-500 p-1 rounded-md"
    >
      {/* File Icon */}
      📄 {/* Unicode document icon */}

      {/* Tooltip for File Name */}
      <span className="absolute left-0 bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
        {file.name}
      </span>

      {/* Remove Button */}
      <span
        onClick={() => handleRemoveFile(index)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover:opacity-100"
      >
        ✕
      </span>
    </div>
  ))}
</div>

          {/* Text Input */}
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Send Button */}
          <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
          >
              ➤
          </button>
      </form>
    </>
  );
}
