import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";
import CaptionDisplay from "../components/CaptionDisplay";
import { postService } from "../services/post.service";

export default function Home({ isLoggedIn }) {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  
  // New state for posts
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await postService.getAllPosts();
      setPosts(response.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    console.log('Starting image upload...', file.name);
    setCurrentFile(file);
    setSuccess("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setLoading(true);
    setError("");
    setCaption("");

    try {
      console.log('Calling postService.generateCaption...');
      const response = await postService.generateCaption(file);
      console.log('Caption received:', response);
      setCaption(response.caption || response.message);
    } catch (err) {
      console.error('Error generating caption:', err);
      setError(err.message || "Failed to generate caption");
      setImagePreview(null);
      setCurrentFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    if (!currentFile || !caption) {
      setError("Please generate a caption first");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      console.log('Saving post to ImageKit and database...');
      const response = await postService.createPost(currentFile, caption);
      console.log('Post saved:', response);
      
      setSuccess("Post saved successfully! 🎉");
      
      await fetchPosts();
      
      setTimeout(() => {
        setCaption("");
        setImagePreview(null);
        setCurrentFile(null);
        setSuccess("");
      }, 2000);
      
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postService.deletePost(postId);
      await fetchPosts();
      alert('Post deleted successfully!');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Cover Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            {/* Icon/Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-full p-4 shadow-2xl">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              AI Caption Generator
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-indigo-100 mb-6 max-w-3xl mx-auto">
              Transform your images into engaging social media posts with AI-powered captions
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cloud Storage</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-indigo-500">{posts.length}</div>
                <div className="text-sm text-indigo-500 mt-1">Posts Created</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-indigo-500">∞</div>
                <div className="text-sm text-indigo-500 mt-1">AI Generations</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-indigo-500">24/7</div>
                <div className="text-sm text-indigo-500 mt-1">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-16 text-gray-50" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0 22L60 16.7C120 11 240 1 360 0.333333C480 -1 600 7 720 13C840 19 960 22 1080 20.3333C1200 19 1320 13 1380 10.3333L1440 7.66667V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload Section (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-xl sm:rounded-lg p-6 sticky top-4 border-t-4 border-indigo-600">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Post
                </h2>
                
                {/* Upload Component */}
                <ImageUpload onUpload={handleImageUpload} />
                
                {/* ✅ Image Preview - Shows immediately after upload */}
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                      <img 
                        src={imagePreview} 
                        alt="Uploaded preview" 
                        className="w-full h-auto object-contain bg-gray-50"
                        style={{ maxHeight: '400px' }}
                      />
                      
                      {/* Loading Overlay - Only during caption generation */}
                      {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                          <p className="text-white text-sm font-medium">Generating caption...</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mt-4 rounded-md bg-green-50 p-4 border border-green-200">
                    <div className="flex">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="ml-3 text-sm text-green-800 font-medium">{success}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 rounded-md bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="ml-3 text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                )}
                
                {/* Generated Caption Display */}
                {caption && !loading && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Generated Caption:</h3>
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                      {caption}
                    </p>
                  </div>
                )}

                {/* Save Button */}
                {caption && !loading && (
                  <div className="mt-6">
                    <button
                      onClick={handleSavePost}
                      disabled={saving}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving to ImageKit...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          💾 Save Post to ImageKit
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - My Posts Section (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-xl sm:rounded-lg p-6 border-t-4 border-purple-600">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <svg className="w-7 h-7 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    My Posts ({posts.length})
                  </h2>
                  <button
                    onClick={() => setShowPosts(!showPosts)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {showPosts ? 'Hide' : 'Show'}
                  </button>
                </div>

                {showPosts && (
                  <div className="space-y-8">
                    {loadingPosts ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                      </div>
                    ) : posts.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-4 text-lg font-medium">No posts yet</p>
                        <p className="mt-1 text-sm">Create your first post to get started!</p>
                      </div>
                    ) : (
                      posts.map((post) => (
                        <div key={post._id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                          {/* Image Section - Full Width (No clickable overlay) */}
                          <div className="relative w-full">
                            <img 
                              src={post.image} 
                              alt={post.caption}
                              className="w-full h-auto object-contain bg-gray-50"
                              style={{ maxHeight: '600px' }}
                            />
                          </div>
                          
                          {/* Caption Section */}
                          <div className="p-6">
                            <div className="mb-4">
                              <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                                {post.caption}
                              </p>
                            </div>
                            
                            {/* ✅ Footer with date and Delete button only (no View Full) */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                              <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center transition-colors"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal for viewing image */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={selectedPost.image} 
              alt={selectedPost.caption}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {selectedPost.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedPost.caption}
                </p>
                {selectedPost.createdAt && (
                  <p className="text-gray-300 text-sm mt-2">
                    {new Date(selectedPost.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}