// unallocates certificate code to DB (changes to no and removes date)
const unallocateCertificateCode = async (code) => {
  try {
    // sends to courses-api with row info and unallocates
    return fetch('/courses-api/course-codes/unallocate', {
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
    console.error('Error unallocating certificate code to courses-api', { err });
    return 'Error unallocating certificate codes to courses-api';
  }
};

module.exports = unallocateCertificateCode;
