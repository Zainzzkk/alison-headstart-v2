const Users = require('../models/Users');

// finds user from db
const findUser = async (username) => {
  const response = await Users.findAll({
    raw: true,
    where: {
      USERNAME: username,
    },
  })
    .then((data) => {
      if (data.length > 0) {
        return data[0];
      }

      return {
        error: 'Error getting username'
      }
    })
    .catch((err) => {
      console.error('Some error occurred while user.', err.original);
      return {
        error: `Error getting learner ${err.original}`,
      }
    });

  return response;
}

module.exports = findUser;