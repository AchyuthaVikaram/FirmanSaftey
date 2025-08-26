import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/blogposts`);
        setBlogPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts.');
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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

  return (
    <Box className="blog-page">
      <Typography variant="h4" component="h1" className="blog-page-title">
        Our Blog
      </Typography>
      <Box className="blog-post-list">
        {blogPosts.map((post) => (
          <Box key={post._id} className="blog-post-card">
            <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
            <Box className="blog-post-content">
              <Typography variant="h6" component="h2" className="blog-post-title">
                {post.title}
              </Typography>
              <Typography variant="body2" className="blog-post-meta">
                By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" className="blog-post-excerpt">
                {post.excerpt}
              </Typography>
              <Button variant="contained" component={Link} to={`/blog/${post._id}`} className="read-more-button">
                Read More
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlogPage;
