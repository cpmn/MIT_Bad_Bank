const admin = require('../firebase-config')

function verifyToken( req, res, next ) {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        next()
      })
  } catch (error) { 
    res.send('Authentication Fail! : ' + error)
  }
}



exports.verifyToken = verifyToken