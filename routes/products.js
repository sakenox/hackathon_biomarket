const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all products
// GET /products?category=fruits&in_stock=true&city=Tirana&sort_by=price&sort_order=asc&search_title=apple
router.get('/', async (req, res) => {
  try {
    const { category, in_stock, city, sort_by, sort_order, search_title } = req.query;

    // Build filters
    const filter = {};

    if (category) filter.category = category;
    if (in_stock === 'true') filter.stock = true;
    else if (in_stock === 'false') filter.stock = false;
    
    // Use regex for flexible text search
    if (search_title) {
      filter.title = { $regex: search_title, $options: 'i' };
    }

    // Build the initial query
    let query = Product.find(filter).populate('farmerId', 'fullName city');
    
    // Perform the query
    let products = await query.exec();

    // Filter by city if specified
    if (city) {
      products = products.filter(product => product.farmerId && product.farmerId.city === city);
    }

    // Handle sorting manually
    if (sort_by) {
      const sortOrder = sort_order === 'desc' ? -1 : 1;

      products = products.sort((a, b) => {
        let aValue;
        let bValue;

        switch (sort_by) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'review_count':
            aValue = a.review_count;
            bValue = b.review_count;
            break;
          case 'total_rating':
            aValue = a.total_rating;
            bValue = b.total_rating;
            break;
          default:
            aValue = bValue = 0;
        }

        return (aValue < bValue ? -1 : 1) * sortOrder;
      });
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Create product (Farmer only)
router.post('/', auth.authUser, async (req, res) => {
  if (req.session.userType !== 'farmer') 
    return res.status(403).json({ error: 'Farmer access required' });

  try {
    if (!req.body.title || !req.body.price) {
        return res.status(400).json({ error: 'Title and price are required' });
    }

    const product = new Product({
      farmerId: req.session.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      unit: req.body.unit,
      stock: req.body.stock || false // Siguro vlerë default
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
        res.status(400).json({ error: 'Product with this title already exists' });
      } else {
        res.status(400).json({ error: err.message });
      }
  }
});

router.get('/my-products', auth.authUser, async (req, res) => {
    try {
      const products = await Product.find({ farmerId: req.session.userId })
        .sort({ createdAt: -1 }); // Newest first
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Edit existing product
router.put('/:id', auth.authUser, async (req, res) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        farmerId: req.session.userId // Ensure only owner can edit
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found or unauthorized' });
      }
  
      // Update fields
      product.title = req.body.title || product.title;
      product.price = req.body.price || product.price;
      product.unit = req.body.unit || product.unit;
      product.stock = typeof req.body.stock !== 'undefined' ? req.body.stock : product.stock;
      product.updatedAt = Date.now();
  
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth.authUser, async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        farmerId: req.session.userId // Ensure only owner can delete
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found or unauthorized' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Get single product (for editing)
router.get('/:id', auth.authUser, async (req, res) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        farmerId: req.session.userId // Ensure only owner can view
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found or unauthorized' });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;