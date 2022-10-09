// function to delete a raw course from database
export default async function deleteRawCourse(course) {
  try {
    // sends to courses-api to delete course
    return fetch('/courses-api/course-completion/delete-raw', {
      method: 'DELETE', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(course),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error deleting raw course to courses-api', { err });
    return 'Error deleting raw course to courses-api';
  }
}
