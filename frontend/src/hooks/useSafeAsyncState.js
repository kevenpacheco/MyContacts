import {
  useCallback, useEffect, useRef, useState,
} from 'react';

export function useSafeAsyncState(initialData) {
  const [state, setState] = useState(initialData);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted.current) {
      setState(data);
    }
  }, []);

  return [state, setSafeAsyncState];
}
