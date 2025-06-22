import React from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import BrainrotTranslator from './components/BrainrotTranslator'
import Chatbot from './components/Chatbox'
import Upload from './components/Upload'
// import Header from './components/Header'


const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <main className="pt-24">
        <section>
          <About/>
        </section>
        <section className="py-16">
          <Chatbot/>
        </section>
        <section className="py-16 pb-32">
          <BrainrotTranslator/>
        </section>
        <section className="py-8 pt-32">
          <Upload/>
        </section>
      </main>
    </div>
  )
}

export default App