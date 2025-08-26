import React, { useState, useEffect } from 'react';
import '../styles/GetQuotePage.css';
import { BASE_URL } from '../lib/constants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const GetQuotePage = () => {
  const { cartItems, clearCart, getItemCount } = useCart();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getItemCount() > 0) {
      // Optionally, you could pre-fill product interest with a summary of cart items
      // For now, we'll just ensure cart items are sent with the request
    }
  }, [getItemCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      ...formData,
      products: cartItems.map(item => ({ product: item.product._id, quantity: item.quantity })),
    };

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(`${BASE_URL}/api/requests`, requestData, { headers });

      if (response.status === 201 || response.status === 200) {
        success('Quote request submitted successfully! We will contact you soon.');
        clearCart();
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
        navigate('/profile');
      } else {
        error(response.data?.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      error(err.response?.data?.message || 'An unexpected error occurred.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, mx: 'auto', maxWidth: 'var(--container-max-width)' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Get a Quote
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
        Please fill out the form below to request a quote for our products or services.
      </Typography>

      {getItemCount() > 0 && (
        <Box sx={{ mb: 4, p: 2, border: '1px solid var(--light-gray)', borderRadius: '8px', backgroundColor: 'var(--white)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Items in your cart:</Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.product._id} disablePadding>
                <ListItemText primary={`${item.product.name} (Qty: ${item.quantity})`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          placeholder="Please describe your requirements or any specific questions you have..."
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Quote Request'}
        </Button>
      </Box>
    </Box>
  );
};

export default GetQuotePage;
