import getAlisonCatalogue from '../AlisonCatalogue/get-alison-catalogue';

// call for alison catalogue data
async function getAlisonCatalogueCall() {
  const courses = await getAlisonCatalogue();

  // counters initialisation
  let certificates = 0;
  let diplomas = 0;

  // loops through courses
  courses.forEach((course) => {
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

export default function getCourseCatalogueData() {
  return getAlisonCatalogueCall();
}
