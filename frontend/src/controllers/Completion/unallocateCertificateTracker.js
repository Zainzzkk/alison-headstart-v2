// unallocates certificate tracker (code and status change)
const unallocateCertificateTracker = async (code) => {
  try {
    // sends to courses-api to unallocate tracker
    return fetch('/courses-api/course-completion/unallocate', {
      method: 'DELETE', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(code),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:');
        return data;
      });
  } catch (err) {
    console.error('Error sending unallocated course tracker to courses-api', { err });
    return 'Error sending unallocated course tracker to courses-api';
  }
};

module.exports = unallocateCertificateTracker;
