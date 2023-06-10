const { Payment } = require("../models/Payment");

const addPayment = async (req, res) => {
  const { amount, currency, description, status } = req.body;

  const payment = new Payment({ amount, currency, description, status });

  const newPayment = await payment.save().catch((error) => {
    res.status(400).send(error);
  });

  res.status(201).send(newPayment);
}

module.exports = { addPayment };