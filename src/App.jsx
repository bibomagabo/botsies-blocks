export default function App() {
  return (
    <div id="root">
      {/* Side panel */}
      <div className="side-panel">
        <h3>Assistants</h3>
        <p>Default Assistant</p>
        <p>Future Assistant</p>
        <h3>Settings</h3>
        <p>Placeholder Option</p>
        <h3>Other Features</h3>
        <p>Placeholder Feature</p>
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        {/* Header */}
        <header className="header">Guest Chat</header>

        {/* Chat conversation */}
        <div className="chat-conversation">
          <p>Guest: Hello!</p>
          <p>Bot: Hi, how can I assist you today?</p>
          <p>Guest: Can you help me with my project?</p>
          <p>Bot: Sure! Let me know the details.</p>
        </div>

        {/* Chat input box */}
        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
