var _ = require('lodash');

// uses lodash to count occurences 
const countEachOccurence = (mappedArray) => _.countBy(mappedArray);

module.exports = countEachOccurence;