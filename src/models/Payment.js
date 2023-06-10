const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  amount: { type: Number },
  currency: { type: String },
  description: { type: String },
  status: { type: String, enum: ['completed', 'pending', 'failed'] },
});

const Payment = model('payments', paymentSchema, 'payments');

module.exports = { Payment };