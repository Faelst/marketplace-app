export const formatExpirationDate = (
  dateString: string,
  setError: (message: string) => void,
): string => {
  const [month, year] = dateString.split("/").map(Number);

  if (isNaN(month) || isNaN(year)) {
    setError("Invalid expiration date format");
    throw new Error("Invalid expiration date format");
  }

  if (month < 1 || month > 12) {
    setError("Invalid month in expiration date");
    throw new Error("Invalid month in expiration date");
  }

  if (year < 0 || year > 99) {
    setError("Invalid year in expiration date");
    throw new Error("Invalid year in expiration date");
  }

  const fullYear = year < 100 ? 2000 + year : year;
  const expirationDate = new Date(fullYear, month - 1, 1);
  return expirationDate.toISOString().split("T")[0];
};
