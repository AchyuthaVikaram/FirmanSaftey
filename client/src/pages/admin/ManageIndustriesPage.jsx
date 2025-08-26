import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, TextField, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const ManageIndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/industries`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setIndustries(response.data);
    } catch (err) {
      console.error('Error fetching industries:', err);
      setError(err.response?.data?.message || 'Failed to fetch industries.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (industry = null) => {
    setCurrentIndustry(industry);
    if (industry) {
      setFormData({
        name: industry.name,
        description: industry.description,
        imageUrl: industry.imageUrl,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentIndustry(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (currentIndustry) {
        await axios.put(`${BASE_URL}/api/admin/industries/${currentIndustry._id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      } else {
        await axios.post(`${BASE_URL}/api/admin/industries`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      }
      fetchIndustries();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving industry:', err);
      setError(err.response?.data?.message || 'Failed to save industry.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/api/admin/industries/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      fetchIndustries();
    } catch (err) {
      console.error('Error deleting industry:', err);
      setError(err.response?.data?.message || 'Failed to delete industry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Industries
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()} sx={{ mb: 2 }} disabled={loading}>
        Add New Industry
      </Button>

      {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {industries.map((industry) => (
              <TableRow key={industry._id}>
                <TableCell>{industry.name}</TableCell>
                <TableCell>{industry.description.substring(0, 100)}...</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(industry)} disabled={loading}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(industry._id)} disabled={loading}>
                    <DeleteIcon />
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
        aria-labelledby="industry-modal-title"
        aria-describedby="industry-modal-description"
      >
        <Box sx={style}>
          <Typography id="industry-modal-title" variant="h6" component="h2" gutterBottom>
            {currentIndustry ? 'Edit Industry' : 'Add Industry'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (currentIndustry ? 'Update Industry' : 'Add Industry')}
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

export default ManageIndustriesPage;
