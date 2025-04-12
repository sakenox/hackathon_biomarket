const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat_id: { type: Schema.Types.ObjectId, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sent_time: { type: Date, default: Date.now },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);