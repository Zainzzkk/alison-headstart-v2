const loginController = async (loginData) => {
  try {
    // sends to credentials-api with login data
    return fetch('/credentials-api/service/login', {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:');
        return {
          status: data.status,
          message: data?.msg,
        };
      });
  } catch (err) {
    console.error('Error logging in', { err });
    return 'Error logging in';
  }
};

module.exports = { loginController };
