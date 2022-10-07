// allocates diploma codes (status to YES and todays date)
const allocateDiplomaCode = async (code) => {
  try {
    // sends to courses-api with code body and returns response
    return fetch('/courses-api/diploma-codes/allocate', {
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
    console.error('Error allocating diploma code to courses-api', { err });
    return 'Error allocating diploma codes to courses-api';
  }
};

module.exports = allocateDiplomaCode;
