const About = () => {
  return (
    <div id="about" className="w-full max-w-4xl mx-auto px-4 py-8 pt-24">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Bridge the <span className="text-yellow-400">Generation Gap</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Helping older marketers and professionals connect with Gen Z through modern slang, AI-powered conversations, and trendy image captions.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Left Column - What We Do */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-yellow-400 mr-3">✨</span>
            What We Do
          </h2>
          <p className="text-gray-200 mb-4">
            We understand that connecting with Gen Z can feel like learning a new language. 
            That's why we've created tools that translate your message into the modern slang 
            that resonates with younger audiences.
          </p>
          <p className="text-gray-200">
            Whether you're a marketer trying to reach younger customers, a parent wanting to 
            understand your kids better, or just someone who wants to stay current with 
            today's communication styles, we've got you covered.
          </p>
        </div>

        {/* Right Column - Why It Matters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-yellow-400 mr-3">🎯</span>
            Why It Matters
          </h2>
          <p className="text-gray-200 mb-4">
            In today's digital age, effective communication across generations is crucial. 
            Gen Z has their own unique language and communication style that can be 
            challenging for older generations to understand and adopt.
          </p>
          <p className="text-gray-200">
            Our platform bridges this gap, making it easier for you to create content 
            that genuinely connects with younger audiences while maintaining your 
            authentic voice and message.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Our <span className="text-yellow-400">Powerful Tools</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Gen Z Chatbot</h3>
            <p className="text-gray-200">
              Have authentic conversations with our AI that speaks Gen Z fluently. 
              Perfect for understanding modern communication patterns.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Slang Translator</h3>
            <p className="text-gray-200">
              Transform your formal text into trendy Gen Z slang instantly. 
              Make your message relatable and engaging for younger audiences.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Captions</h3>
            <p className="text-gray-200">
              Upload any image and get trendy, Gen Z-style captions that will 
              make your social media posts more engaging and relatable.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Perfect For <span className="text-yellow-400">Everyone</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">👔</span>
              <div>
                <h4 className="font-semibold text-white">Marketing Professionals</h4>
                <p className="text-gray-200 text-sm">Create campaigns that resonate with younger demographics</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">👨‍💼</span>
              <div>
                <h4 className="font-semibold text-white">Business Leaders</h4>
                <p className="text-gray-200 text-sm">Connect with Gen Z employees and customers effectively</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">👨‍👩‍👧‍👦</span>
              <div>
                <h4 className="font-semibold text-white">Parents & Families</h4>
                <p className="text-gray-200 text-sm">Better understand and communicate with Gen Z family members</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">🎓</span>
              <div>
                <h4 className="font-semibold text-white">Educators</h4>
                <p className="text-gray-200 text-sm">Engage with students using language they understand</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-300 text-lg">
          Ready to bridge the generation gap? 
          <span className="text-yellow-400 font-semibold"> Start exploring our tools above!</span>
        </p>
      </div>
    </div>
  );
};

export default About;