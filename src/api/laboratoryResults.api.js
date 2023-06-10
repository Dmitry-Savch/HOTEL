const { LaboratoryResult } = require("../models/LaboratoryResult");

const getResult = async (req, res) => {
  const { _id } = req.params;

  let result;
  try {
    result = await LaboratoryResult.findById(_id);
  } catch (err) {
    return res.status(404).send("Laboratory result not found");
  }

  res.status(200).send(result);
}

const addResult = async (req, res) => {
  const { patient, testName, result } = req.body;

  const laboratoryResult = new LaboratoryResult({ patient, testName, date: new Date(), result });

  const newResult = await laboratoryResult.save();

  res.status(201).send(newResult);
}

module.exports = {
  getResult,
  addResult
}