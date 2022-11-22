require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./src/database');
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require('./src/SwaggerDocs/badBankAPI.json')


const port = process.env.API_PORT || 5000;

// Used to serve static files from public directory
app.use(express.static('public'));
app.use(cors(
  {
    origin: process.env.ALLOWED_ORIGINS
  }
));

// Morgan will show all API petition in the server
app.use(morgan('dev'));
app.use(express.json());

app.use(require('./src/routes/users'))
app.use(require('./src/routes/transactions'))


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// start server
// -----------------------
app.listen(port, function () {
  console.log(`Running on port 5000! - ${process.env.ALLOWED_ORIGINS}:5000`);
  connectDb().then(() => console.log('MongoDb connected'));
});