const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  maxPlaces: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pictureLink: {
    type: String,
    default: ''
  },
  placesCount: {
    type: Number,
    required: true
  },
  rating: {
    type: Number
  },
  ratesCount: {
    type: Number
  },
  gallery: [{
    type: String
  }],
  comments: [{
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createDate: {
      type: Date,
      default: Date.now
    }
  }],
  createDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = Trip = mongoose.model('trip', TripSchema);
