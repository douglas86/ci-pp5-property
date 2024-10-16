/**
 * Helper function used to combine all Reducer files into one for easier iterations
 * @param slices
 * @returns {function(*, *): string}
 */
export const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state,
  );
