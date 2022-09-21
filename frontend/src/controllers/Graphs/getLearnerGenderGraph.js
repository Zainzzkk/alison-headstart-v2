// processes data and calculates total for males and females
export default function getLearnersGenderData(data) {
  // return 0 for each if no data
  if (!data || !data.length) {
    return {
      males: 0,
      females: 0,
    };
  }
  // reduce so maps through array and returns count for number of males
  const males = data.reduce((male, gender) => {
    const { Gender } = gender;
    return male + (Gender === 'Male');
  }, 0);

  // calculates females by subtracting males from total
  const females = data.length - males;

  return {
    males,
    females,
  };
}
