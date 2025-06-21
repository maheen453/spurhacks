import { useState, useEffect, useRef } from 'react';

const ChatBox = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: `You said: "${inputMessage}" - This is a simulated response!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col" style={{ minHeight: '60vh' }}>
      
      {/* Messages Display (conditionally rendered and grows) */}
      <div className="flex-grow w-full">
        {messages.length > 0 && (
          <div className="h-full bg-white rounded-lg p-4 overflow-y-auto" style={{maxHeight: '40vh'}}>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Title and Input Container */}
      <div className={`w-full transition-all duration-500 ease-in-out ${messages.length > 0 ? 'mt-6' : 'my-auto'}`}>
        
        {messages.length === 0 && (
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Goofy Ahh Friend
            </h2>
        )}

        {/* Chat Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything..."
            className="w-full py-4 pl-5 pr-16 border-2 border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <div className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7-7"></path></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox; 