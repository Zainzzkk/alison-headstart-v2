const getAllLearners = async () => {
  try {
    // gets all learners stats data and returns array
    return fetch('/courses-api/learners-stats/get-learners', {
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
    console.error('Error getting all learners stats from courses-api', { err });
    return { message: 'Error getting all learners stats from courses-api' };
  }
};

export default getAllLearners;
