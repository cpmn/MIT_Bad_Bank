require('dotenv').config();

const admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.FIRE_BASE_TYPE,
  project_id: process.env.FIRE_BASE_PROJECT_ID,
  private_key_id: process.env.FIRE_BASE_PRIVATE_KEY_ID,
  private_key: process.env.FIRE_BASE_PRIVATE_KEY,
  client_email: process.env.FIRE_BASE_CLIENT_EMAIL,
  client_id: process.env.FIRE_BASE_CLIENT_ID,
  auth_uri: process.env.FIRE_BASE_AUTH_URI,
  token_uri: process.env.FIRE_BASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIRE_BASE_AUTH_PROVIDER_X509,
  client_x509_cert_url: process.env.FIRE_BASE_CLIENT_X509
}

//require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;