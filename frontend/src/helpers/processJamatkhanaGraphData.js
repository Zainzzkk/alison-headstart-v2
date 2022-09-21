import calculatePercentage from './calculatePercentage';

// function for swapping positions in array for europe on top
function swapPositions(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]]; // eslint-disable-line
}

// function to process the array and add to array for graph
export default function processJamatkhanaGraphData(jamatkhanas, europeCities, type) {
  // keys for array
  const keys = Object.keys(jamatkhanas);
  const dataToAdd = [];

  keys.forEach((jamatkhana) => {
    // calculate percentage
    const percentageFromTotal = calculatePercentage(jamatkhanas[jamatkhana], jamatkhanas.total);

    // only add to graph if % is over 2 and do not add total property and is needed for graph
    if (percentageFromTotal >= 2 && jamatkhana !== 'total' && type === 'graph') {
      dataToAdd.push({
        name: jamatkhana,
        percentage: percentageFromTotal,
        number: jamatkhanas[jamatkhana],
      });
      // for anything else apart from graph which needs full dataset
    } else if (jamatkhana !== 'total' && type !== 'graph') {
      dataToAdd.push({
        name: jamatkhana,
        percentage: percentageFromTotal,
        number: jamatkhanas[jamatkhana],
      });
    }
  });

  // sorts alphabetically
  dataToAdd.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // eslint-disable-line

  // array with index of europe cities
  const europeToChange = [];

  europeCities.forEach((city) => {
    // find index in which europe city is in array - both alphabetical
    const index = dataToAdd.findIndex((jk) => jk.name === city);
    // if found
    if (index !== -1) {
      europeToChange.push(index);
    }
  });

  // puts europe first in order
  europeToChange.forEach((toChange, index) => {
    swapPositions(dataToAdd, toChange, index);
  });

  return dataToAdd;
}
