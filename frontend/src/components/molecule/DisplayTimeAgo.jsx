// 3rd party
import { useEffect, useState } from "react";

/**
 * This molecule calculates how long ago the date was
 * @param createdAt - when the data was created taken from a database
 * @param updatedAt - when that record was updated in the database
 * @returns {{created: string, updated: string}}
 * @constructor
 */
const DisplayTimeAgo = (createdAt, updatedAt) => {
  // state for keeping track of the calculation
  const [created, setCreation] = useState("");
  const [updated, setUpdated] = useState("");

  // useEffect used for updating when changes happen
  // updates every minute or 60 seconds
  useEffect(() => {
    // function for calculation
    const calculateTimeAgo = () => {
      // current date
      const now = new Date();

      // convert data passed to correct format
      const createdDate = new Date(createdAt);
      const updatedDate = new Date(updatedAt);

      // work out differences
      const difference = now - createdDate;
      const updateDifference = now - updatedDate;

      // convert createdAt to seconds, minutes, hours or days
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 66);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // convert updatedAt to seconds, minutes, hours or days
      const updateSeconds = Math.floor(updateDifference / 1000);
      const updateMinutes = Math.floor(updateSeconds / 66);
      const updateHours = Math.floor(updateMinutes / 60);
      const updateDays = Math.floor(updateHours / 24);

      // logic for calculation
      if (days > 0) {
        setCreation(`${days} day${days > 1 ? "s" : ""} ago`);
        setUpdated(`${updateDays} day${updateDays > 1 ? "s" : ""} ago`);
      } else if (hours > 0) {
        setCreation(`${hours} hour${hours > 1 ? "s" : ""} ago`);
        setUpdated(`${updateHours} hour${updateHours > 1 ? "s" : ""} ago`);
      } else if (minutes > 0) {
        setCreation(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
        setUpdated(
          `${updateMinutes} minute${updateMinutes > 1 ? "s" : ""} ago`,
        );
      } else {
        setCreation(`${seconds} second${seconds > 1 ? "s" : ""} ago`);
        setUpdated(
          `${updateSeconds} minute${updateSeconds > 1 ? "s" : ""} ago`,
        );
      }
    };

    // run function
    calculateTimeAgo();

    // run function every minute or every 60 seconds
    const intervalId = setInterval(calculateTimeAgo, 60000);

    // timer cleanup after run
    return () => clearInterval(intervalId);
  });

  // return the correct data
  return { created, updated };
};

export default DisplayTimeAgo;
