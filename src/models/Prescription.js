const { Schema, model, Types } = require('mongoose');

const prescriptionSchema = new Schema({
  patient: { type: Types.ObjectId, ref: 'Patient' },
  medication: { type: String },
  dosage: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  instructions: { type: String },
  status: { type: String, enum: ['active', 'completed', 'cancelled'] }
});

const Prescription = model('prescriptions', prescriptionSchema, 'prescriptions');

module.exports = { Prescription };