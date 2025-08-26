import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../lib/constants';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const { logout } = useAuth();
  const { error, success } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          error('You are not logged in. Please log in to view your profile.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        error(err.response?.data?.message || 'Failed to fetch profile. Please log in again.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [error, navigate]);

  useEffect(() => {
    if (user) {
      const fetchMyRequests = async () => {
        try {
          setRequestsLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${BASE_URL}/api/users/myrequests`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRequests(response.data);
          setRequestsLoading(false);
        } catch (err) {
          console.error('Error fetching user requests:', err);
          error(err.response?.data?.message || 'Failed to fetch your requests.');
          setRequestsLoading(false);
        }
      };
      fetchMyRequests();
    }
  }, [user, error]);

  const handleLogout = () => {
    logout();
    success('Logged out successfully!');
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 'var(--container-max-width)', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleLogout}
          sx={{ textTransform: 'none' }}
        >
          Logout
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          Your Profile
        </Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Requests
      </Typography>

      {requestsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
          <Typography variant="body1" color="textSecondary">
            You haven't made any requests yet.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--primary-royal-blue)' }}>
                <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Request ID</TableCell>
                <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Products</TableCell>
                <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id} sx={{ '&:hover': { backgroundColor: 'var(--light-gray)' } }}>
                  <TableCell>{request._id}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 'medium',
                        backgroundColor: 
                          request.status === 'Approved' ? 'rgba(76, 175, 80, 0.1)' :
                          request.status === 'Rejected' ? 'rgba(244, 67, 54, 0.1)' :
                          request.status === 'Delivered' ? 'rgba(33, 150, 243, 0.1)' :
                          'rgba(255, 193, 7, 0.1)',
                        color: 
                          request.status === 'Approved' ? '#2e7d32' :
                          request.status === 'Rejected' ? '#d32f2f' :
                          request.status === 'Delivered' ? '#1976d2' :
                          '#f57c00'
                      }}
                    >
                      {request.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {request.products?.length || 0} items
                  </TableCell>
                  <TableCell>
                    {request.message ? (
                      <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {request.message}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No message
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProfilePage;
