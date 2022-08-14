// replaces courses with different hypen to the normal ANSII character
const replaceWrongHyphen = (name) => {
  let newName = name;
  if (name.includes('– Revised')) {
    newName = name.replace('– Revised', '- Revised');
  }

  return newName;
};

module.exports = replaceWrongHyphen;
