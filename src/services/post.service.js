import apiClient from './api.service';
import { API_CONFIG } from '../config/api.config';

export const postService = {
  // Generate caption only (doesn't save)
  async generateCaption(imageFile) {
    try {
      console.log('postService.generateCaption called with file:', imageFile.name);
      
      const formData = new FormData();
      formData.append('image', imageFile);

      console.log('Sending POST to:', API_CONFIG.ENDPOINTS.POSTS.GENERATE_CAPTION);
      
      const { data } = await apiClient.post(
        API_CONFIG.ENDPOINTS.POSTS.GENERATE_CAPTION,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Response received:', data);
      return data;
    } catch (error) {
      console.error('postService.generateCaption error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Failed to generate caption' };
    }
  },

  // Create/Save post (uploads to ImageKit and saves to database)
  async createPost(imageFile, caption) {
    try {
      console.log('postService.createPost called');
      console.log('  File:', imageFile.name);
      console.log('  Caption:', caption.substring(0, 50) + '...');
      
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);

      console.log('Sending POST to:', API_CONFIG.ENDPOINTS.POSTS.CREATE);
      
      const { data } = await apiClient.post(
        API_CONFIG.ENDPOINTS.POSTS.CREATE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Post saved successfully:', data);
      return data;
    } catch (error) {
      console.error('postService.createPost error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Failed to save post' };
    }
  },

  // Get all posts
  async getAllPosts() {
    try {
      const { data } = await apiClient.get(API_CONFIG.ENDPOINTS.POSTS.GET_ALL);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch posts' };
    }
  },

  // Delete post
  async deletePost(postId) {
    try {
      const { data } = await apiClient.delete(API_CONFIG.ENDPOINTS.POSTS.DELETE(postId));
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete post' };
    }
  }
};