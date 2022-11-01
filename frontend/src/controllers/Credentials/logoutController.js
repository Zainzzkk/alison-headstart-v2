const logoutController = async () => {
  try {
    // sends to credentials-api to set cookies to blank
    return fetch('/credentials-api/service/logout', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        return {
          status: data.status,
        };
      });
  } catch (err) {
    console.error('Error logging out', { err });
    return 'Error logging out';
  }
};

module.exports = { logoutController };
