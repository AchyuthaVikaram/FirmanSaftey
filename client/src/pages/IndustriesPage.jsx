import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/IndustriesPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const IndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/industries`);
        setIndustries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch industries.');
        console.error('Error fetching industries:', err);
        setLoading(false);
      }
    };

    fetchIndustries();
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
    <Box className="industries-page">
      <Typography variant="h4" component="h1" className="industries-page-title">
        Industries We Serve
      </Typography>
      <Box className="industry-list">
        {industries.map((industry) => (
          <Box key={industry._id} className="industry-card">
            <img src={industry.imageUrl} alt={industry.name} className="industry-image" />
            <Typography variant="h6" component="h2" className="industry-name">
              {industry.name}
            </Typography>
            <Typography variant="body2" className="industry-description">
              {industry.description}
            </Typography>
            <Button variant="contained" component={Link} to={`/industries/${industry._id}`} className="view-details-button">
              Learn More
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default IndustriesPage;
