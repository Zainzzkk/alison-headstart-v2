const DiplomaCertificates = require('../../models/DiplomaCertificate');

const getDiplomaCodesController = async () => {
  return DiplomaCertificates.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving DiplomaCertificates.', err)
    });
}

// function to get diploma codes from uploaded array to database
const getDiplomaCodes = async (req, res) => {
  try {
    const diplomaCodes = await getDiplomaCodesController();

    res.status(200).send(diplomaCodes);
  } catch (err) {
    console.error('Try-catch - getDiplomaCodes - Error getting diploma codes', { err });
    res.status(500).send({
      message: `Try-catch - getDiplomaCodes - Error getting diploma codes ${{ err }}`,
    });
  }
};

module.exports = { getDiplomaCodes };