const getRawCompletion = async () => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/raw', {
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
    console.error('Error getting raw completion from courses-api', { err });
    return 'Error getting raw completion from courses-api';
  }
};

module.exports = getRawCompletion;
