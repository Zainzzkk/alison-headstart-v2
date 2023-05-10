// returns array with completed courses from DB
const checkForCompletion = async () => {
  try {
    //  checks for completion from courses-api
    return fetch('/courses-api/course-completion/check-for-completion', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success checkForCompletion');
        return data;
      });
  } catch (err) {
    console.error('Error checking for completion from courses-api', { err });
    return 'Error checking fro completion from courses-api';
  }
};

module.exports = checkForCompletion;
