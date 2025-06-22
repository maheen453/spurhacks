import { useState, useEffect, useRef } from 'react';
import { SlArrowRightCircle } from "react-icons/sl";


const ChatBox = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationLimitReached, setConversationLimitReached] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setInputMessage('');
    setConversationLimitReached(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || conversationLimitReached) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Call your Gemini API endpoint
      const response = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Check if we've reached 5 user messages
      const userMessageCount = messages.filter(msg => msg.sender === 'user').length + 1;
      
      if (userMessageCount >= 5) {
        setConversationLimitReached(true);
      }
      
    } catch (error) {
      console.error('Error calling API:', error);
      
      // Show error message to user
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong! Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSendMessage();
  };

  // Count user messages for display
  const userMessageCount = messages.filter(msg => msg.sender === 'user').length;

  return (
    <div id="chat" className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col pt-24" style={{ minHeight: '60vh' }}>
      
      {/* Messages Display (conditionally rendered and grows) */}
      <div className="flex-grow w-full">
        {messages.length > 0 && (
          <div
            ref={messagesContainerRef}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            style={{ maxHeight: '50vh', overflowY: 'auto' }}
          >
            {/* Message counter */}
            <div className="text-xs text-gray-300 mb-4 text-center font-medium">
              Messages: {userMessageCount}/5
            </div>
            
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl ${
                      message.sender === 'user'
                        ? 'bg-yellow-400/20 text-white border border-yellow-400/30'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Title and Input Container */}
      <div className={`w-full transition-all duration-500 ease-in-out ${messages.length > 0 ? 'mt-6' : 'my-auto'}`}>
        
        {messages.length === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Goofy Ahh <span className="text-yellow-400">Friend</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Chat with our Gen Z AI assistant to understand modern communication!
            </p>
          </div>
        )}

        {/* Conversation limit reached message */}
        {conversationLimitReached && (
          <div className="text-center mb-6 p-4 bg-yellow-400/20 border border-yellow-400/30 rounded-xl">
            <p className="text-yellow-400 font-medium">Conversation limit reached!</p>
            <p className="text-gray-300 text-sm mt-1">Click "Reset Chatbot" to start a new conversation.</p>
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="relative w-full" autoComplete="off">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              conversationLimitReached 
                ? "Conversation limit reached" 
                : isLoading 
                  ? "AI is thinking..." 
                  : "Ask anything..."
            }
            disabled={isLoading || conversationLimitReached}
            className="text-white w-full py-4 pl-5 pr-16 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading || conversationLimitReached}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <div className="p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SlArrowRightCircle className="w-6 h-6" />
            </div>
          </button>
        </form>
        
        {/* Action buttons */}
        <div className="text-center mt-6 space-x-4">
          {messages.length > 0 && !conversationLimitReached && (
            <button
              onClick={clearChat}
              className="text-sm text-gray-300 hover:text-yellow-400 underline transition-colors"
            >
              Clear Chat
            </button>
          )}
          
          {conversationLimitReached && (
            <button
              onClick={clearChat}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors font-medium"
            >
              Reset Chatbot
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox; 