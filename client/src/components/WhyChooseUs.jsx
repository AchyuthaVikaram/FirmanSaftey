import React from 'react';
import '../styles/WhyChooseUs.css';
import { Box, Typography } from '@mui/material';

const WhyChooseUs = () => {
  return (
    <Box component="section" className="why-choose-us-section">
      <Box className="container">
        <Typography variant="h4" component="h2" className="section-title">
          Why Choose Us?
        </Typography>
        <Box className="reason-grid">
          <Box className="reason-item">
            <Typography variant="h6" component="h3" className="reason-title">
              ISO Certified
            </Typography>
            <Typography variant="body1" className="reason-description">
              Our commitment to quality is backed by ISO certifications, ensuring the highest standards in all our products and processes.
            </Typography>
          </Box>
          <Box className="reason-item">
            <Typography variant="h6" component="h3" className="reason-title">
              Trusted Partner
            </Typography>
            <Typography variant="body1" className="reason-description">
              We have built a reputation as a trusted partner for safety solutions, serving a wide range of industries with integrity.
            </Typography>
          </Box>
          <Box className="reason-item">
            <Typography variant="h6" component="h3" className="reason-title">
              Fast Delivery
            </Typography>
            <Typography variant="body1" className="reason-description">
              We understand the urgency of safety needs. Our efficient logistics ensure prompt and reliable delivery of your orders.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
