const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchasedSchema = new Schema({
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
  paymentId: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  merchantOrderId: {
    type: String,
    required: true
  },
} , {
  timestamps: true,
  versionKey: false
});

  const PurchasedModel = mongoose.model('PurchasedService', PurchasedSchema);

  module.exports = PurchasedModel;
