const { Router } = require('express');
const paymentsApi = require("../api/payments.api");

const router = Router();

router.post("/payments", paymentsApi.addPayment);

module.exports = router;