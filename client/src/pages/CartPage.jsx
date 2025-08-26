import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getItemCount } = useCart();
  const { success, warning } = useToast();

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
      success('Cart updated successfully!');
    } else {
      warning('Quantity must be at least 1');
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    success(`${productName} removed from cart`);
  };

  return (
    <Box sx={{ 
      p: 4, 
      maxWidth: 'var(--container-max-width)', 
      mx: 'auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        textAlign: 'center', 
        mb: 4,
        color: 'var(--primary-royal-blue)',
        fontWeight: 'bold'
      }}>
        Shopping Cart ({getItemCount()} items)
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8,
          p: 4,
          backgroundColor: 'var(--white)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: 500
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--medium-gray)' }}>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/products"
            sx={{ 
              mt: 2,
              backgroundColor: 'var(--secondary-safety-yellow)',
              color: 'var(--dark-text)',
              '&:hover': {
                backgroundColor: '#E6B000'
              }
            }}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ 
            mb: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'var(--primary-royal-blue)' }}>
                  <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product._id} sx={{ '&:hover': { backgroundColor: 'var(--light-gray)' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          style={{ 
                            width: 60, 
                            height: 60, 
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }} 
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {item.product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        ${item.product.price?.toFixed(2) || '0.00'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                        inputProps={{ min: 1 }}
                        size="small"
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        ${((item.product.price || 0) * item.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleRemoveItem(item.product._id, item.product.name)}
                        color="error"
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'rgba(244, 67, 54, 0.1)' 
                          } 
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'var(--white)',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Subtotal: ${getTotalPrice().toFixed(2)}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              component={Link} 
              to="/get-a-quote"
              sx={{ 
                width: '100%',
                backgroundColor: 'var(--secondary-safety-yellow)',
                color: 'var(--dark-text)',
                fontWeight: 'bold',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#E6B000'
                }
              }}
            >
              Proceed to Get a Quote
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
