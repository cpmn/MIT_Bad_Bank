const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account:      { type: String, required: true },
  date:         { type: Date, required: true },  
  type:         {type: String, required: true},
  amount:      { type: Number, required: true },
  description:  {type: String, required: true},  
  balance:      { type: Number, required: true }  
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;