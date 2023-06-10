const { Appointment } = require("../models/Appointment");

const getAppointments = async (req, res) => {
  const appointments = {};

  let listAppointments;
  try {
    listAppointments = await Appointment.find(appointments);
  } catch (err) {
    res.status(404).send(err);
  }

  res.status(200).send(listAppointments);
}

const addAppointment = async (req, res) => {
  const { duration, reason, status } = req.body;

  const appointment = new Appointment({ dateTime: new Date().toISOString(), duration, reason, status });

  const newAppointment = await appointment.save();

  res.status(201).send(newAppointment);
}

const updateAppointment = async (req, res) => {
  const { _id } = req.params;
  const { duration, reason, status } = req.body;

  let updatedAppointment;
  try {
    updatedAppointment = await Appointment.findByIdAndUpdate(
      _id,
      { duration, reason, status },
      { new: true });
  } catch (err) {
    res.status(404).send("Appoint not found");
  }

  res.status(200).send(updatedAppointment);
}

const deleteAppointment = async (req, res) => {
  const { _id } = req.params;

  let deletedAppointment;
  try {
    deletedAppointment = await Appointment.findByIdAndDelete(_id);
  } catch (err) {
    res.status(404).send("Appoint not found");
  }

  res.status(200).send(deletedAppointment);
}

module.exports = {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment
};