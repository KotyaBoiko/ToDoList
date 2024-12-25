import { useState } from "react";

type TypeCallback<T> = (params: T) => Promise<void>;

type UseFetchingReturn<T> = [
  fetching: TypeCallback<T>,
  loading: boolean,
  error: string | null
];

const useFetching = <T = void>(
  callback: TypeCallback<T>,
  loadingStartVAlue = false
): UseFetchingReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(loadingStartVAlue);
  const [error, setError] = useState<string | null>(null);

  const fetching: TypeCallback<T> = async (params) => {
    try {
      setIsLoading(true);
      await callback(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
