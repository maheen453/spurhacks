import { useState } from 'react';
import { SlArrowRightCircle } from "react-icons/sl";

const BrainrotTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;
    
    setIsLoading(true);
    setOutputText('');
    
    try {
      // Call your Gemini API endpoint
      const response = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Only translate this text to Gen Z slang, don't add any other text: ${inputText}`
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOutputText(data.response);
      
    } catch (error) {
      console.error('Error calling API:', error);
      setOutputText('Sorry, something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div id="translate" className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-white">
      <header className="text-center mb-10">
        {/* Logo */}
        <div className="inline-block mb-4">
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Brainrot Translator</h1>
        <p className="text-gray-600 mt-2">Translate any text to Gen Z slang! (Ctrl+Enter to translate)</p>
      </header>

      <main className="w-full max-w-4xl flex flex-col md:flex-row gap-12 ml-64 mr-64">
        {/* Input Area */}
        <div className="flex-1 relative">
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full h-64 bg-[#1C1C1E] border border-gray-700 rounded-xl p-4 pt-10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={isLoading ? "Translating..." : "Type or paste your text here..."}
          />

          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SlArrowRightCircle className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Output Area */}
        <div className="flex-1 relative">
          <textarea
            id="output-text"
            readOnly
            value={outputText}
            className="w-full h-64 bg-[#1C1C1E] border border-gray-700 rounded-xl p-4 pt-10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={isLoading ? "Translating..." : "Translation will appear here..."}
          />
          
          {/* Clear button */}
          {outputText && (
            <button
              onClick={clearText}
              className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white underline"
            >
              Clear
            </button>
          )}
        </div>
      </main>

      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">Translating to Gen Z slang...</p>
        </div>
      )}
    </div>
  );
};

export default BrainrotTranslator; 