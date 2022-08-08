const uploadDiplomaCodes = async (fileContents) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/diploma-codes/upload', {
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
    console.error('Error sending upload diploma codes to courses-api', { err });
    return 'Error sending upload diploma codes to courses-api';
  }
};

module.exports = { uploadDiplomaCodes };
