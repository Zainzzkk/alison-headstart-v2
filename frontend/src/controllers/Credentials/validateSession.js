const validateSession = async () => {
  try {
    // sends to credentials-api to validate token via cookies
    return fetch('/credentials-api/service/validate-token', {
      method: 'GET', // or 'PUT'
      mode: 'cors',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.status)
      .then((data) => {
        console.log('Success:', data);
        return data;
      });
  } catch (err) {
    console.error('Error validating session', { err });
    return 'Error validating session';
  }
};

module.exports = { validateSession };
