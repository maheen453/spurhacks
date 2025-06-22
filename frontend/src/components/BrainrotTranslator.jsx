import { useState } from 'react';
import { SlArrowRightCircle } from "react-icons/sl";

const BrainrotTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleTranslate = () => {
    // Placeholder for actual translation logic
    setOutputText(`Translated: ${inputText}`);
  };

  return (
        <div id="translate" className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-white">
        <header className="text-center mb-10">
            {/* Logo */}
            <div className="inline-block mb-4">
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Brainrot Translator</h1>
        </header>

        <main className="w-full max-w-4xl flex flex-col md:flex-row gap-12 ml-64 mr-64">
            {/* Input Area */}
            <div className="flex-1 relative">
            <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 bg-[#1C1C1E] border border-gray-700 rounded-xl p-4 pt-10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type or paste your text here..."
            />
                <button
                    onClick={handleTranslate}
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
                placeholder="Translation will appear here..."
            />
            </div>
        </main>
        </div>
  );
};

export default BrainrotTranslator 