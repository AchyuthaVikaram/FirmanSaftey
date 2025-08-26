import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ProductsPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category');

        let url = `${BASE_URL}/api/products`;
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]); // Re-fetch when URL search params change

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
    <Box className="products-page">
      <Typography variant="h4" component="h1" className="products-page-title">
        Our Products
      </Typography>
      <Box className="product-list">
        {products.map((product) => (
          <Box key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <Typography variant="h6" component="h2" className="product-name">
              {product.name}
            </Typography>
            <Typography variant="body2" className="product-description">
              {product.description}
            </Typography>
            <Button variant="contained" component={Link} to={`/products/${product._id}`} className="view-details-button">
              View Details
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductsPage;
