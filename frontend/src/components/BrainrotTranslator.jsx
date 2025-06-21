import { useState } from 'react';

const BrainrotTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleTranslate = () => {
    // Placeholder for actual translation logic
    setOutputText(`Translated: ${inputText}`);
  };

  return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-white">
        <header className="text-center mb-10">
            {/* Logo */}
            <div className="inline-block mb-4">
            </div>
            <h1 className="text-3xl font-bold text-black">Brainrot Translator</h1>
        </header>

        <main className="w-full max-w-4xl flex flex-col md:flex-row gap-12  m-64">
            {/* Input Area */}
            <div className="flex-1 relative">
            <label htmlFor="input-text" className="text-gray-400 text-sm font-medium absolute top-3 left-4">
                Normal
            </label>
            <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 bg-[#1C1C1E] border border-gray-700 rounded-xl p-4 pt-10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="Type or paste your text here..."
            />
            <button 
                onClick={handleTranslate}
                className="absolute bottom-4 right-4 bg-gray-600 rounded-full p-2 hover:bg-gray-500 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m-7 7l7-7 7 7" />
                </svg>
            </button>
            </div>

            {/* Output Area */}
            <div className="flex-1 relative">
            <label htmlFor="output-text" className="text-gray-400 text-sm font-medium absolute top-3 left-4">
                Translation
            </label>
            <textarea
                id="output-text"
                readOnly
                value={outputText}
                className="w-full h-64 bg-[#1C1C1E] border border-gray-700 rounded-xl p-4 pt-10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Translation will appear here..."
            />
            </div>
        </main>
        </div>
  );
};

export default BrainrotTranslator 