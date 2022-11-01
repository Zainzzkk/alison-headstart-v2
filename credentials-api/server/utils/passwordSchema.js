// validates password options
const complexityOptions = {
  min: 3,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};

module.exports = complexityOptions;