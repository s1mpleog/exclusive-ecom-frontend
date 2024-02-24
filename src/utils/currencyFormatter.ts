export const formatCurrency = (amount: number) => {
  // Format amount as currency in Indian Rupees
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};
