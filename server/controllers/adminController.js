import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Industry from '../models/Industry.js';
import Request from '../models/Request.js';

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

// @desc    Update a user (Admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete a user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Create a new product (Admin only)
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, category, price, brand, countInStock } = req.body;

  const product = new Product({
    name: name || 'Sample Name',
    description: description || 'Sample description',
    imageUrl: imageUrl || 'https://via.placeholder.com/150',
    category: category || 'Sample Category',
    price: price || 0,
    brand: brand || 'Sample Brand',
    countInStock: countInStock || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Get all products (Admin only)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Get product by ID (Admin only)
// @route   GET /api/admin/products/:id
// @access  Private/Admin
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product (Admin only)
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, category, price, brand, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;
    product.category = category || product.category;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product (Admin only)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a new industry (Admin only)
// @route   POST /api/admin/industries
// @access  Private/Admin
const createIndustry = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const industry = new Industry({
    name: name || 'Sample Industry Name',
    description: description || 'Sample Industry description',
    imageUrl: imageUrl || 'https://via.placeholder.com/150',
  });

  const createdIndustry = await industry.save();
  res.status(201).json(createdIndustry);
});

// @desc    Get all industries (Admin only)
// @route   GET /api/admin/industries
// @access  Private/Admin
const getIndustries = asyncHandler(async (req, res) => {
  const industries = await Industry.find({});
  res.status(200).json(industries);
});

// @desc    Get industry by ID (Admin only)
// @route   GET /api/admin/industries/:id
// @access  Private/Admin
const getIndustryById = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);

  if (industry) {
    res.status(200).json(industry);
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});

// @desc    Update an industry (Admin only)
// @route   PUT /api/admin/industries/:id
// @access  Private/Admin
const updateIndustry = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const industry = await Industry.findById(req.params.id);

  if (industry) {
    industry.name = name || industry.name;
    industry.description = description || industry.description;
    industry.imageUrl = imageUrl || industry.imageUrl;

    const updatedIndustry = await industry.save();
    res.status(200).json(updatedIndustry);
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});

// @desc    Delete an industry (Admin only)
// @route   DELETE /api/admin/industries/:id
// @access  Private/Admin
const deleteIndustry = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);

  if (industry) {
    await Industry.deleteOne({ _id: industry._id });
    res.status(200).json({ message: 'Industry removed' });
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});

// @desc    Get all requests (Admin only)
// @route   GET /api/admin/requests
// @access  Private/Admin
const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({}).populate('user', 'name email').populate('products.product', 'name price');
  res.status(200).json(requests);
});

// @desc    Get request by ID (Admin only)
// @route   GET /api/admin/requests/:id
// @access  Private/Admin
const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate('user', 'name email')
    .populate('products.product', 'name price');

  if (request) {
    res.status(200).json(request);
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

// @desc    Update request status (Admin only)
// @route   PUT /api/admin/requests/:id/status
// @access  Private/Admin
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id);

  if (request) {
    request.status = status;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

export { 
  getAllUsers,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  updateUser, // Exporting new function
  deleteUser, // Exporting new function
};
