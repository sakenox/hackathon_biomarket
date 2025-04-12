const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albanianCities = [
    "Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan",
    "Korçë", "Fier", "Berat", "Lushnjë", "Pogradec"
  ];

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['user', 'farmer', 'admin'], default: 'user' },
  phone: {type: String},
  fullName: {type: String, required: true},
  city: {
    type: String,
    enum: albanianCities,
    required: function() { return this.type === 'farmer'; }
  }

});

userSchema.index({ location: '2dsphere' }); // Geospatial index
module.exports = mongoose.model('User', userSchema);