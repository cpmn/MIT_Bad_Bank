const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  account:  { type: String, required: true },
  name:     { type: String, required: true },  
  email:    { type: String, required: true },
  password: { type: String  },
  balance:  { type: Number, required: true },
  avatar:  { type: String  },
  Direccion:  { type: String  },
  fechaNac:  { type: String  },
  provider: { type: String, required: true },
  role:     { type: Number, required: true} // 1: Admin user, 0: Normal user
});

const User = mongoose.model('User', userSchema);

module.exports = User;