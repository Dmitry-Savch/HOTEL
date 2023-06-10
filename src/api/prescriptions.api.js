const { Prescription } = require("../models/Prescription");

const getPrescription = async (req, res) => {
  const { _id } = req.params;

  let prescription;
  try {
    prescription = await Prescription.findById(_id);
  } catch (err) {
    res.status(404).send("Prescription not found");
  }

  res.status(200).send(prescription);
}

const addPrescription = async (req, res) => {
  const { patient, medication, dosage, endDate, instructions, status } = req.body;

  const prescription = new Prescription({
    patient,
    medication,
    dosage,
    startDate: new Date(),
    endDate,
    instructions,
    status
  });

  const newPrescription = await prescription.save();

  res.status(201).send(newPrescription);
}

const updatePrescription = async (req, res) => {
  const { _id } = req.params;
  const { patient, medication, dosage, endDate, instructions, status } = req.body;

  let updatedPrescription;
  try {
    updatedPrescription = await Prescription.findByIdAndUpdate(_id,
      {
        patient,
        medication,
        dosage,
        endDate,
        instructions,
        status
      },
      { new: true },);

  } catch (err) {
    res.status(400).send("Prescription not found");
  }


  res.status(200).send(updatedPrescription);
}

module.exports = {
  getPrescription,
  addPrescription,
  updatePrescription
};