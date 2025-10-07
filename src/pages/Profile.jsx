import { useState, useEffect } from 'react';
import { postService } from '../services/post.service';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts'); // posts, settings, analytics

  useEffect(() => {
    fetchUserData();
    fetchPosts();
  }, []);

  const fetchUserData = () => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await postService.getAllPosts();
      setPosts(response.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          
          {/* Profile Info */}
          <div className="px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-20 sm:-mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                  👤
                </div>
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* User Details */}
              <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{user?.username || 'User'}</h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                
                {/* Stats */}
                <div className="flex justify-center sm:justify-start space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{posts.length}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {posts.reduce((acc, post) => acc + (post.caption?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Captions Length</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">Pro</div>
                    <div className="text-sm text-gray-600">Plan</div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'posts', label: 'My Posts', icon: '📸' },
                { id: 'analytics', label: 'Analytics', icon: '📊' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts ({posts.length})</h2>
                {posts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-lg font-medium">No posts yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <div key={post._id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                          src={post.image}
                          alt={post.caption}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <p className="text-sm text-gray-700 line-clamp-2">{post.caption}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'Total Posts', value: posts.length, icon: '📸', color: 'from-blue-500 to-cyan-500' },
                    { label: 'Total Captions', value: posts.length, icon: '✍️', color: 'from-purple-500 to-pink-500' },
                    { label: 'Avg. Caption Length', value: Math.round(posts.reduce((acc, p) => acc + (p.caption?.length || 0), 0) / posts.length) || 0, icon: '📏', color: 'from-green-500 to-emerald-500' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white`}>
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                        <div className="flex items-center">
                          <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover mr-4" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Caption generated</p>
                            <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        <span className="text-green-600 font-medium text-sm">✓ Success</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  {/* Profile Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          defaultValue={user?.username}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Email notifications</span>
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Auto-save captions</span>
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Show analytics</span>
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" defaultChecked />
                      </label>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}