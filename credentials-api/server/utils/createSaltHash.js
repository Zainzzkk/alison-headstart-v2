const crypto = require('crypto');

// creates salt and hash so makes secure and harder to guess
const createSaltHash = (password) => {
  // creates salt
  const salt = crypto.randomBytes(32).toString('hex');
  // creates hash
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash,
  };
};

module.exports = createSaltHash;