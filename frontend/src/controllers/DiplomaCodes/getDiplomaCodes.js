const getDiplomaCodes = async () => {
  try {
    // gets from courses-api as array and returns response
    return fetch('/courses-api/diploma-codes/codes', {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:');
        return data;
      });
  } catch (err) {
    console.error('Error getting diploma codes from courses-api', { err });
    return 'Error getting diploma codes from courses-api';
  }
};

module.exports = getDiplomaCodes;
