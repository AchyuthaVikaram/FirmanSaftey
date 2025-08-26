import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Industry from './models/Industry.js';
import BlogPost from './models/BlogPost.js';
import { products, industries, blogPosts } from './data.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/firmansafety';

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    await Industry.deleteMany({});
    await BlogPost.deleteMany({});

    const createdProducts = await Product.insertMany(products);
    const createdIndustries = await Industry.insertMany(industries);
    const createdBlogPosts = await BlogPost.insertMany(blogPosts);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDB();
