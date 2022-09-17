export default function processCourseCatalogueData(data) {
  // counters initialisation
  let certificates = 0;
  let diplomas = 0;

  // loops through courses
  data.forEach((course) => {
    // adds to counter
    if (course.Type === 'Diploma') {
      diplomas += 1;
    } else {
      certificates += 1;
    }
  });

  return {
    certificates,
    diplomas,
  };
}
