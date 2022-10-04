import { EUROPE_CITIES } from '../constants';

// returns europe and UK percentage and totals
export default function europePercentage(learners) {
  let europeCounter = 0;
  learners.forEach((learner) => {
    // if in europe cities array
    if (EUROPE_CITIES.includes(learner.Jamatkhana)) {
      europeCounter += 1;
    }
  });

  const total = learners.length;
  const percentage = (europeCounter / total) * 100;
  const ukPercentage = 100 - percentage;
  const ukTotal = total - europeCounter;

  return {
    percentage: percentage.toFixed(2),
    total: europeCounter,
    ukPercentage: ukPercentage.toFixed(2),
    ukTotal,
  };
}
