import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Caption Generation',
      description: 'Our advanced AI analyzes your images and generates creative, engaging captions that match your content perfectly.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Processing',
      description: 'Get your captions in seconds, not minutes. Our optimized AI processes images instantly.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: '☁️',
      title: 'Cloud Storage',
      description: 'All your images are securely stored on ImageKit cloud. Access them anytime, anywhere.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: '🎨',
      title: 'Creative & Unique',
      description: 'Every caption is unique and tailored to your image. Say goodbye to generic captions.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Works perfectly on all devices - desktop, tablet, and mobile. Caption on the go!',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your images or information.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: '🎯',
      title: 'Multi-Platform Support',
      description: 'Captions optimized for Instagram, Facebook, Twitter, LinkedIn, and more.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track your posts, see which captions perform best, and optimize your content.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: '🌍',
      title: 'Multi-Language Support',
      description: 'Generate captions in multiple languages to reach a global audience.',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Powerful Features</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Everything you need to create amazing social media content with AI
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-transparent hover:border-purple-500"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white text-3xl mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Image',
                description: 'Choose an image from your device or drag and drop',
                icon: '📤'
              },
              {
                step: '2',
                title: 'AI Generates Caption',
                description: 'Our AI analyzes your image and creates a perfect caption',
                icon: '🤖'
              },
              {
                step: '3',
                title: 'Save & Share',
                description: 'Save to your library and share on social media',
                icon: '✨'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="relative">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Create Amazing Captions?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of content creators using Caption-IO
          </p>
          <button
            className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-xl"
            onClick={() => navigate("/")}
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}