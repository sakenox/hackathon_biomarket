const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate('farmer', 'name email')
    .lean();
  res.json(products);
});

// @desc    Create product
// @route   POST /api/products
// @access  Farmer
const createProduct = asyncHandler(async (req, res) => {
  const { title, price, unit, category, stock } = req.body;
  
  const product = new Product({
    farmer: req.session.userId,
    title,
    price,
    unit,
    category,
    stock
  });

  await product.save();
  res.status(201).json(product);
});

module.exports = { getProducts, createProduct };