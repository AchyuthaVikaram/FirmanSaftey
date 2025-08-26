import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <Box className="about-us-page-container">
      <Box className="about-us-hero-banner">
        <Typography variant="h3" component="h1" className="about-us-hero-title">
          About Us
        </Typography>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--white)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 'calc(var(--spacing-unit) * 2)' }}>
            Our History
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 800, mx: 'auto', mb: 'calc(var(--spacing-unit) * 1.5)' }}>
            Founded in [Year], Firman Safety embarked on a mission to revolutionize workplace safety.
            Starting as a small distributor of essential PPE, we have grown into a comprehensive provider
            of safety solutions, earning the trust of countless industries and businesses.
            Our journey has been marked by continuous innovation, unwavering commitment to quality,
            and a deep understanding of evolving safety needs.
          </Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--light-gray)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 'calc(var(--spacing-unit) * 1.5)', mt: 'calc(var(--spacing-unit) * 2)' }}>
          <Box className="mission-vision-item">
            <Typography variant="h5" component="h3" sx={{ mb: 'var(--spacing-unit)', color: 'var(--primary-royal-blue)', fontWeight: 700 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'var(--dark-text)' }}>
              To protect lives and foster safer working environments by providing superior quality
              personal protective equipment and innovative safety solutions.
            </Typography>
          </Box>
          <Box className="mission-vision-item">
            <Typography variant="h5" component="h3" sx={{ mb: 'var(--spacing-unit)', color: 'var(--primary-royal-blue)', fontWeight: 700 }}>
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'var(--dark-text)' }}>
              To be the leading and most trusted partner in safety, recognized for our excellence,
              integrity, and dedication to creating a world where every worker returns home safely.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--white)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 'calc(var(--spacing-unit) * 2)' }}>
            Certifications & Compliance
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 800, mx: 'auto', mb: 'calc(var(--spacing-unit) * 1.5)' }}>
            Firman Safety is committed to upholding the highest industry standards. Our products and processes are
            rigorously tested and certified to comply with international safety regulations, including various ISO standards.
            We ensure that all our offerings meet and exceed the necessary compliance requirements, providing you with peace of mind.
          </Typography>
          {/* Placeholder for certification logos/images */}
          <Box className="certification-logos">
            <img src="https://images.unsplash.com/photo-1577565342200-a6a3b2b3a6a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ISO Certified" className="certification-logo" />
            <img src="https://images.unsplash.com/photo-1587840176378-0c3b8c3b7b3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="CE Certified" className="certification-logo" />
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--light-gray)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 'calc(var(--spacing-unit) * 2)' }}>
            Client Testimonials
          </Typography>
          <Box className="testimonials-grid">
            <Box className="testimonial-item">
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'var(--medium-gray)', lineHeight: 1.7, mb: 'var(--spacing-unit)' }}>
                "Firman Safety has been our go-to supplier for PPE for years. Their products are consistently high-quality,
                and their commitment to timely delivery is unmatched."
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--primary-royal-blue)', fontSize: '1.1rem' }}>
                - Jane Doe, Construction Manager
              </Typography>
            </Box>
            <Box className="testimonial-item">
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'var(--medium-gray)', lineHeight: 1.7, mb: 'var(--spacing-unit)' }}>
                "We rely on Firman Safety for all our safety equipment needs. Their expertise and wide range of certified products
                ensure our team is always protected. Highly recommended!"
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--primary-royal-blue)', fontSize: '1.1rem' }}>
                - John Smith, Manufacturing Lead
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
