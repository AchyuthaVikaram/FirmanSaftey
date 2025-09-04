import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert, Button, TextField, Paper } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isAuthenticated } = useCart();
  const { success, error: showError } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error('Error fetching product details:', err);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const added = addToCart(product, quantity, navigate);
      if (added) {
        success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
      } else {
        showError('Please login to add items to cart');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: '#f5f5f5'
      }}>
        <CircularProgress size={60} sx={{ color: 'var(--primary-royal-blue)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        p: 4, 
        backgroundColor: '#f5f5f5',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Alert severity="error" sx={{ maxWidth: 600 }}>{error}</Alert>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ 
        p: 4, 
        backgroundColor: '#f5f5f5',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Alert severity="info" sx={{ maxWidth: 600 }}>Product not found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      py: 4
    }}>
      <Box sx={{ 
        maxWidth: 'var(--container-max-width)', 
        mx: 'auto',
        px: { xs: 2, md: 4 }
      }}>
        <Paper sx={{ 
          p: { xs: 3, md: 6 },
          backgroundColor: 'var(--white)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 3, md: 6 }
          }}>
            {/* Product Image */}
            <Box sx={{ 
              flex: { lg: '0 0 45%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
              <Box sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                backgroundColor: 'var(--white)'
              }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Box>

            {/* Product Info */}
            <Box sx={{ 
              flex: { lg: '1' },
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}>
              <Box>
                <Typography variant="h3" component="h1" sx={{
                  fontWeight: 'bold',
                  color: 'var(--primary-royal-blue)',
                  mb: 1,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}>
                  {product.name}
                </Typography>
                
                <Typography variant="h6" sx={{
                  color: 'var(--secondary-safety-yellow)',
                  fontWeight: 'bold',
                  mb: 2,
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  px: 2,
                  py: 0.5,
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  {product.category}
                </Typography>

                <Typography variant="h4" sx={{
                  fontWeight: 'bold',
                  color: 'var(--primary-royal-blue)',
                  mb: 3
                }}>
                  ${product.price?.toFixed(2) || '0.00'}
                </Typography>
              </Box>

              <Box sx={{
                backgroundColor: '#f8f9fa',
                p: 3,
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'var(--primary-royal-blue)'
                }}>
                  Product Description
                </Typography>
                <Typography variant="body1" sx={{
                  lineHeight: 1.8,
                  color: 'var(--dark-text)',
                  fontSize: '1.1rem'
                }}>
                  {product.description}
                </Typography>
              </Box>

              {/* Quantity and Add to Cart */}
              <Box sx={{
                backgroundColor: 'rgba(255, 193, 7, 0.05)',
                p: 3,
                borderRadius: '12px',
                border: '2px solid var(--secondary-safety-yellow)'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'var(--primary-royal-blue)'
                }}>
                  Order Details
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  mb: 3,
                  flexWrap: 'wrap'
                }}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    inputProps={{ min: 1 }}
                    sx={{ 
                      width: { xs: '100%', sm: 120 },
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'var(--white)'
                      }
                    }}
                    size="medium"
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddToCart}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      backgroundColor: isAuthenticated ? 'var(--secondary-safety-yellow)' : 'var(--medium-gray)',
                      color: 'var(--dark-text)',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: isAuthenticated ? '#E6B000' : 'var(--medium-gray)',
                        transform: isAuthenticated ? 'translateY(-2px)' : 'none',
                        boxShadow: isAuthenticated ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                      },
                      transition: 'all 0.3s ease',
                      cursor: isAuthenticated ? 'pointer' : 'default'
                    }}
                  >
                    {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
                  </Button>
                </Box>

                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/cart"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    borderColor: 'var(--primary-royal-blue)',
                    color: 'var(--primary-royal-blue)',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: 'var(--primary-royal-blue)',
                      color: 'var(--white)',
                      borderColor: 'var(--primary-royal-blue)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Cart & Get Quote
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
