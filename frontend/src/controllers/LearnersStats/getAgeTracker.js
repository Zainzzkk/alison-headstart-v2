const getAgeTracker = async () => {
  try {
    // gets all learners stats data and returns array
    return fetch('/courses-api/learners-stats/get-age-tracker', {
      method: 'GET',
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
    console.error('Error getting age tracker from courses-api', { err });
    return { message: 'Error getting age tracker from courses-api' };
  }
};

export default getAgeTracker;
