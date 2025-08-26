import React from 'react';
import '../styles/Footer.css';
import { Box, Typography, Link, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'var(--dark-text)', color: 'var(--white)', py: 3, mt: 'auto' }}>
      <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          &copy; {new Date().getFullYear()} Firman Safety. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Terms of Service
          </Link>
          <IconButton color="inherit" href="https://wa.me/1234567890" target="_blank" rel="noopener" sx={{ color: 'var(--white)', '&:hover': { color: 'var(--secondary-safety-yellow)' } }}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton color="inherit" href="mailto:info@firmansafety.com" sx={{ color: 'var(--white)', '&:hover': { color: 'var(--secondary-safety-yellow)' } }}>
            <EmailIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
