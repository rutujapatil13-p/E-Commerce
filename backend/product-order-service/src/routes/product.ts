import express from 'express';
import Product from '../models/product';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, color, size, stock_quantity } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      color,
      size,
      stock_quantity,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;