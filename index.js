const express = require("express");
const bodyParser = require('body-parser');
const setupDB = require("./src/Db/db");
require('dotenv').config();

const appointmentsRouter = require('./src/routes/appointments.routes');
const patientsRouter = require("./src/routes/patients.routes");
const prescriptionsRouter = require('./src/routes/prescriptions.routes');
const resultsRouter = require("./src/routes/result.routes");
const paymentsRouter = require("./src/routes/payments.routes");

const app = express();

app.use(bodyParser.json());

app.use(appointmentsRouter);
app.use(patientsRouter);
app.use(prescriptionsRouter);
app.use(resultsRouter);
app.use(paymentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})

setupDB();