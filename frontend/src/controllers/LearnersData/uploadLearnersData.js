// upload private learners data
const uploadLearnersData = async (fileContents) => {
  try {
    // sends to learners-api with uploaded file as array and returns response
    return fetch('/learners-api/learners-data/upload', {
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
    console.error('Error sending upload learners data to learners-api', { err });
    return 'Error sending upload learners data to learners-api';
  }
};

module.exports = { uploadLearnersData };
