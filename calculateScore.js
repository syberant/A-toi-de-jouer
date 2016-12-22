function calculateSingleScore(singleScore) {
  return 1 / Number(singleScore) * 10000;
}

function calculateScore(Scores) {
  for (var i = 0; i++; i < Scores.length) {
    Scores[i] = calculateSingleScore(Scores[i]);
  }
  return Scores[i];
}
