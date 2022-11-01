const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const validateWebTokenController = (token) => {
  // validates against public key
  const KEY = fs.readFileSync('./public.key', 'utf8');

  if (token) {
    return jsonwebtoken.verify(token, KEY, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return 500;
      };

      // if cannot decode then 404
      if (!decoded) {
        return 404;
      }

      const now = new Date().getTime();
      // checks if token has not expired
      const stillValid = decoded.exp > now;;
      if (stillValid) {
        return 200;
      }

      return 404;
    });
  };

  return 404;
}

// validates web token to see if authorised to see page
const validateWebToken = async (req, res) => {
  try {
    // gets token from cookie
    const token = req.cookies.token;

    const response = validateWebTokenController(token);

    res.status(response).send({});
  } catch (error) {
    console.error(`Try-catch validateWebToken -  error validating token`, { error });
    res.status(500).send({});
  }
}

module.exports = { validateWebToken };