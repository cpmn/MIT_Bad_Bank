const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/user');
const token = require('../verifyToken');


//Get all transactions
router.get('/transactions/:account', token.verifyToken, async (req, res) => {    
    const filter = { account: req.params.account} 
    const transactions = await Transaction.find(filter);
    console.log("Transaction: ", transactions);
    res.json(transactions);
  }
  );
  
  router.post('/transaction/transfer', token.verifyToken, async (req, res) => { 
    const { account, toAccount, type, amount, description } = req.body;
    // find the destination user account
    const userDestination = await User.find({ account: toAccount });    
    if (userDestination.length > 0){      
      const transactionTo = new Transaction(
        {
            account: toAccount,
            type: type + ' receiver', 
            amount,
            date: new Date(),
            description,
            balance: (userDestination[0].balance + amount)
        })        
      transactionTo.save().then(async ()=>{
        User.updateOne({email: userDestination[0].email}, { balance: (userDestination[0].balance + amount)})
        .then(async ()=>{
          const user = await User.find({ account: account });
          if (user.length > 0){
            const transactionFrom = new Transaction(
              {
                  account,
                  type: type + " To" ,
                  amount,
                  date: new Date(),
                  description,
                  balance: (user[0].balance - amount)
              })              
            await transactionFrom.save();        
            await User.updateOne({email: user[0].email}, { balance: (user[0].balance - amount) })
            .then((userData)=>{
                res.json(userData);       
            });    
          }else {
            res.json({ status: 1, message: 'Origin user account not found'})
          }  
        });
      });
    }else {
        res.json({ status: 1, message: 'Destination user account not found'})
    }    
  })


// Create a new transaction, it will also update the user balance.
router.post('/transaction', token.verifyToken, async (req, res) => {  
  const { account, type, amount, description } = req.body;
    
    //TODO: validate the enpoint data. account should exist, type should be only deposit or withdraw, 
    // amount should be number.

    //find user by account
  const user = await User.find({ account });
  if (user.length > 0) {        
    const newBalance = ( type === 'Deposit')? (user[0].balance + amount) : (user[0].balance - amount);        
    const transaction = new Transaction(
            {
                account, 
                type, 
                amount,
                date: new Date(),
                description,
                balance: newBalance
            })
    await transaction.save();        
    await User.updateOne({email: user[0].email}, { balance: newBalance }).then((userData)=>{
            res.json(userData);       
    });        
    } else {
        res.json({ status: 1, message: 'User account not found'})
    }    
});

  
module.exports = router
