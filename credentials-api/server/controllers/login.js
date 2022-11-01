const sanitizeHtml = require('sanitize-html');

const checkPassword = require('../utils/checkPassword');
const generateToken = require('../utils/generateToken');
const findUser = require('./findUser');

// handles logging in
const loginController = async (requestedUser) => {
  const { username, password } = requestedUser;
  // sanitizes username
  const santizedUser = sanitizeHtml(username);
  // finds user which contains salt and hash
  const user = await findUser(santizedUser);

  // if no user
  if (!user || user.length === 0 || user.error) {
    return {
      error: 'User does not exist',
    };
  };
  // sanitizes password
  const santizedPassword = sanitizeHtml(password);
  // checks password and returns true or false based on if matches
  const passwordCheck = checkPassword(santizedPassword, user.SALT, user.HASH);

  if (!passwordCheck) {
    return {
      error: 'Password is incorrect'
    };
  }

  // creates sessionIdentifier and token and returns object
  const { ...tokenObject } = await generateToken(user);

  return {
    user,
    tokenObject
  }
}

const login = async (req, res) => {
  try {
    const { body: requestedUser } = req;

    const { tokenObject, user, error } = await loginController(requestedUser);

    if (error) {
      return res.status(401).json({ success: false, msg: error, status: 401 });
    }

    // returns cookies with token and username
    res.cookie('token', tokenObject.token, {
      secure: true,
      httpOnly: true
    });
    res.cookie('username', user.USERNAME, {
      secure: true,
      httpOnly: true
    });

    return res.status(200).json({ success: true, status: 200 });
  } catch (error) {
    console.error('Error logging in', { error });
    res.status(500).send({
      message: `Try-catch - login - Error logging in ${{ error }}`,
    });
  }
};

module.exports = { login };