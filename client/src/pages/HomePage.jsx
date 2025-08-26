import React from 'react';
import { Link } from 'react-router-dom';
import ProductCategories from '../components/ProductCategories';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import CtaSection from '../components/CtaSection';
import { Box, Typography, Button } from '@mui/material';

const HomePage = () => {
  return (
    <Box component="main" sx={{ minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box component="section" sx={{
        position: 'relative',
        height: '80vh',
        minHeight: 600,
        backgroundImage: 'linear-gradient(rgba(10, 61, 98, 0.7), rgba(10, 61, 98, 0.7)), url("https://images.unsplash.com/photo-1582234035130-10a402d2427a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <Box sx={{
          maxWidth: 'var(--container-max-width)',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          zIndex: 2
        }}>
          <Typography variant="h2" component="h1" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Your Safety, Our Priority
          </Typography>
          <Typography variant="h5" component="p" sx={{
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            mb: 4,
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            maxWidth: 800,
            mx: 'auto'
          }}>
            Providing reliable fire safety solutions for a safer tomorrow. Trust Firman Safety for all your fire protection needs.
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button 
              variant="contained" 
              component={Link} 
              to="/get-a-quote" 
              sx={{
                backgroundColor: 'var(--secondary-safety-yellow)',
                color: 'var(--dark-text)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#E6B000',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get a Quote
            </Button>
            <Button 
              variant="outlined" 
              component={Link} 
              to="/contact-us" 
              sx={{
                borderColor: 'var(--white)',
                color: 'var(--white)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'var(--white)',
                  color: 'var(--primary-royal-blue)',
                  borderColor: 'var(--white)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Product Categories */}
      <Box sx={{ py: 6,px:4, backgroundColor: 'var(--white)' }}>
        <ProductCategories />
      </Box>

      {/* About Firman Safety */}
      <Box sx={{ py: 6 ,textAlign:"center", backgroundColor: 'var(--light-gray)' }}>
        <AboutSection />
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 6, backgroundColor: 'var(--white)' }}>
        <WhyChooseUs />
      </Box>

      {/* Featured Products */}
      <Box sx={{ py: 6, backgroundColor: 'var(--light-gray)' }}>
        <FeaturedProducts />
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 6, backgroundColor: 'var(--primary-royal-blue)' }}>
        <CtaSection />
      </Box>
    </Box>
  );
};

export default HomePage;
