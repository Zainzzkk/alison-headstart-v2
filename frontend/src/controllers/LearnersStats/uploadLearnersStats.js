const uploadLearnersStats = async (fileContents) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/learners-stats/upload', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(fileContents),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:');
        return data;
      });
  } catch (err) {
    console.error('Error sending upload learners stats to courses-api', { err });
    return 'Error sending upload learners stats to courses-api';
  }
};

module.exports = { uploadLearnersStats };
