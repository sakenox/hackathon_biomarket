const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  farmerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: {type: String},
  category: { type: String, enum: ['fruits', 'vegetables', 'grains', 'dairy', 'meat', 'other'], required: true, default: 'other' },
  price: { type: Number, required: true },
  stock: { type: Boolean, default: true },
  unit: {type: String, enum: ['kg', 'piece'], default: 'kg', required: true},
  review_count: { type: Number, default: 0 },
  total_rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);