const getJKTracker = async () => {
  try {
    // gets all learners stats data and returns array
    return fetch('/courses-api/learners-stats/get-jk-tracker', {
      method: 'GET',
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
    console.error('Error getting JK tracker from courses-api', { err });
    return { message: 'Error getting JK tracker from courses-api' };
  }
};

export default getJKTracker;
