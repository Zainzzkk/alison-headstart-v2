const uploadAlisonCatalogue = async (fileContents) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/alison-catalogue/upload', {
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
        console.log('Success: uploadAlisonCatalogue');
        return data;
      });
  } catch (err) {
    console.error('Error sending upload alison catalogue to courses-api', { err });
    return 'Error sending upload alison ccatalogue to courses-api';
  }
};

module.exports = { uploadAlisonCatalogue };
