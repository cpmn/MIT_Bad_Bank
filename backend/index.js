const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./src/database');


// Used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// Morgan will show all API petition in the server
app.use(morgan('dev'));
app.use(express.json());

app.use(require('./src/routes/users'))
app.use(require('./src/routes/transactions'))

//console.log(path.join(__dirname+'/public/index.html'));

// start server
// -----------------------
app.listen(5000, function () {
  console.log('Running on port 5000! - http://localhost:5000');
  connectDb().then(() => console.log('MongoDb connected'));
});