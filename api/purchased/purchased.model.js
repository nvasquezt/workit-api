const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchasedSchema = new Schema({
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: true
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
} , {
  timestamps: true,
  versionKey: false
});

  const PurchasedModel = mongoose.model('PurchasedService', PurchasedSchema);

  module.exports = PurchasedModel;
