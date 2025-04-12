// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authUser } = require('../middleware/auth');

router.post('/', authUser, async (req, res) => {
    const { orderId, rating } = req.body;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      if (order.user.toString() !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      if (!['accepted', 'completed'].includes(order.status)) {
        return res.status(400).json({ message: 'Only completed/accepted inquiries can be reviewed' });
      }
  
      if (order.isReviewed) {
        return res.status(400).json({ message: 'Already reviewed' });
      }
  
      const review = new Review({
        order: order._id,
        product: order.product,
        user: order.user,
        rating
      });
  
      await review.save();
      order.isReviewed = true;
      await order.save();
  
      // Update Product's review average
      const product = await Product.findById(order.product);
      if (!product) return res.status(404).json({ message: 'Associated product not found' });
  
      const oldTotal = product.total_rating * product.review_count;
      const newReviewCount = product.review_count + 1;
      const newAvg = (oldTotal + rating) / newReviewCount;
  
      product.review_count = newReviewCount;
      product.total_rating = newAvg;
  
      await product.save();
  
      res.status(201).json({ message: 'Review submitted and product rating updated.', review });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;