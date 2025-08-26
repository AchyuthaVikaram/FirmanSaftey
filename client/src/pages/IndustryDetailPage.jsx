import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/IndustryDetailPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const IndustryDetailPage = () => {
  const { industryId } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/industries/${industryId}`);
        setIndustry(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch industry details.');
        console.error('Error fetching industry details:', err);
        setLoading(false);
      }
    };

    if (industryId) {
      fetchIndustry();
    }
  }, [industryId]);

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

  if (!industry) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Industry not found.</Alert>
      </Box>
    );
  }

  return (
    <Box className="industry-detail-page">
      <Box className="industry-detail-header">
        <img src={industry.imageUrl} alt={industry.name} className="industry-detail-image" />
        <Box className="industry-detail-info">
          <Typography variant="h4" component="h1">
            {industry.name}
          </Typography>
          <Typography variant="body1" className="industry-detail-description">
            {industry.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IndustryDetailPage;
