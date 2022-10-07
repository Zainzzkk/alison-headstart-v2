// upload private learners data for manual upload
const uploadLearnersDataManual = async (learner) => {
  try {
    // sends to learners-api with object and returns response
    return fetch('/learners-api/learners-data/upload-manual', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(learner),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error sending upload manual learners data to learners-api', { err });
    return 'Error sending upload manual learners data to learners-api';
  }
};

module.exports = { uploadLearnersDataManual };
