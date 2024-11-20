// SuperMemo 2 Algorithm implementation
// Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

interface ReviewData {
  repetitions: number;
  easeFactor: number;
  interval: number;
  quality: number; // 0-5 scale
}

export const calculateNextReview = (data: ReviewData): ReviewData => {
  const { repetitions, easeFactor, quality } = data;
  let newEaseFactor = easeFactor;
  let newRepetitions = repetitions;
  let newInterval = 0;

  if (quality >= 3) {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(data.interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update ease factor
  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  return {
    repetitions: newRepetitions,
    easeFactor: newEaseFactor,
    interval: newInterval,
    quality,
  };
};

export const getInitialReviewData = (): ReviewData => ({
  repetitions: 0,
  easeFactor: 2.5,
  interval: 0,
  quality: 0,
});
