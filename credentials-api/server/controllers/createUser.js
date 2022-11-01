const passwordComplexity = require("joi-password-complexity");
const Users = require('../models/Users');
const usernameSchema = require('../utils/userNameSchema');
const complexityOptions = require('../utils/passwordSchema');
const createSaltHash = require('../utils/createSaltHash');
const e = require('express');

// creates user in db
const userToCreateController = async (userToCreate) => {
  const { username, password } = userToCreate;

  // returns secure salt and hash
  const { salt, hash } = createSaltHash(password);
  delete userToCreate.password;

  const user = {
    USERNAME: username,
    SALT: salt,
    HASH: hash,
  };

  const response = await Users.bulkCreate([user])
    .then(() => {
      return {
        status: 200,
        message: 'User created successfully',
      }
    })
    .catch(((error) => {
      console.error('Error creating user!', error.original)
      return {
        status: 500,
        message: `Error creating user! ${error.original}`,
      }
    }))

  return response;
}

const createUser = async (req, res, next) => {
  try {
    const { body: userToCreate } = req;
    const { username, password } = userToCreate;

    // validates passwrd and username
    const { error: usernameError } = usernameSchema.validate(username);
    const { error: passwordError } = passwordComplexity(complexityOptions).validate(password);

    // if any contain error then do not create user
    if (!usernameError && !passwordError) {
      const { status, message } = await userToCreateController(userToCreate);
      res.status(status).send({ message });
    } else {
      // error object
      const errors = {}
      // populates error object with error from either
      usernameError ? errors.username = usernameError.message : null;
      passwordError ? errors.password = passwordError.message : null;
      // sends error
      res.status(500).send({ errors });
    }
  } catch (error) {
    console.error('Error creating user', { error });
    res.status(500).send({
      message: `Try-catch - createUser - Error creating user ${{ error }}`,
    });
  }


};

module.exports = { createUser };