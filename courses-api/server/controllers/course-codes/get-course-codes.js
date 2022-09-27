const CourseCertificates = require('../../models/CourseCertificates');

const getCertificateCodesController = async () => {
  return CourseCertificates.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving DiplomaCertificates.', err)
    });
}

// function to get course codes from database
const getCertificateCodes = async (req, res) => {
  try {
    const diplomaCodes = await getCertificateCodesController();

    res.status(200).send(diplomaCodes);
  } catch (err) {
    console.error('Try-catch - getDiplomaCodes - Error getting diploma codes', { err });
    res.status(500).send({
      message: `Try-catch - getDiplomaCodes - Error getting diploma codes ${{ err }}`,
    });
  }
};

module.exports = { getCertificateCodes };