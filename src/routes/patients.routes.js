const { Router } = require('express');
const patientsApi = require("../api/patients.api");

const router = Router();

router.get("/patients/:_id", patientsApi.getPatient);
router.post("/patients", patientsApi.addPatient);
router.patch("/patients/:_id", patientsApi.updatePatient);

module.exports = router;