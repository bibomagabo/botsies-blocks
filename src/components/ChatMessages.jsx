export default function ChatMessages({ messages }) {
  return (
    <div className="space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-md ${
            msg.sender === 'guest' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
