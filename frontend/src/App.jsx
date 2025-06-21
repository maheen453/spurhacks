import React from 'react'
import Navbar from './components/Navbar'
import BrainrotTranslator from './components/BrainrotTranslator'
import Chatbot from './components/Chatbox'
import Upload from './components/Upload'
// import Header from './components/Header'


const App = () => {
  return (
    <div className="relative h-full overflow-y-auto antialiased">
      <div className="relative z-10 flex flex-col items-center p-4 space-y-8 container mx-auto">
        <Navbar/>
        <BrainrotTranslator/>
        <Chatbot/>
        <Upload/>

      </div>
    </div>
  )
}

export default App