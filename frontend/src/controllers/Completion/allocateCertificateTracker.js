// updates certificated tracker (code and status change)
const allocateCertificateTracker = async (code) => {
  try {
    // sends to courses-api with code for tracker returns response
    return fetch('/courses-api/course-completion/allocate', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(code),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error sending allocated course tracker to courses-api', { err });
    return 'Error sending allocated course tracker to courses-api';
  }
};

module.exports = allocateCertificateTracker;
