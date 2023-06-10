const mongoose = require('mongoose');

async function db() {
  try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}

module.exports = db;