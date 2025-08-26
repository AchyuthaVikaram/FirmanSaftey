import Product from '../models/Product.js';
import Industry from '../models/Industry.js';
import BlogPost from '../models/BlogPost.js';

export const searchAll = async (req, res) => {
  try {
    const query = req.query.query ? req.query.query.toLowerCase() : '';

    const productResults = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    }).lean();

    const industryResults = await Industry.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).lean();

    const blogPostResults = await BlogPost.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    }).lean();

    const formattedProductResults = productResults.map(p => ({
      id: p.id,
      title: p.name,
      type: 'Product',
      excerpt: p.description,
      link: `/products/${p.id}`,
    }));

    const formattedIndustryResults = industryResults.map(i => ({
      id: i.id,
      title: i.name,
      type: 'Industry',
      excerpt: i.description,
      link: `/industries/${i.id}`,
    }));

    const formattedBlogPostResults = blogPostResults.map(b => ({
      id: b.id,
      title: b.title,
      type: 'Blog Post',
      excerpt: b.excerpt,
      link: `/blog/${b.id}`,
    }));

    const allResults = [...formattedProductResults, ...formattedIndustryResults, ...formattedBlogPostResults];
    res.status(200).json(allResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
