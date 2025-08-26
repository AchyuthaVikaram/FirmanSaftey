import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { BASE_URL } from '../../lib/constants';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManageRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/requests`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setRequests(response.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError(err.response?.data?.message || 'Failed to fetch requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (request) => {
    setCurrentRequest(request);
    setSelectedStatus(request.status);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentRequest(null);
    setSelectedStatus('');
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${BASE_URL}/api/admin/requests/${currentRequest._id}/status`, { status: selectedStatus }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      fetchRequests();
      handleCloseModal();
    } catch (err) {
      console.error('Error updating request status:', err);
      setError(err.response?.data?.message || 'Failed to update request status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Requests
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request._id}</TableCell>
                <TableCell>{request.user ? request.user.name : 'N/A'}</TableCell>
                <TableCell>
                  <Box>
                    {request.products.map((item) => (
                      <Typography key={item.product._id} variant="body2">{item.product.name} (Qty: {item.quantity})</Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(request)} disabled={loading}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="request-modal-title"
        aria-describedby="request-modal-description"
      >
        <Box sx={style}>
          <Typography id="request-modal-title" variant="h6" component="h2" gutterBottom>
            Update Request Status
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
                disabled={loading}
              >
                <MenuItem value="Initiated">Initiated</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Status'}
            </Button>
            <Button type="button" variant="outlined" sx={{ mt: 2, ml: 1 }} onClick={handleCloseModal} disabled={loading}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageRequestsPage;
