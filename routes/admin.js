const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware
router.use(authMiddleware.authAdmin);

// User Routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product Routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/stats', async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalFarmers = await User.countDocuments({ type: 'farmer' });
      const totalInquiries = await Order.countDocuments();
  
      const avgInquiriesPerFarmer = totalFarmers > 0
        ? totalInquiries / totalFarmers
        : 0;
  
      // Most inquired farmer
      const mostInquired = await Order.aggregate([
        { $group: { _id: '$farmer', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'farmer'
          }
        },
        { $unwind: "$farmer" }
      ]);
  
      // Highest rated farmer (based on avg product rating)
      const topRated = await Product.aggregate([
        { $match: { review_count: { $gt: 0 } } },
        {
          $group: {
            _id: '$farmerId',
            avgRating: { $avg: '$total_rating' }
          }
        },
        { $sort: { avgRating: -1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'farmer'
          }
        },
        { $unwind: "$farmer" }
      ]);
  
      res.json({
        totalUsers,
        totalProducts,
        totalInquiries,
        avgInquiriesPerFarmer,
        mostInquired: mostInquired[0],
        topRated: topRated[0]
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Stats fetch failed' });
    }
  });

  router.get('/inquiries', async (req, res) => {
    try {
      const inquiries = await Order.find()
        .populate('user', 'fullName email')
        .populate('farmer', 'fullName email')
        .populate('product', 'title')
        .sort({ createdAt: -1 });
  
      res.json(inquiries);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch inquiries' });
    }
  });

module.exports = router;