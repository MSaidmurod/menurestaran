import { useEffect, useState } from "react";

export function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);

  function getPostedData(data) {
    setPostData({
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
  }
  useEffect(() => {
    const getData = async (fetchConfig) => {
      setIsPending(true);
      try {
        const req = await fetch(url, { ...fetchConfig });
        if (!req.ok) {
          throw new Error(req.responseText);
        }
        const data = await req.json();
        setData(data);
        // console.log(data);
        setIsPending(false);
      } catch (err) {
        setError(err);
        setIsPending(false);
      }
    };

    if (method == "POST" && postData) {
      getData(postData);
    }

    if (method == "DELETE" && postData) {
      getData(postData);
    }

    if (method == "GET") {
      getData();
    }
  }, [url, method, postData]);

  return { data, isPending, error, getPostedData };
}
