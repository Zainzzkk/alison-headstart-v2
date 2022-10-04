// unallocates diploma codes (status to NO and removes date)
const unallocateDiplomaCode = async (code) => {
  try {
    // sends to courses-api with row info and unallocates
    return fetch('/courses-api/diploma-codes/unallocate', {
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
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error unallocating diploma code to courses-api', { err });
    return 'Error unallocating diploma codes to courses-api';
  }
};

module.exports = unallocateDiplomaCode;
