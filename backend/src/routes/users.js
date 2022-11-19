
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const token = require('../verifyToken')


router.get('/', (req, res) => {   
    res.json({status:'API is up to use!'});
}
);


//Get all user
router.get('/users',  async (req, res) => {     
  const users = await User.find();
  console.log("USERS: ", users);
  res.json(users);
}
);

//get user details
router.get('/user/:email', token.verifyToken, async (req, res) => {       
  const email = req.params.email;
  console.log(email);
  const user = await User.find({ email });
  if (user.length > 0) {
    res.json(user[0]);    
  } else {
    res.json({ status: 1, message: 'User not found'})
  }
}
);

//Add a new user
router.post('/user', async (req, res) => {  
  const { name, email, password, provider, role } = req.body;
  const user = await User.find({email});
  if (!user.length > 0) {
    const account = (Math.floor(100000000 + Math.random() * 999000000)).toString().match(/\d{3}(?=\d{2,3})|\d+/g).join("-");
    if (provider =='google'){      
      const user = new User({account, name, email, balance: 0, provider, role, });
      await user.save(); 
      res.json({ status: 0, message: 'User has been created successfully'})
    }else {
      const user = new User({account, name, email, password, balance: 0, provider, role, });
      await user.save(); 
      res.json({ status: 0, message: 'User has been created successfully'})
    }
    
  } else {
    res.json({ status: 1, message: 'User already exist'})
  }  
}
);

// Modify Name and Balance of a user
router.put('/user/:email', token.verifyToken, async (req, res) => {   
  const email = req.params.email; 
  const  { name, balance } = req.body;
  const userUpdated = { name, balance };
  await User.findOneAndUpdate({email}, userUpdated)
  res.json({status: 0, message: 'User has been modified successfully'});
});


//delete User
router.delete('/user/:id', token.verifyToken, async (req, res) => {    
  await User.findOneAndRemove(req.params.id);  
  res.json({status: "USER deleted!"});
}
);


module.exports = router