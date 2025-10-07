export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">About Caption-IO</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            We're revolutionizing social media content creation with AI-powered caption generation
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              Caption-IO was created to solve a common problem: spending too much time thinking of the perfect caption for your social media posts.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              With the power of AI, we analyze your images and generate creative, engaging captions in seconds. Whether you're a content creator, marketer, or just someone who loves sharing moments online, we're here to make your life easier.
            </p>
            <p className="text-lg text-gray-600">
              Our mission is to empower everyone to create better content faster, without compromising on quality or creativity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8"  stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                  <p className="text-indigo-100">Generate captions in seconds, not minutes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8"  stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
                  <p className="text-indigo-100">Using Google's Gemini AI for best results</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8"  stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                  <p className="text-indigo-100">Your images stored safely on ImageKit cloud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600">Meet the person behind Caption-IO</p>
          </div>

          <div className="max-w-md mx-auto bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white shadow-md text-6xl">
                👨‍💻
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Shivraj Singh Pipawad</h3>
            <p className="text-gray-600 mb-4">Creator & Developer</p>
            <p className="text-gray-500 text-sm mb-6">
              B.Tech IT student passionate about AI, Web Development, and building
              innovative projects that blend creativity with technology.
            </p>

            
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '100K+', label: 'Captions Generated' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}