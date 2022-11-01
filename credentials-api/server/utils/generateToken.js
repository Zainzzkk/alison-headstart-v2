const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const { addSessionIdentifier } = require('../controllers/addSessionIdentifier');

// generates token and identifier and when it expires and adds to db
const generateToken = async (user) => {
  // reads private key
  const privateKEY = fs.readFileSync('./private.key', 'utf8');
  // generates session identifier
  const sessionIdentifier = crypto.randomBytes(32).toString('hex');
  // how long before token expires in seconds
  const expiresIn = 1000000000;

  // generates body to sign
  const secureBody = {
    id: user.ID,
    iat: Date.now(),
    username: user.USERNAME,
    sessionIdentifier,
  };

  // returns token
  const signedToken = jsonwebtoken.sign(secureBody, privateKEY, { expiresIn, algorithm: 'RS256' });

  // adds identifier to db
  await addSessionIdentifier(secureBody);

  return {
    token: signedToken,
    expires: expiresIn,
    sessionIdentifier,
  };
}

module.exports = generateToken;