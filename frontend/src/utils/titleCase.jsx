/**
 * Helper function used to title a string
 * @param str
 * @returns {string}
 */
export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
