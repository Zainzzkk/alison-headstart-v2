const Users = require('../models/Users');

// adds session identifier to db for comparison later for validation
const addSessionIdentifier = async (data) => {
  try {
    // passed as object
    const { username, sessionIdentifier } = data;

    const identifierToAdd = {
      // assigns for adding to db
      SESSION_IDENTIFY: sessionIdentifier
    }

    const response = await Users.update(identifierToAdd, {
      where: {
        USERNAME: username,
      },
    })
      .then(() => {
        return 200;
      })
      .catch(((error) => {
        console.error('Error adding session identifier!', error.original)
        return 500;
      }))

    return response;

  } catch (error) {
    console.error('Error adding session identifier', { error });
    return 500;
  }
};

module.exports = { addSessionIdentifier };