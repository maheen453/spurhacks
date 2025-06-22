import { useState } from 'react';
import { SlArrowRightCircle } from "react-icons/sl";
import { FaCopy, FaCheck } from "react-icons/fa";

const BrainrotTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
          message: `I only want the translation of this text to Gen Z slang, don't add any other text. This is not a question or conversation, it is a translation: ${inputText}`
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
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div id="translate" className="w-full max-w-6xl mx-auto px-4 py-8 pt-44">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Brainrot <span className="text-yellow-400">Translator</span>
        </h1>
        <p className="text-gray-300 text-lg">Translate any text to Gen Z slang! (Ctrl+Enter to translate)</p>
      </header>

      <main className="w-full flex flex-col md:flex-row gap-4 items-center">
        {/* Input Area */}
        <div className="flex-1">
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400"
            placeholder={isLoading ? "Translating..." : "Type or paste your text here..."}
          />
        </div>

        {/* Translate Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SlArrowRightCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Output Area */}
        <div className="flex-1 relative">
          <textarea
            id="output-text"
            readOnly
            value={outputText}
            className="w-full h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50"
            placeholder={isLoading ? "Translating..." : "Translation will appear here..."}
          />
          
          {/* Copy button */}
          {outputText && (
            <button
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 p-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </main>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {outputText && (
          <button
            onClick={clearText}
            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-colors font-medium border border-white/20"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <p className="text-gray-300 mt-3">Translating to Gen Z slang...</p>
        </div>
      )}
    </div>
  );
};

export default BrainrotTranslator; 