import { useEffect, useState } from "react";

const DisplayTimeAgo = (createdAt, updatedAt) => {
  const [created, setCreation] = useState("");
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const updatedDate = new Date(updatedAt);
      const difference = now - createdDate;
      const updateDifference = now - updatedDate;

      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 66);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const updateSeconds = Math.floor(updateDifference / 1000);
      const updateMinutes = Math.floor(updateSeconds / 66);
      const updateHours = Math.floor(updateMinutes / 60);
      const updateDays = Math.floor(updateHours / 24);

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

    calculateTimeAgo();

    const intervalId = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  });

  return { created, updated };
};

export default DisplayTimeAgo;
