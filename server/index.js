import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import industryRoutes from './routes/industryRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://achyuthavikaram:123Amma@cluster0.421djas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/requests', requestRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Basic Route (can be removed if not needed)
app.get('/', (req, res) => {
  res.send('Firman Safety Backend API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
