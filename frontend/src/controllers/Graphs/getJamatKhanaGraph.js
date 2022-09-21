export default function getJamatKhanaGraph(data) {
  const jamatkhanas = {};

  if (!data || !data.length) {
    return jamatkhanas;
  }
  // total counter for jks
  let counter = 0;

  // loops through array and counts number of jk
  data.forEach((jamatkhana) => {
    if (jamatkhana.Jamatkhana) {
      // if jk already in object, then add 1 to counter
      if (jamatkhanas[jamatkhana.Jamatkhana]) {
        jamatkhanas[jamatkhana.Jamatkhana] += 1;
        // add 1 to total
        counter += 1;
      } else {
        // else add new property with jk and make counter 1
        jamatkhanas[jamatkhana.Jamatkhana] = 1;
        counter += 1;
      }
    }
  });

  // add total to object
  jamatkhanas.total = counter;

  return jamatkhanas;
}
