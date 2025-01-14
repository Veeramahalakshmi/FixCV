import { useState } from "react";

const useGoogle = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.replace("/");
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { gLoading:loading, gError:error, handleGoogle };
};

export default useGoogle;
