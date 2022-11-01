const JwtStrategy = require('passport-jwt').Strategy;
const fs = require('fs');
const Users = require('./models/Users');

const KEY = fs.readFileSync('./signing-private.key', 'utf8');

// extracts cookie from cookie
const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }

  return token;
};

// options for jwtStrategy and processing jwt
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: KEY,
  algorithms: ['RS256'],
};

// makes object for db call for user
const userToReturn = (user) => ({
  username: user.USERNAME,
  _id: user.ID,
});

module.exports = (passport) => {
  try {
    console.log('hereee');
    passport.use(new JwtStrategy(options, ((jwtPayload, done) => {
      console.log(jwtPayload);
      // finds user
      Users.findAll({
        raw: true,
        where: {
          USERNAME: jwtPayload.username,
        },
      }).then((user) => {
        console.log(user);
        // if user exists
        if (user) {
          //jwt identifier
          const jwtSession = jwtPayload.sessionIdentifier;
          // user identifier from db
          const userSession = user[0].SESSION_IDENTIFY;
          // if match
          if (jwtSession === userSession) {
            return done(null, userToReturn(user));
          }
        }
        return done(null, false);
      });
    })));
  } catch (error) {
    console.error('Error validating passport', { error });
    return done(null, false);
  }
};

