import { useState, useEffect, useRef } from 'react';
import { SlArrowRightCircle } from "react-icons/sl";


const ChatBox = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationLimitReached, setConversationLimitReached] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      handleSendMessage();
    }
  };

  // Count user messages for display
  const userMessageCount = messages.filter(msg => msg.sender === 'user').length;

  return (
    <div id="chat" className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col" style={{ minHeight: '60vh' }}>
      
      {/* Messages Display (conditionally rendered and grows) */}
      <div className="flex-grow w-full">
        {messages.length > 0 && (
          <div className="h-full bg-white rounded-lg p-4 overflow-y-auto" style={{maxHeight: '40vh'}}>
            {/* Message counter */}
            <div className="text-xs text-gray-500 mb-3 text-center">
              Messages: {userMessageCount}/5
            </div>
            
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

        {/* Conversation limit reached message */}
        {conversationLimitReached && (
          <div className="text-center mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 font-medium">Conversation limit reached!</p>
            <p className="text-yellow-700 text-sm">Click "Reset Chatbot" to start a new conversation.</p>
          </div>
        )}

        {/* Chat Input */}
        <div className="relative w-full">
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
            className="w-full py-4 pl-5 pr-16 border-2 border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || conversationLimitReached}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <div className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SlArrowRightCircle className="w-6 h-6" />
            </div>
          </button>
        </div>
        
        {/* Action buttons */}
        <div className="text-center mt-4 space-x-4">
          {messages.length > 0 && !conversationLimitReached && (
            <button
              onClick={clearChat}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear Chat
            </button>
          )}
          
          {conversationLimitReached && (
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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