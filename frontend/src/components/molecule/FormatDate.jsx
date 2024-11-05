/**
 * convert date to correct format when returned
 * @param date
 * @returns {string}
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatDate;
