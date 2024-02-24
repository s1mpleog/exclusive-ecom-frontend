export const convertToStars = (averageRating: number) => {
  const roundedRating = Math.round(averageRating);
  if (roundedRating === 0) {
    return null;
  }
  // Create a string of stars based on the rounded rating
  const stars = "⭐".repeat(roundedRating) + "⭐".repeat(5 - roundedRating);

  return stars;
};
