const getFilteredCompletion = async () => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/filtered', {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error getting filtered completion from courses-api', { err });
    return 'Error getting filtered completion from courses-api';
  }
};

module.exports = getFilteredCompletion;
