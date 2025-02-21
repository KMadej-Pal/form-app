import { useState, useEffect } from "react";

const useFetch = (url:string, apiKey:string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: { "X-Api-Key": apiKey },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, apiKey]); // Re-fetch if URL or API key changes

  return { data, loading, error };
};

export default useFetch;