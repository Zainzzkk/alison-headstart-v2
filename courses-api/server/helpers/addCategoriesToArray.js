const addCategoriesToArray = (categories, mappedTypes) => {
  // categories could be null
  if (categories) {
    // splits on ',' as some may have multiple categories per course
    const splitCategories = categories.split(',');

    // if splitCategories is 1, then adds the category to the array
    if (splitCategories.length === 1) {
      mappedTypes.push(splitCategories[0]);

      return mappedTypes;
    }

    // adds each split to array if more than 1 category
    splitCategories.forEach(eachSplit => mappedTypes.push(eachSplit));

    return mappedTypes;
  }

  return mappedTypes;
}

module.exports = addCategoriesToArray;