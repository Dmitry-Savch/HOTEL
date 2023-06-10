const { Patient } = require("../models/Patient");

const getPatient = async (req, res) => {
  const { _id } = req.params;

  let patient;
  try {
    patient = await Patient.findById(_id);
  } catch (err) {
    return res.status(404).send("Patient not found");
  }

  res.status(200).send(patient);
}

const addPatient = async (req, res) => {
  const { name, species, breed, dateOfBirth, gender, weight } = req.body;

  const patient = new Patient({
    name,
    species,
    breed,
    dateOfBirth,
    gender,
    weight
  });

  const newPatient = await patient.save();

  res.status(201).send(newPatient);
}

const updatePatient = async (req, res) => {
  const { _id } = req.params;
  const { name, species, breed, dateOfBirth, gender, weight } = req.body;

  let updatedPatient;
  try {
    updatedPatient = await Patient.findByIdAndUpdate(
      _id,
      { name, species, breed, dateOfBirth, gender, weight },
      { new: true });
  } catch (err) {
    res.status(404).send("Patient not found");
  }

  res.status(200).send(updatedPatient);
}

module.exports = {
  getPatient,
  addPatient,
  updatePatient
};