import express from 'express';
import { getAllBlogPosts, getBlogPostById } from '../controllers/blogPostController.js';

const router = express.Router();

router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPostById);

export default router;
