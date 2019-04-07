const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
  travel: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  date: {
    type: Date,
    require: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Travel = mongoose.model('travel', TravelSchema);

module.exports = Travel;