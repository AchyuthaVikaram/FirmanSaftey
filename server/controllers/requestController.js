import Request from '../models/Request.js';
import asyncHandler from 'express-async-handler';

// @desc    Submit a new request
// @route   POST /api/requests
// @access  Public (or Private if user is logged in)
const submitRequest = asyncHandler(async (req, res) => {
  const { name, email, phone, company, message, products } = req.body;

  // If user is logged in, attach user ID
  const user = req.user ? req.user._id : null; // req.user will be available if protect middleware is used

  const newRequest = new Request({
    user,
    name,
    email,
    phone,
    company,
    message,
    products, // Array of { product: productId, quantity: number }
    status: 'Initiated', // Default status
  });

  const createdRequest = await newRequest.save();
  res.status(201).json({ message: 'Request submitted successfully!', request: createdRequest });
});

export { submitRequest };
