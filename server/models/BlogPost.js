import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
