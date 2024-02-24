function calculatePercentageOff(productPrice: number, totalPrice: number) {
  if (productPrice <= 0) {
    throw new Error("Product price must be greater than zero.");
  }

  if (totalPrice < 0) {
    throw new Error("Total price cannot be negative.");
  }

  const percentageOff = ((productPrice - totalPrice) / productPrice) * 100;
  return Math.round(percentageOff);
}

export default calculatePercentageOff;
