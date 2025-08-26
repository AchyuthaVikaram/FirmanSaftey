import React from 'react';
import '../styles/FeaturedProducts.css';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../lib/constants';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products?featured=true`); // Assuming a featured endpoint
        setFeaturedProducts(response.data.slice(0, 3)); // Display top 3 featured products
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products.');
        console.error('Error fetching featured products:', err);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return <Typography>Loading featured products...</Typography>; // Or a CircularProgress
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box component="section" className="featured-products-section">
      <Box className="container">
        <Typography variant="h4" component="h2" className="section-title">
          Featured Products
        </Typography>
        <Box className="products-grid">
          {featuredProducts.map((product) => (
            <Box key={product._id} className="product-item">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <Typography variant="h6" component="h3" className="product-name">
                {product.name}
              </Typography>
              <Typography variant="body2" className="product-description">
                {product.description}
              </Typography>
              <Button variant="contained" className="view-product-button" component={Link} to={`/products/${product._id}`}>
                View Product
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
