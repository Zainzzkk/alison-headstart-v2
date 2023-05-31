const getTopCourses = async () => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/top-courses', {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success: getTopCourses');
        return data;
      });
  } catch (err) {
    console.error('Error getting top courses from courses-api', { err });
    return 'Error getting top courses from courses-api';
  }
};

module.exports = getTopCourses;
