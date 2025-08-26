import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, TextField, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useToast } from '../../context/ToastContext';
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

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/products`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      error(err.response?.data?.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        price: product.price,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        category: '',
        price: '',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: '',
      price: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentProduct) {
        await axios.put(`${BASE_URL}/api/admin/products/${currentProduct._id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        success('Product updated successfully!');
      } else {
        await axios.post(`${BASE_URL}/api/admin/products`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        success('Product created successfully!');
      }
      fetchProducts();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving product:', err);
      error(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${BASE_URL}/api/admin/products/${productId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        success('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        error(err.response?.data?.message || 'Failed to delete product.');
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Manage Products</Typography>
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'var(--primary-royal-blue)' }}>
              <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'var(--white)', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} sx={{ '&:hover': { backgroundColor: 'var(--light-gray)' } }}>
                <TableCell>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }} 
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price?.toFixed(2) || '0.00'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            {currentProduct ? 'Edit Product' : 'Add New Product'}
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
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : (currentProduct ? 'Update' : 'Create')}
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageProductsPage;
