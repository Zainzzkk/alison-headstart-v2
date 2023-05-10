// function to delete a filtered course from database
export default async function deleteFilteredCourse(course) {
  try {
    // sends to courses-api to delete course
    return fetch('/courses-api/course-completion/delete-filtered', {
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
        console.log('Success: deleteFilteredCourse');
        return data;
      });
  } catch (err) {
    console.error('Error deleting filtered course to courses-api', { err });
    return 'Error deleting filtered course to courses-api';
  }
}
