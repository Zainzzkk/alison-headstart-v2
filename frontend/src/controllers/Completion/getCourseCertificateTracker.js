const getCourseCertificateTracker = async () => {
  try {
    //  gets tracker from courses-api
    return fetch('/courses-api/course-completion/course-certificate-tracker', {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success: getCourseCertificateTracker');
        return data;
      });
  } catch (err) {
    console.error('Error getting course certificate tracker from courses-api', { err });
    return 'Error getting course certificate tracker from courses-api';
  }
};

module.exports = getCourseCertificateTracker;
