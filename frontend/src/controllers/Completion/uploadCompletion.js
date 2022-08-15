const uploadCourseCompletion = async (fileContents) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/upload', {
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
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error sending upload course completion to courses-api', { err });
    return 'Error sending upload competion stats to courses-api';
  }
};

const uploadCourseCompletionManual = async (manualCourse) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/upload-manual', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(manualCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error sending manual upload course completion to courses-api', { err });
    return 'Error sending manual upload competion stats to courses-api';
  }
};

module.exports = { uploadCourseCompletion, uploadCourseCompletionManual };
