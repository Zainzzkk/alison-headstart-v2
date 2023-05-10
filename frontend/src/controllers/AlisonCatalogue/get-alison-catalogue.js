const getAlisonCatalogue = async () => {
  try {
    // gets all alison courses and returns array
    return fetch('/courses-api/alison-catalogue/get-all', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success: getAlisonCatalogue');
        return data;
      });
  } catch (err) {
    console.error('Error getting alison catalogue to courses-api', { err });
    return 'Error getting alison catalogue to courses-api';
  }
};

export default getAlisonCatalogue;
