import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const { featured, category } = req.query;
    let query = {};

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
