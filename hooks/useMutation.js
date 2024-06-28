import { useCallback, useState } from "react";

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const mutate = useCallback(
    async ({ url = "", method = "POST", payload = {} } = {}) => {
      setData({
        ...data,
        isLoading: true,
      });

      const fetchOptions = { method };
      if (Object.keys(payload).length > 0) {
        fetchOptions.headers = { "Content-Type": "application/json" };
        fetchOptions.body = JSON.stringify(payload);
      }

      console.log({ fetchOptions });

      try {
        const response = await fetch(url, fetchOptions);
        const result = await response.json();
        setData({
          ...data,
          data: result,
          isLoading: false,
        });
        return { ...result };
      } catch (error) {
        setData({
          ...data,
          isLoading: false,
          isError: true,
        });
        return error;
      }
    },
    []
  );

  return { ...data, mutate };
};
