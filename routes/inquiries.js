const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Message = require('../models/Message');
const User = require('../models/User');
const Product = require('../models/Product');

const { authUser, authFarmer } = require('../middleware/auth');

// Get all inquiries for current user (for "Inquiries" tab)
router.get('/my', authUser, async (req, res) => {
    try {
      const isFarmer = req.session.userType === 'farmer';
      const query = isFarmer
        ? { farmer: req.session.userId }
        : { user: req.session.userId };
  
      const inquiries = await Order.find(query)
        .populate('product', 'title')          // Always get product name
        .populate('farmer', 'fullName city')  // Always get farmer info
        .populate('user', 'fullName city')    // Always get user info
        .sort({ createdAt: -1 });
  
      res.json(inquiries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.get('/my-farmers', authUser, async (req, res) => {
    try {
      const isFarmer = req.session.userType === 'farmer';
      const queryField = isFarmer ? 'farmer' : 'user';
      const populateField = isFarmer ? 'user' : 'farmer';
  
      const orders = await Order.find({ [queryField]: req.session.userId })
        .populate(populateField, 'fullName _id');
  
      const uniqueContactsMap = {};
      orders.forEach(order => {
        const contact = order[populateField];
        uniqueContactsMap[contact._id] = contact;
      });
  
      res.json(Object.values(uniqueContactsMap));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
// Create an inquiry
router.post('/', authUser, async (req, res) => {
    const { user, farmer, product, quantity, totalPrice } = req.body;
  
    try {
      const newOrder = new Order({
        user,
        farmer,
        product,
        quantity,
        totalPrice,
        status: 'pending'
      });
  
      await newOrder.save();
  
      // Automatically send a message to the farmer
      const autoMessage = new Message({
        chat_id: newOrder._id,
        sender: user,
        recipient: farmer,
        text: `New inquiry for product. Quantity: ${quantity}, Total Price: ${totalPrice}`
      });
  
      await autoMessage.save();
  
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  
// Update inquiry status
router.patch('/:id', authUser, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const validStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
  
    try {
      const order = await Order.findById(id);
  
      if (!order) return res.status(404).json({ message: 'Inquiry not found' });
  
      // Permissions check
      const isFarmer = req.session.userType === 'farmer';
      const isUser = req.session.userType === 'user';
      const isAdmin = req.session.userType === 'admin';

  
      if (!isAdmin){
        if (isFarmer && order.farmer.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
    
        if (isUser && order.user.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
      }
  
      order.status = status;
      await order.save();
  
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


module.exports = router;