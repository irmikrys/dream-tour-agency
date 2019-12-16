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
  ratings: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }],
  gallery: [{
    type: String,
  }],
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
  reservations: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }],
  createDate: {
    type: Date,
    default: Date.now
  },
}, {
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

module.exports = Trip = mongoose.model('trip', TripSchema);
