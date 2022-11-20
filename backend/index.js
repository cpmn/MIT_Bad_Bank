require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./src/database');

const port = process.env.API_PORT || 5000;

// Used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// Morgan will show all API petition in the server
app.use(morgan('dev'));
app.use(express.json());

app.use(require('./src/routes/users'))
app.use(require('./src/routes/transactions'))


// start server
// -----------------------
app.listen(port, function () {
  console.log('Running on port 5000! - http://localhost:5000');
  connectDb().then(() => console.log('MongoDb connected'));
});