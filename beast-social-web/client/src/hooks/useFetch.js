import { useState } from "react";

const useFetch = (callback) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const fetching = async (...args) => {
    try {
      setLoading(true);

      if (typeof callback !== "undefined" && typeof callback === "function") {
        await callback(...args);
      }
    } catch (e) {
      setError({
        status: true,
        message: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetch;
