const CourseCertificates = require('../../models/CourseCertificates');

const getCertificateCodesController = async () => {
  return CourseCertificates.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Certificate Codes.', err)
    });
}

// returns unused certificate codes where status used is no
const getUnusedCertificateCodesController = async () => {
  return CourseCertificates.findAll({
    raw: true,
    where: {
      Used: 'NO',
    },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving unused Certificate Codes.', err)
    });
}

// function to get course codes from database
const getUnusedCertificateCodes = async (req, res) => {
  try {
    const certificateCodes = await getUnusedCertificateCodesController();

    res.status(200).send(certificateCodes);
  } catch (err) {
    console.error('Try-catch - getUnusedCertificateCodes - Error getting unused certificate codes', { err });
    res.status(500).send({
      message: `Try-catch - getUnusedCertificateCodes - Error getting unused certificate codes ${{ err }}`,
    });
  }
};

// function to get course codes from database
const getCertificateCodes = async (req, res) => {
  try {
    const certificateCodes = await getCertificateCodesController();

    res.status(200).send(certificateCodes);
  } catch (err) {
    console.error('Try-catch - getCertificateCodes - Error getting certificate codes', { err });
    res.status(500).send({
      message: `Try-catch - getCertificateCodes - Error getting certificate codes ${{ err }}`,
    });
  }
};

module.exports = { getCertificateCodes, getUnusedCertificateCodes };