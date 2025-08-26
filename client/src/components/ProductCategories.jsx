import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCategories.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert } from '@mui/material'; // Import Material-UI components
import axios from 'axios';

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); // Set loading to true before fetch
        const response = await axios.get(`${BASE_URL}/api/products`);
        const productsData = response.data;
        const uniqueCategories = [...new Set(productsData.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false); // Set loading to false after successful fetch
      } catch (err) {
        setError('Failed to fetch categories.'); // Set error message
        console.error('Error fetching categories:', err);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    ); // Display loading indicator
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>; // Display error message
  }

  return (
    <Box component="section" className="product-categories-section">
      <Box className="container">
        <Typography variant="h4" component="h2" className="section-title">
          Product Categories
        </Typography>
        <Box className="categories-grid">
          {categories.map((category) => (
            <Link to={`/products?category=${encodeURIComponent(category)}`} key={category} className="category-item">
              {/* You might want to add icons or images for categories here */}
              <Typography variant="h6" component="h3">
                {category}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCategories;
