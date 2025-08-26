import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import '../styles/CertificationsPage.css';

const CertificationsPage = () => {
  return (
    <Box className="certifications-page-container">
      <Box className="certifications-hero-banner">
        <Typography variant="h3" component="h1" className="certifications-hero-title">
          Certifications & Quality
        </Typography>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--white)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 'calc(var(--spacing-unit) * 2)' }}>
            ISO Certifications
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 800, mx: 'auto', mb: 'calc(var(--spacing-unit) * 1.5)' }}>
            Firman Safety is committed to the highest standards of quality and safety.
            Our management systems and product processes are certified by internationally recognized ISO standards,
            demonstrating our dedication to excellence and continuous improvement.
          </Typography>
          <Box className="certification-logos">
            <img src="https://images.unsplash.com/photo-1577565342200-a6a3b2b3a6a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ISO 9001 Certified" className="certification-logo" />
            <img src="https://images.unsplash.com/photo-1587840176378-0c3b8c3b7b3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ISO 14001 Certified" className="certification-logo" />
            <img src="https://images.unsplash.com/photo-1574347713481-ac1c12c4b574?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ISO 45001 Certified" className="certification-logo" />
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ py: 'var(--section-padding-y)', backgroundColor: 'var(--light-gray)' }}>
        <Box sx={{ maxWidth: 'var(--container-max-width)', mx: 'auto', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 'calc(var(--spacing-unit) * 2)' }}>
            Material Testing Reports
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 800, mx: 'auto', mb: 'calc(var(--spacing-unit) * 1.5)' }}>
            All our products undergo rigorous material testing to ensure their durability, performance, and compliance
            with safety regulations. We provide detailed testing reports to ensure full transparency and trust in our products.
          </Typography>
          <List sx={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-unit)', maxWidth: 700, mx: 'auto', mt: 'calc(var(--spacing-unit) * 2)' }}>
            <ListItem sx={{ backgroundColor: 'var(--white)', border: '1px solid var(--light-gray)', borderRadius: '8px', padding: 'calc(var(--spacing-unit) * 1.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } }}>
              <ListItemText
                primary={<Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--primary-royal-blue)', fontSize: '1.1rem' }}>Material Test Report - Safety Helmet (PDF)</Typography>}
                secondary={<Typography variant="body2" sx={{ color: 'var(--medium-gray)', fontSize: '0.9rem' }}>Download document for detailed material specifications.</Typography>}
              />
              <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, padding: '0.7rem 1.5rem', borderRadius: '5px', letterSpacing: '0.5px', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e6b800' } }}>
                <CloudDownloadIcon sx={{ mr: 1 }} /> Download
              </Button>
            </ListItem>
            <ListItem sx={{ backgroundColor: 'var(--white)', border: '1px solid var(--light-gray)', borderRadius: '8px', padding: 'calc(var(--spacing-unit) * 1.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } }}>
              <ListItemText
                primary={<Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--primary-royal-blue)', fontSize: '1.1rem' }}>Quality Assurance Certificate - Eyewear (PDF)</Typography>}
                secondary={<Typography variant="body2" sx={{ color: 'var(--medium-gray)', fontSize: '0.9rem' }}>Download document for quality assurance details.</Typography>}
              />
              <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, padding: '0.7rem 1.5rem', borderRadius: '5px', letterSpacing: '0.5px', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e6b800' } }}>
                <CloudDownloadIcon sx={{ mr: 1 }} /> Download
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificationsPage;
