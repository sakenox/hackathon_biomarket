const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authUser } = require('../middleware/auth');

// Send a message
router.post('/', authUser, async (req, res) => {
  const { chat_id, sender, recipient, text } = req.body;

  try {
    const message = new Message({ chat_id, sender, recipient, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for a chat
router.get('/:chatId', authUser, async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat_id: chatId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;