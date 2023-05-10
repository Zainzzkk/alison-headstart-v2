const getCertificateCodes = async () => {
  try {
    // gets from courses-api as array and returns response
    return fetch('/courses-api/course-codes/codes', {
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
    console.error('Error getting certificate codes from courses-api', { err });
    return 'Error getting certificate codes from courses-api';
  }
};

module.exports = getCertificateCodes;
