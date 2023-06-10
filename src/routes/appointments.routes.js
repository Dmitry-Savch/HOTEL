const { Router } = require('express');
const appointmentsApi = require("../api/appointments.api");

const router = Router();

router.get("/appointments", appointmentsApi.getAppointments);
router.post("/appointments", appointmentsApi.addAppointment);
router.patch("/appointments/:_id", appointmentsApi.updateAppointment);
router.delete("/appointments/:_id", appointmentsApi.deleteAppointment);

module.exports = router;