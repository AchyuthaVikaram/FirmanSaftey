import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogPostPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/blogposts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog post details.');
        console.error('Error fetching blog post details:', err);
        setLoading(false);
      }
    };

    if (postId) {
      fetchBlogPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Blog post not found.</Alert>
      </Box>
    );
  }

  return (
    <Box className="blog-post-detail-page">
      <img src={post.imageUrl} alt={post.title} className="blog-post-detail-image" />
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mt: 3, mb: 1 }}>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'var(--medium-gray)', mb: 3 }}>
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      <Box className="blog-post-content">
        <Typography variant="body1">
          {post.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogPostPage;
