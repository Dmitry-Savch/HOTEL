const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  dateTime: { type: Date },
  duration: { type: Number },
  reason: { type: String },
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'] }
});

const Appointment = model('appointments', appointmentSchema, 'appointments');

module.exports = { Appointment };