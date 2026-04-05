import { useEffect, useState } from "react";
import axios from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

const useCustomFetch = <T,>(
  url: string,
  options?: object,
  deps: any[] = []
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: false });

      try {
        const { data } = await axios(url, options);

        setState({
          data,
          loading: false,
          error: false,
        });
      } catch {
        setState({
          data: null,
          loading: false,
          error: true,
        });
      }
    };

    fetchData();
  }, deps); // ⭐ page, category 넣기

  return state;
};

export default useCustomFetch;