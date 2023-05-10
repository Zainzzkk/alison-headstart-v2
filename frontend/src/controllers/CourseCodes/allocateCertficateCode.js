// allocates certificate code to DB (changes to yes and adds todays date)
const allocateCertificateCode = async (code) => {
  try {
    // sends to courses-api with uploaded file as array and returns response
    return fetch('/courses-api/course-codes/allocate', {
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
        console.log('Success:');
        return data;
      });
  } catch (err) {
    console.error('Error allocating certificate code to courses-api', { err });
    return 'Error allocating certificate codes to courses-api';
  }
};

module.exports = allocateCertificateCode;
