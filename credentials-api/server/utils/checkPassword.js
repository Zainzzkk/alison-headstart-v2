const crypto = require('crypto');

// returns true or false if password matches
const checkPassword = (password, salt, hash) => {
  // generates hash from entered password and salt
  const hashGenerated = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  // if match then true
  return hash === hashGenerated;
};

module.exports = checkPassword;