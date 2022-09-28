const excelDateToISODateString = (excelDateNumber) => {
  if (excelDateNumber === null || excelDateNumber === undefined) {
    return null;
  }
  return new Date(Math.round((excelDateNumber - 25569) * 86400 * 1000)).toISOString().substring(0, 10);
};

module.exports = excelDateToISODateString; 