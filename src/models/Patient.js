const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
  name: { type: String },
  species: { type: String },
  breed: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female'] },
  weight: { type: Number },
});

const Patient = model('patients', patientSchema, 'patients');

module.exports = { Patient };