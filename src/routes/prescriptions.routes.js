const { Router } = require('express');
const prescriptionsApi = require("../api/prescriptions.api");

const router = Router();

router.get("/prescriptions/:_id", prescriptionsApi.getPrescription);
router.post("/prescriptions", prescriptionsApi.addPrescription);
router.patch("/prescriptions/:_id", prescriptionsApi.updatePrescription);

module.exports = router;