import React, { useState } from 'react';
import '../styles/ContactUsPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, Button, TextField, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(response.data?.message || 'Failed to submit contact form.');
        setSubmitStatus('error');
        console.error('Form submission failed:', response.statusText);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      setSubmitStatus('error');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, mx: 'auto', maxWidth: 'var(--container-max-width)' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
        We'd love to hear from you! Please fill out the form below.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{
        maxWidth: 700,
        mx: 'auto',
        p: 'calc(var(--spacing-unit) * 2)',
        border: '1px solid var(--light-gray)',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: 'var(--white)',
      }}>
        {error && submitStatus === 'error' && <Alert severity="error" sx={{ mb: 2 }}>{error || 'There was an error sending your message. Please try again later.'}</Alert>}
        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>Your message has been sent successfully!</Alert>
        )}
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
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={5}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
        </Button>
      </Box>

      <Box sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 'calc(var(--section-padding-y) * 0.75)',
        p: 'calc(var(--spacing-unit) * 2)',
        backgroundColor: 'var(--white)',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
      }}>
        <Typography variant="h5" gutterBottom>
          Our Information
        </Typography>
        <Typography variant="body1"><strong>Address:</strong> 123 Safety Main, Industrial City, Country</Typography>
        <Typography variant="body1"><strong>Phone:</strong> +1 (555) 123-4567</Typography>
        <Typography variant="body1"><strong>Email:</strong> info@firmansafety.com</Typography>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
