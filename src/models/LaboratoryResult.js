const { Schema, model, Types } = require('mongoose');

const laboratoryResultSchema = new Schema({
  patient: { type: Types.ObjectId, ref: 'Patient' },
  testName: { type: String },
  date: { type: Date },
  result: { type: String }
});

const LaboratoryResult = model('laboratory_results', laboratoryResultSchema, 'laboratory_results');

module.exports = { LaboratoryResult };