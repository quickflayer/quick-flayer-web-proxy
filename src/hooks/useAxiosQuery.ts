import { useState, useEffect, useCallback, useRef } from 'react';
import http, { AxiosResponse, AxiosError } from '../lib/http';

// Generic query options
export interface QueryOptions<T> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  retry?: number;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  staleTime?: number;
  cacheTime?: number;
}

// Query result interface
export interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  isFetching: boolean;
  refetch: () => Promise<void>;
  invalidate: () => void;
}

// Mutation options
export interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: AxiosError, variables: TVariables) => void;
  onSettled?: (data: TData | null, error: AxiosError | null, variables: TVariables) => void;
}

// Mutation result interface
export interface MutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  reset: () => void;
}

// Simple cache implementation
const queryCache = new Map<string, { data: any; timestamp: number; staleTime: number }>();

// Custom hook for GET requests (similar to useQuery)
export function useAxiosQuery<T>(
  queryKey: string | string[],
  queryFn: () => Promise<AxiosResponse<T>>,
  options: QueryOptions<T> = {}
): QueryResult<T> {
  const {
    enabled = true,
    refetchOnWindowFocus = false,
    refetchInterval,
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const retryCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate cache key
  const cacheKey = Array.isArray(queryKey) ? queryKey.join('-') : queryKey;

  // Check if data is stale
  const isStale = useCallback(() => {
    const cached = queryCache.get(cacheKey);
    if (!cached) return true;
    return Date.now() - cached.timestamp > cached.staleTime;
  }, [cacheKey]);

  // Fetch function with retry logic
  const fetchData = useCallback(async (showLoading = true) => {
    if (!enabled) return;

    // Check cache first
    const cached = queryCache.get(cacheKey);
    if (cached && !isStale()) {
      setData(cached.data);
      setIsError(false);
      setError(null);
      return;
    }

    if (showLoading) {
      setIsLoading(true);
    }
    setIsFetching(true);
    setIsError(false);
    setError(null);

    try {
      const response = await queryFn();
      const responseData = response.data;

      // Cache the data
      queryCache.set(cacheKey, {
        data: responseData,
        timestamp: Date.now(),
        staleTime,
      });

      setData(responseData);
      setIsError(false);
      setError(null);
      retryCountRef.current = 0;

      onSuccess?.(responseData);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(`Query failed for ${cacheKey}:`, axiosError);

      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        console.log(`Retrying query ${cacheKey} (${retryCountRef.current}/${retry})`);
        
        setTimeout(() => {
          fetchData(false);
        }, retryDelay * retryCountRef.current);
        return;
      }

      setIsError(true);
      setError(axiosError);
      onError?.(axiosError);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [enabled, queryFn, cacheKey, retry, retryDelay, onSuccess, onError, staleTime, isStale]);

  // Refetch function
  const refetch = useCallback(async () => {
    retryCountRef.current = 0;
    await fetchData(true);
  }, [fetchData]);

  // Invalidate cache
  const invalidate = useCallback(() => {
    queryCache.delete(cacheKey);
  }, [cacheKey]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch interval
  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(() => {
        if (!document.hidden) {
          fetchData(false);
        }
      }, refetchInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, enabled, fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (refetchOnWindowFocus && enabled) {
      const handleFocus = () => {
        if (isStale()) {
          fetchData(false);
        }
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [refetchOnWindowFocus, enabled, fetchData, isStale]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isSuccess = !isLoading && !isError && data !== null;

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch,
    invalidate,
  };
}

// Custom hook for mutations (similar to useMutation)
export function useAxiosMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>,
  options: MutationOptions<TData, TVariables> = {}
): MutationResult<TData, TVariables> {
  const { onSuccess, onError, onSettled } = options;

  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutateAsync = useCallback(async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await mutationFn(variables);
      const responseData = response.data;

      setData(responseData);
      setIsError(false);
      setError(null);

      onSuccess?.(responseData, variables);
      onSettled?.(responseData, null, variables);

      return responseData;
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Mutation failed:', axiosError);

      setIsError(true);
      setError(axiosError);

      onError?.(axiosError, variables);
      onSettled?.(null, axiosError, variables);

      throw axiosError;
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn, onSuccess, onError, onSettled]);

  const mutate = useCallback(async (variables: TVariables): Promise<TData> => {
    try {
      return await mutateAsync(variables);
    } catch (error) {
      // Error is already handled in mutateAsync
      throw error;
    }
  }, [mutateAsync]);

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setIsError(false);
    setError(null);
  }, []);

  const isSuccess = !isLoading && !isError && data !== null;

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  };
}
