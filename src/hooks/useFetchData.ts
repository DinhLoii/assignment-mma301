/**
 * Generic Fetch Hook
 * Utility hook for executing async requests with loading, error, and data states
 */

import { useState, useEffect, useCallback } from 'react';

export function useFetchData<T>(fetchFn: () => Promise<T>, autoFetch = true) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      execute().catch(() => {});
    }
  }, [autoFetch, execute]);

  return { data, isLoading, error, refetch: execute };
}

export default useFetchData;
