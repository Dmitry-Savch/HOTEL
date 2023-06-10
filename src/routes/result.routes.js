const { Router } = require('express');
const resultsApi = require("../api/laboratoryResults.api");

const router = Router();

router.get("/results/:_id", resultsApi.getResult);
router.post("/results", resultsApi.addResult);

module.exports = router;