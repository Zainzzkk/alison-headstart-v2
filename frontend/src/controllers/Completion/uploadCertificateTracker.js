const uploadCertificateTracker = async (fileContents) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-completion/upload-tracker', {
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
    console.error('Error sending upload course tracker to courses-api', { err });
    return 'Error sending upload course tracker to courses-api';
  }
};

const uploadCertificateManualTracker = async (fileContents) => {
  try {
    // sends to courses-api with manual object and returns response
    return fetch('/courses-api/course-completion/upload-tracker/manual', {
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
    console.error('Error sending upload course manual tracker to courses-api', { err });
    return 'Error sending upload course manual tracker to courses-api';
  }
};

module.exports = { uploadCertificateTracker, uploadCertificateManualTracker };
