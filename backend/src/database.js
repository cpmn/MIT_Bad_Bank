require('dotenv').config();

const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect(process.env.DB_MONGO_URI);
};

module.exports = connectDb;

