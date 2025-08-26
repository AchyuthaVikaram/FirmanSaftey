import React from 'react';
import '../styles/CtaSection.css';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <Box component="section" className="cta-section">
      <Box className="container">
        <Typography variant="h4" component="h2" className="cta-title">
          Ready to Enhance Your Safety?
        </Typography>
        <Typography variant="body1" className="cta-subtitle" >
          Contact us today for a personalized quote or to learn more about our comprehensive safety solutions.
        </Typography>
        <Box className="cta-buttons">
          <Button variant="contained" className="cta-button primary-button" component={Link} to="/get-a-quote">
            Get a Quote
          </Button>
          <Button variant="outlined" className="cta-button secondary-button" component={Link} to="/contact-us">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CtaSection;
