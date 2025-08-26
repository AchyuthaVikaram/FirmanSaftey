import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/SearchPage.css';
import { BASE_URL } from '../lib/constants';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/api/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchResults(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch search results.');
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Box sx={{ p: 3, mx: 'auto', maxWidth: 'var(--container-max-width)' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Search Results for "{searchQuery}"
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!loading && !error && searchResults.length === 0 && searchQuery && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>No results found for "{searchQuery}".</Typography>
      )}

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(300px, 1fr))' },
        gap: 'calc(var(--spacing-unit) * 1.5)',
        mt: 'calc(var(--spacing-unit) * 2)',
      }}>
        {searchResults.map((result) => (
          <Box key={result._id} sx={{
            backgroundColor: 'var(--white)',
            p: 'calc(var(--spacing-unit) * 1.5)',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.12)' },
          }}>
            <Typography variant="h6" component="h2" sx={{ mb: 0.5, lineHeight: 1.3 }}>
              <Link to={result.link} style={{ textDecoration: 'none', color: 'var(--primary-royal-blue)' }}>
                {result.title}
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'var(--medium-gray)', mb: 'var(--spacing-unit)' }}>
              ({result.type})
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, flexGrow: 1 }}>
              {result.excerpt}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
