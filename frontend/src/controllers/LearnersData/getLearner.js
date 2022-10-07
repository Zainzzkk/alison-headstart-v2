// gets learner by id
const getLearner = async (learnerId) => {
  try {
    // sends to learners-api with with id as params and returns learner object
    return fetch(`/learners-api/learners-data/learner/${learnerId}`, {
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
    console.error('Error getting learner from learners-api', { err });
    return 'Error getting learner from learners-api';
  }
};

module.exports = getLearner;
