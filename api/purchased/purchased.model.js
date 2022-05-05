const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchasedSchema = new Schema({
  paymentId: {
    type: String,
    required: false,
    unique: true
  },
  status: {
    type: String,
    required: false
  },
  paymentType: {
    type: String,
    required: false
  },
  sellerId: {
    type: String,
    ref: 'User',
    required: true
  },
  buyerId: {
    type: String,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: String,
    ref: 'Service',
    required: true
  },
  chat: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  scheduledDate: {
    type: Date,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
} , {
  timestamps: true,
  versionKey: false
});

  const PurchasedModel = mongoose.model('PurchasedService', PurchasedSchema);

  module.exports = PurchasedModel;
