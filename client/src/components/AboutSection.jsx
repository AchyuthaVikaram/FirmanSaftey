import React from 'react';
import '../styles/AboutSection.css';
import { Box, Typography } from '@mui/material';

const AboutSection = () => {
  return (
    <Box component="section" className="about-section">
      <Box className="container">
        <Typography variant="h4" component="h2" className="section-title">
          About Firman Safety
        </Typography>
        <Typography variant="body1" className="about-text">
          Firman Safety is a leading provider of high-quality personal protective equipment (PPE) and safety solutions.
          With a commitment to safeguarding workplaces and individuals, we offer a comprehensive range of products
          designed to meet the stringent demands of various industries. Our dedication to quality, reliability, and
          customer satisfaction sets us apart as your trusted partner in safety.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutSection;
